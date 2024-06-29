'use client'

import WalletStore from "@/store/WalletStore";
import CopyIcon from "./icons/CopyIcon";
import { observer } from "mobx-react-lite";

const WalletInfo = observer(() => {
    const { currentWallet } = WalletStore;

    const handleCopy = (content: any) => {
        content && navigator.clipboard.writeText(content);
    }

    return (
        <div className="px-3">
            <div>
                <span className="text-sm text-tg-theme-hint">Адрес</span>
                <p className="text-xs font-bold">{currentWallet?.address}</p>
            </div>
            <div className="mt-3 flex justify-between">
                <div className="flex flex-col">
                    <span className="text-sm text-tg-theme-hint">Общий баланс</span>
                    <span className="text-2xl font-bold">0$</span>
                </div>
                <div onClick={() => handleCopy(currentWallet?.address)} className="flex flex-col items-center gap-1">
                    <div className="text-tg-main"><CopyIcon /></div>
                    <span className="text-sm text-tg-theme-hint text-center">Адрес</span>
                </div>
            </div>
        </div>
    )
})

export default WalletInfo;