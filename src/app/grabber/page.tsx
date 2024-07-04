'use client'

import DynamicInputs from "@/components/DynamicInput";
import GasInput from "@/components/GasInput";
import InputWithSymbols from "@/components/InputWithSymbols";
import OrderForm from "@/components/OrderForm";
import ProscInput from "@/components/ProscInput";
import Switch from "@/components/Switch";
import modalStore from "@/store/ModalStore";
import { reaction } from "mobx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Grabber = () => {
    const [on, setOn] = useState(false);
    const [channels, setChannels] = useState([]);
    const [amount, setAmount] = useState('')
    const [prosc, setProsc] = useState('')
    const [gas, setGas] = useState('')
    const [antiMev, setAntiMev] = useState(false);
    const [order, setOrder] = useState({});

    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;
    
            tg.MainButton.text = 'Сохранить настройки';
            tg.MainButton.show();
            tg.MainButton.onClick(() => {
                router.push('/');
            });
    
            const disposer = reaction(
                () => modalStore.isModalActive,
                (isActive: boolean) => {
                    if (isActive) {
                        tg.MainButton.hide();
                    } else {
                        tg.MainButton.show();
                    }
                }
            );
    
            return () => {
                tg.MainButton.hide();
                disposer();
            };
        }
      }, [modalStore.isModalActive]); 

    return (
        <main className="flex overflow-y-auto pb-5 px-5 flex-col">
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
        </main>
    )
}

export default Grabber;