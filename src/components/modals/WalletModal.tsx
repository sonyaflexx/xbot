'use client';

import React from 'react';
import { observer } from 'mobx-react-lite';
import modalStore from '@/store/ModalStore';
import WalletList from '../WalletList';

const WalletModal = observer(() => {
  return (
    <div className={`fixed overflow-auto inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${modalStore.showWalletModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden={!modalStore.showWalletModal}>
      <div className={`fixed inset-0 bg-black transition-opacity duration-300 ${modalStore.showWalletModal ? 'bg-opacity-50' : 'bg-opacity-0'}`} onClick={modalStore.closeWalletModal}></div>
      <div className={`h-[97vh] w-[95vw] max-w-[420px] bg-tg-theme-bg rounded-lg shadow-lg transform transition-transform duration-300 ${modalStore.showWalletModal ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="bg-tg-theme-bg rounded-t-lg p-4 flex justify-between items-center">
          <h2 className="text-base font-bold">Выбор кошелька</h2>
          <button onClick={modalStore.closeWalletModal} type="button" className="text-3xl leading-none text-tg-theme-hint">&times;</button>
        </div>
        <div className="bg-tg-theme-bg px-4">
          <WalletList />
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <button onClick={modalStore.openAddWalletModal} className="h-[52px] bg-tg-main w-full rounded-b-lg text-sm font-bold text-white">
            Добавить кошелёк
          </button>
        </div>
      </div>
    </div>
  );
});

export default WalletModal;

