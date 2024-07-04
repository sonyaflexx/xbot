'use client'

import { usePathname } from "next/navigation"
import EthereumLogo from "./icons/EthereumLogo"
import WalletIcon from "./icons/WalletIcon";
import modalStore from "@/store/ModalStore";
import NetworkButton from "./NetworkButton";

export default function Header() {
    const path = usePathname()

    if ( path === '/auth' || path === '/auth/import' || path === '/auth/create' ) {
        return (
            <header className="flex p-3">
                <NetworkButton />
            </header>
        );
    } else if ( path === '/' ) {
        return (
            <header className="flex justify-between p-3 gap-2">
                <button onClick={modalStore.openMenuModal} className="py-[6px] px-2 flex items-center rounded-xl shadow-sm shadow-neutral-900 bg-tg-theme-secondary-bg text-sm">
                    <span className="material-symbols-outlined text-tg-theme-button m-auto">Menu</span>
                </button>
                <button onClick={modalStore.openWalletModal} className="py-[6px] px-2 flex-1 flex items-center rounded-xl shadow-sm shadow-neutral-900 bg-tg-theme-secondary-bg text-sm">
                    <div><WalletIcon /></div>
                    <span className="font-bold mx-2 text-sm leading-none">Основной кошелёк</span>
                </button>
                <NetworkButton />
            </header>
        );
    } else if ( path === '/copytrading' ) {
        return (
            <header>
                <div className="flex flex-col items-center p-6 pb-5">
                    <span className="text-[128px] leading-[128px] pb-6">🔗</span>
                    <h1 className="text-2xl font-bold">Копитрейдинг</h1>
                </div>
                <div className="flex justify-between px-3 pb-3 gap-2">
                    <button onClick={modalStore.openMenuModal} className="py-[6px] px-2 flex items-center rounded-xl shadow-sm shadow-neutral-900 bg-tg-theme-secondary-bg text-sm">
                        <span className="material-symbols-outlined text-tg-theme-button m-auto">Menu</span>
                    </button>
                    <button onClick={modalStore.openWalletModal} className="py-[6px] px-2 flex-1 flex items-center rounded-xl shadow-sm shadow-neutral-900 bg-tg-theme-secondary-bg text-sm">
                        <div><WalletIcon /></div>
                        <span className="font-bold mx-2 text-sm leading-none">Основной кошелёк</span>
                    </button>
                    <NetworkButton />
                </div>
            </header>
        );
    } else if ( path === '/fastbuy' ) {
        return (
            <header>
                <div className="flex flex-col items-center p-6 pb-5">
                    <span className="text-[128px] leading-[128px] pb-6">🚀</span>
                    <h1 className="text-2xl font-bold">Быстрая покупка</h1>
                </div>
                <div className="flex justify-between px-3 pb-3 gap-2">
                    <button onClick={modalStore.openMenuModal} className="py-[6px] px-2 flex items-center rounded-xl shadow-sm shadow-neutral-900 bg-tg-theme-secondary-bg text-sm">
                        <span className="material-symbols-outlined text-tg-theme-button m-auto">Menu</span>
                    </button>
                    <button onClick={modalStore.openWalletModal} className="py-[6px] px-2 flex-1 flex items-center rounded-xl shadow-sm shadow-neutral-900 bg-tg-theme-secondary-bg text-sm">
                        <div><WalletIcon /></div>
                        <span className="font-bold mx-2 text-sm leading-none">Основной кошелёк</span>
                    </button>
                    <NetworkButton />
                </div>
            </header>
        );
    } else if ( path === '/grabber' ) {
        return (
            <header>
                <div className="flex flex-col items-center p-6 pb-5">
                    <span className="text-[128px] leading-[128px] pb-6">🥷</span>
                    <h1 className="text-2xl font-bold">XGRABBER</h1>
                </div>
                <div className="flex justify-between px-3 pb-3 gap-2">
                    <button onClick={modalStore.openMenuModal} className="py-[6px] px-2 flex items-center rounded-xl shadow-sm shadow-neutral-900 bg-tg-theme-secondary-bg text-sm">
                        <span className="material-symbols-outlined text-tg-theme-button m-auto">Menu</span>
                    </button>
                    <button onClick={modalStore.openWalletModal} className="py-[6px] px-2 flex-1 flex items-center rounded-xl shadow-sm shadow-neutral-900 bg-tg-theme-secondary-bg text-sm">
                        <div><WalletIcon /></div>
                        <span className="font-bold mx-2 text-sm leading-none">Основной кошелёк</span>
                    </button>
                    <NetworkButton />
                </div>
            </header>
        );
    };
}