'use client'

import DynamicInputs from "@/components/DynamicInput";
import GasInput from "@/components/GasInput";
import InputWithSymbols from "@/components/InputWithSymbols";
import OrderForm from "@/components/OrderForm";
import ProscInput from "@/components/ProscInput";
import Switch from "@/components/Switch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Fastbuy = () => {
    const [on, setOn] = useState(false);
    const [ask, setAsk] = useState(true);
    const [amount, setAmount] = useState('')
    const [prosc, setProsc] = useState('')
    const [gas, setGas] = useState('')
    const [antiMev, setAntiMev] = useState(false);
    const [sellForAddress, setSellForAddress] = useState(false);
    const [order, setOrder] = useState({});

    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;

        tg.MainButton.text = "Сохранить настройки";
        tg.MainButton.show();
        tg.MainButton.onClick(() => {
        router.push('/')
        });

        return () => {
        tg.MainButton.hide();
        };
    }
    }, []);

    return (
        <main className="flex overflow-y-auto pb-5 px-5 flex-col">
            <Switch value={on} setValue={setOn} label="Включить" />
            <div className="flex flex-col gap-2">
                <h3 className="font-bold mt-2">Настройки покупки</h3>
                <div className='flex justify-between'>
                    <span className='text-sm font-bold text-tg-theme-hint'>Баланс</span>
                    <span className='text-sm'>0 ETH</span>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="w-1/2">
                        <InputWithSymbols value={amount} setValue={setAmount} symbols="ETH" label="Сумма" />
                    </div>
                    <div className="w-1/2">
                        <Switch value={ask} setValue={setAsk} label="Запрашивать" />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="w-1/2">
                        <ProscInput value={prosc} setValue={setProsc} />
                    </div>
                    <div className="w-1/2">
                        <GasInput value={gas} setValue={setGas} />
                    </div>
                </div>
                <Switch value={antiMev} setValue={setAntiMev} label="Anti-MEV" />
                <OrderForm value={order} setValue={setOrder} />
                <div className="rounded-xl p-4 bg-tg-theme-secondary-bg text-sm">
                    Отправьте боту сообщение, содержащее адрес контракта и бот совершит быструю покупку токена
                </div>
            </div>
        </main>
    )
}

export default Fastbuy;