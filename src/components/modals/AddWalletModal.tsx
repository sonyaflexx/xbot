'use client';

import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import modalStore from '@/store/ModalStore';
import WalletList from '../WalletList';
import SwitchInput from '../SwitchInput';
import InfoField from '../InfoField';
import { ethers } from 'ethers';
import WalletStore from '@/store/WalletStore';
import TextInput from '../TextInput';
import { useCreateWallet } from '@/hooks/useCreateWallet';
import ChainStore from '@/store/ChainStore';
import { useImportWallet } from '@/hooks/useImportWallet';

const AddWalletModal = observer(() => {
  const [method, setMethod] = useState('create');
  const [wallet, setWallet] = useState<any>(null);

  const [title, setTitle] = useState('Кошелёк #' + (WalletStore.wallets.length + 1));
  const [privateKey, setPrivateKey] = useState('');

  const { createWallet, addWallet, isComplete } = useCreateWallet();
  const { importWallet } = useImportWallet();

  useEffect(() => {
    setTitle('Кошелёк #' + (WalletStore.wallets.length + 1));
  }, [WalletStore.wallets.length]);

  useEffect(() => {
    createWallet().then((newWallet) => {
      if (newWallet) {
        setWallet(newWallet);
      }
    });
  }, [ChainStore.currentChain]);

  const handleAddWallet = () => {
    if (wallet) {
      addWallet(wallet);
    }
  };

  const handleCreateWallet = () => {
    if (wallet) {
      addWallet({title, ...wallet});
      WalletStore.setCurrentWallet({title, ...wallet});
      modalStore.closeAddWalletModal();

      createWallet().then((newWallet) => {
        if (newWallet) {
          setWallet(newWallet);
        }
      });
    }
  };

  const handleImportWallet = () => {
    try {
      importWallet(privateKey, title);
      modalStore.closeAddWalletModal();
      setPrivateKey('');
      setTitle('Новый кошелёк');
    } catch (error) {
      console.error('Invalid mnemonic or private key:', error);
    }
  };

  return (
    <div className={`fixed overflow-auto inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${modalStore.showAddWalletModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden={!modalStore.showAddWalletModal}>
      <div className={`fixed inset-0 bg-black transition-opacity duration-300 ${modalStore.showAddWalletModal ? 'bg-opacity-50' : 'bg-opacity-0'}`} onClick={modalStore.closeAddWalletModal}></div>
      <div className={`bg-tg-theme-bg h-[97vh] w-[95vw] max-w-[420px] rounded-lg shadow-lg transform transition-transform duration-300 ${modalStore.showAddWalletModal ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="bg-tg-theme-bg rounded-t-lg p-4 flex justify-between items-center">
          <h2 className="text-base font-bold">Добавление кошелька</h2>
          <button onClick={modalStore.closeAddWalletModal} type="button" className="text-3xl leading-none text-tg-theme-hint">&times;</button>
        </div>
        <div className="bg-tg-theme-bg px-4 flex flex-col gap-2">
          <SwitchInput value={method} setValue={setMethod} />
          {method === 'create' && wallet ? (
            <div className="flex flex-col gap-2">
              <TextInput label="Название" value={title} setValue={setTitle} />
              <InfoField title="Адрес" content={wallet.address} />
              <InfoField title="Приватный ключ" content={wallet.privateKey || wallet.mnemonic} />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <TextInput label="Название" value={title} setValue={setTitle} />
              <TextInput label="Приватный ключ или фраза" value={privateKey} setValue={setPrivateKey} />
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <button onClick={method === 'create' ? handleCreateWallet : handleImportWallet} className="h-[52px] bg-tg-theme-button w-full rounded-b-lg text-sm font-bold text-tg-theme-button-text">
            Добавить кошелёк
          </button>
        </div>
      </div>
    </div>
  );
});

export default AddWalletModal;

