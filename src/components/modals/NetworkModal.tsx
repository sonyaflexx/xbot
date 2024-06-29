'use client';

import React from 'react';
import { observer } from 'mobx-react-lite';
import modalStore from '@/store/ModalStore';
import ChainList from '../ChainList';

const NetworkModal = observer(() => {
  return (
    <div className={`fixed overflow-auto inset-0 z-50 flex items-start justify-center transition-opacity duration-300 ${modalStore.showNetworkModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden={!modalStore.showNetworkModal}>
      <div className={`fixed inset-0 bg-tg-theme-secondary-bg transition-opacity duration-300 ${modalStore.showNetworkModal ? 'bg-opacity-100' : 'bg-opacity-0'}`} onClick={modalStore.closeNetworkModal}></div>
      <div className={`pb-5 mt-3 w-[95vw] max-w-[420px] bg-tg-theme-bg rounded-lg shadow-lg transform transition-transform duration-300 ${modalStore.showNetworkModal ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="bg-tg-theme-bg rounded-t-lg p-4 flex justify-between items-center">
          <h2 className="text-base font-bold">Выбор сети</h2>
          <button onClick={modalStore.closeNetworkModal} type="button" className="text-3xl leading-none text-tg-theme-hint">&times;</button>
        </div>
        <div className="bg-tg-theme-bg px-4 rounded-b-lg">
          <ChainList />
        </div>
      </div>
    </div>
  );
});

export default NetworkModal;


