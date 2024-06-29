'use client'

import CopyField from "@/components/CopyField";
import WalletStore from "@/store/WalletStore";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Wallet {
    address: string;
    privateKey: string;
  }

export default function Create() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const newWallet = ethers.Wallet.createRandom();
    setWallet(newWallet);
  }, []);

  const createWallet = () => {
    if (wallet) {
      WalletStore.addWallet({
        title: 'Кошелёк #1',
        address: wallet.address,
        privateKey: wallet.privateKey
      });
      WalletStore.setCurrentWallet(WalletStore.wallets[0])
    }
    setIsComplete(true);
    setTimeout(() => {
        router.push('/');
    }, 2000);
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
            />
          </li>
          <li>
            <CopyField
              title="Приватный ключ"
              content={wallet ? wallet.privateKey : ""}
            />
          </li>
        </ul>
      </div>
      <div className="fixed bottom-14 left-0 w-full max-w-[420px]">
        <div className={`${isComplete ? '' : 'translate-y-96' } duration-300 absolute left-0 w-full transition-transform px-2`}>
            <div className={` bg-green-500 text-center flex justify-center items-center leading-none mb-2 h-11 rounded-xl font-semibold`}>
                КОШЕЛЁК ПРИВЯЗАН
            </div>
        </div>
        <div className={`${isComplete ? 'translate-y-96' : '' } duration-300 absolute left-0 w-full transition-transform px-2`}>
            <button onClick={createWallet} className={` w-full bg-tg-main  mb-2 h-11 rounded-xl font-semibold`}>
                ПРИСТУПИТЬ К ТОРГОВЛЕ
            </button>
        </div>
      </div>
    </main>
  );
}
