'use client'

import TextInput from "@/components/TextInput";
import { useImportWallet } from "@/hooks/useImportWallet";
import { useState } from "react";

export default function Import() {
    const [privateKey, setPrivateKey] = useState('');
    const { importWallet, isComplete } = useImportWallet();

    const handleImport = async () => {
        await importWallet(privateKey, 'Кошелёк #1');
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
            <div className="text-tg-theme-button-text fixed bottom-14 w-full max-w-[420px] left-1/2 -translate-x-1/2">
                <div className={`${isComplete ? '' : 'translate-y-96' } duration-300 absolute left-0 w-full transition-transform px-2`}>
                    <div className={` bg-green-500 text-center flex justify-center items-center leading-none mb-2 h-11 rounded-xl font-semibold`}>
                        КОШЕЛЁК ПРИВЯЗАН
                    </div>
                </div>
                <div className={`${isComplete ? 'translate-y-96' : '' } duration-300 absolute left-0 w-full transition-transform px-2`}>
                    <button onClick={handleImport} className={`w-full bg-tg-theme-button mb-2 h-11 rounded-xl font-semibold`}>
                        ПРИСТУПИТЬ К ТОРГОВЛЕ
                    </button>
                </div>
            </div>
        </main>
    )
}