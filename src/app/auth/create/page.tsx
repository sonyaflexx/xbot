'use client';

import CopyField from "@/components/CopyField";
import { useCreateWallet } from "@/hooks/useCreateWallet";
import ChainStore from "@/store/ChainStore";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

const Create = () => {
  const [wallet, setWallet] = useState<any>(null);
  const { createWallet, isComplete, addWallet } = useCreateWallet();

  useEffect(() => {
    createWallet().then((newWallet) => {
      setWallet(newWallet);
    });
  }, [ChainStore.currentChain]);

  const handleAddWallet = () => {
    if (wallet) {
      addWallet(wallet);
    }
  };

  return (
    <main className="flex flex-col flex-1">
      <div className="px-8">
        <div className="leading-none flex gap-2">
          <span>➕</span>
          <div>   
            <h1 className="font-bold">Создание кошелька</h1>
            <p className="my-4 font-extralight mr-12 leading-5 text-sm">На Вашем устройстве был сгенерирован кошелёк</p>
          </div>
        </div>
        <ul className="flex flex-col gap-4">
          <li>
            <CopyField
              title="Адрес"
              content={wallet ? wallet.address : ""}
              notification="Адрес Вашего кошелька скопирован"
            />
          </li>
          <li>
            <CopyField
              title="Приватный ключ"
              content={wallet ? wallet.privateKey || wallet.mnemonic : ""}
              notification="Приватный ключ скопирован"
            />
          </li>
        </ul>
      </div>
      <div className="text-tg-theme-button-text fixed bottom-14 w-full max-w-[420px] left-1/2 -translate-x-1/2">
        <div className={`${isComplete ? '' : 'translate-y-96' } duration-300 absolute left-0 w-full transition-transform px-2`}>
            <div className={` bg-green-500 text-center flex justify-center items-center leading-none mb-2 h-11 rounded-xl font-semibold`}>
                КОШЕЛЁК ПРИВЯЗАН
            </div>
        </div>
        <div className={`${isComplete ? 'translate-y-96' : '' } duration-300 absolute left-0 w-full transition-transform px-2`}>
            <button onClick={handleAddWallet} className={`w-full bg-tg-theme-button  mb-2 h-11 rounded-xl font-semibold`}>
                ПРИСТУПИТЬ К ТОРГОВЛЕ
            </button>
        </div>
      </div>
    </main>
  );
}

export default observer(Create);