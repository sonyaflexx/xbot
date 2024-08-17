import React from 'react';
import { observer } from 'mobx-react-lite';
import WalletStore from '@/store/WalletStore';
import EditIcon from './icons/EditIcon';
import modalStore from '@/store/ModalStore';
import { Wallet } from '@/types';

const WalletList: React.FC = observer(() => {
  const { wallets, currentWallet, setCurrentWallet } = WalletStore;

  const handleClick = (wallet: Wallet) => {
    const data = {
      title: wallet.title,
      address: wallet.address,
      privateKey: wallet.privateKey
    };

    setCurrentWallet(data as any);
  };

  const handleEditWallet = (wallet: Wallet) => {
    modalStore.setCurrentWalletToEdit(wallet); 
    modalStore.openEditWalletModal(); 
  };

  return (
    <ul className="mt-3 pl-0 flex flex-col gap-2">
      {wallets.map((wallet: Wallet, index: number) => (
        <li
          key={index}
          className={`${wallet.address === currentWallet?.address ? 'ring-2 ring-tg-theme-button' : ''} py-[10px] px-3 bg-tg-theme-secondary-bg rounded-xl flex items-center justify-between text-sm gap-3`}
        >
          <div className="flex flex-col flex-1" onClick={() => handleClick(wallet)}>
            <span className="font-bold">{wallet.title || 'Кошелёк #1'}</span>
            <span className="font-light text-tg-theme-hint">
              {wallet.address.slice(0, 7)}...{wallet.address.slice(-5)}
            </span>
          </div>
          <div onClick={() => handleEditWallet(wallet)} className="flex flex-col text-right text-tg-theme-button">
            <EditIcon />
          </div>
        </li>
      ))}
    </ul>
  );
});

export default WalletList;
