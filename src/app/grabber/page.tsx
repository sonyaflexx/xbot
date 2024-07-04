'use client'

import DynamicInputs from "@/components/DynamicInput";
import GasInput from "@/components/GasInput";
import InputWithSymbols from "@/components/InputWithSymbols";
import OrderForm from "@/components/OrderForm";
import ProscInput from "@/components/ProscInput";
import Switch from "@/components/Switch";
import { useState } from "react";

const Grabber = () => {
    const [on, setOn] = useState(false);
    const [channels, setChannels] = useState([]);
    const [amount, setAmount] = useState('')
    const [prosc, setProsc] = useState('')
    const [gas, setGas] = useState('')
    const [antiMev, setAntiMev] = useState(false);
    const [order, setOrder] = useState({});

    return (
        <main className="flex overflow-y-auto pb-20 px-5 flex-col">
            <Switch value={on} setValue={setOn} label="Включить" />
            <div>
                <h3 className="font-bold mt-4 mb-2">Каналы для повторения</h3>
                <DynamicInputs placeholder='Новая ссылка' value={channels} setValue={setChannels} />
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="font-bold mt-2">Настройки покупки</h3>
                <div className='flex justify-between'>
                    <span className='text-sm font-bold text-tg-theme-hint'>Баланс</span>
                    <span className='text-sm'>0 ETH</span>
                </div>
                <InputWithSymbols value={amount} setValue={setAmount} symbols="ETH" label="Сумма покупки" />
                <div className="flex gap-2">
                    <ProscInput value={prosc} setValue={setProsc} />
                    <GasInput value={gas} setValue={setGas} />
                </div>
                <Switch value={antiMev} setValue={setAntiMev} label="Anti-MEV" />
                <OrderForm value={order} setValue={setOrder} />
            </div>
            <div className="fixed text-tg-theme-button-text bottom-14 left-1/2 -translate-x-1/2 w-full max-w-[420px]">
                <div className={`duration-300 absolute left-0 w-full transition-transform px-2`}>
                    <button className={`w-full bg-tg-theme-button mb-2 h-11 rounded-xl font-semibold uppercase`}>
                        СОХРАНИТЬ НАСТРОЙКИ
                    </button>
                </div>
            </div>
        </main>
    )
}

export default Grabber;