import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import modalStore from '@/store/ModalStore';
import WalletStore from '@/store/WalletStore';
import TextInput from '../TextInput';
import { Wallet } from '@/types';
import InfoField from '../InfoField';
import CopyField from '../CopyField';

const EditWalletModal = observer(() => {
  const { walletToEdit } = modalStore;
  const [title, setTitle] = useState(walletToEdit?.title || '');

  useEffect(() => {
    setTitle(walletToEdit?.title || '');
  }, [walletToEdit]);

  const editWallet = () => {
    if (!walletToEdit || !title || title.length < 1) return;

    const updatedWallet: Wallet = {
      ...walletToEdit,
      title: title.trim(), 
    };

    WalletStore.updateWallet(updatedWallet);
    modalStore.closeEditWalletModal();
    setTitle('');
  };

  const deleteWallet = () => {
    if (!walletToEdit) return;
    if ( WalletStore.wallets.length > 1 ) {
      WalletStore.deleteWallet(walletToEdit);
      modalStore.closeEditWalletModal();
      setTitle('');
    } console.error('Нельзя удалить последний кошелек')
  };

  if (!walletToEdit) return null;

  return (
    <div className={`fixed overflow-auto inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${modalStore.showEditWalletModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden={!modalStore.showEditWalletModal}>
      <div className={`fixed inset-0 bg-black transition-opacity duration-300 ${modalStore.showEditWalletModal ? 'bg-opacity-50' : 'bg-opacity-0'}`} onClick={modalStore.closeEditWalletModal}></div>
      <div className={`bg-tg-theme-bg h-[97vh] w-[95vw] max-w-[420px] rounded-lg shadow-lg transform transition-transform duration-300 ${modalStore.showEditWalletModal ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="bg-tg-theme-bg rounded-t-lg p-4 flex justify-between items-center">
          <h2 className="text-base font-bold">Редактирование кошелька</h2>
          <button onClick={modalStore.closeEditWalletModal} type="button" className="text-3xl leading-none text-tg-theme-hint">&times;</button>
        </div>
        <div className="bg-tg-theme-bg px-4 flex flex-col gap-2">
          <div className="flex flex-col gap-2 mt-2">
            <TextInput label="Название" value={title} setValue={setTitle} />
            <CopyField title="Адрес" content={walletToEdit.address} />
            <CopyField title="Приватный ключ" content={walletToEdit.privateKey} />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full flex">
          <button onClick={deleteWallet} className="h-[52px] bg-red-500 w-full rounded-bl-lg text-sm font-bold text-white">
            Удалить
          </button>
          <button onClick={editWallet} className="h-[52px] bg-tg-main w-full rounded-br-lg text-sm font-bold text-white">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
});

export default EditWalletModal;
