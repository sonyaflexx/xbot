import { observer } from "mobx-react-lite";
import EthereumLogo from "./icons/EthereumLogo";
import ChainStore from "@/store/ChainStore";
import modalStore from "@/store/ModalStore";
import BnbLogo from "./icons/BnbLogo";
import Image from "next/image";

const ChainList = observer(() => {
    const { currentChain, setCurrentChain } = ChainStore;

    const handleSetChain = (chainName: string) => {
        setCurrentChain(chainName);
        modalStore.closeNetworkModal();
    }

    return (
        <ul className="pl-0 flex flex-col gap-2">
            <li onClick={() => handleSetChain('Ethereum')} className={`${currentChain?.name === 'Ethereum' ? 'ring-2 ring-tg-main' : ''} py-[10px] px-3 bg-tg-theme-secondary-bg rounded-xl flex items-center justify-between text-sm leading-7 gap-3`}>
                <EthereumLogo />
                <div className="flex flex-col flex-1">
                    <span className="font-bold">Ethereum</span>
                </div>
            </li>
            <li onClick={() => handleSetChain('BNB Smart Chain')} className={`${currentChain?.name === 'BNB Smart Chain' ? 'ring-2 ring-tg-main' : ''} py-[10px] px-3 bg-tg-theme-secondary-bg rounded-xl flex items-center justify-between text-sm leading-7 gap-3`}>
                <BnbLogo />
                <div className="flex flex-col flex-1">
                    <span className="font-bold">BNB Smart Chain</span>
                </div>
            </li>
            <li onClick={() => handleSetChain('Base')} className={`${currentChain?.name === 'Base' ? 'ring-2 ring-tg-main' : ''} py-[10px] px-3 bg-tg-theme-secondary-bg rounded-xl flex items-center justify-between text-sm leading-7 gap-3`}>
                <Image src={'https://chainspy.org/static/BASE.svg'} width={28} height={28} alt="Base Logo" />
                <div className="flex flex-col flex-1">
                    <span className="font-bold">Base</span>
                </div>
            </li>
            <li onClick={() => handleSetChain('The Open Network')} className={`${currentChain?.name === 'The Open Network' ? 'ring-2 ring-tg-main' : ''} py-[10px] px-3 bg-tg-theme-secondary-bg rounded-xl flex items-center justify-between text-sm leading-7 gap-3`}>
                <Image src={'https://chainspy.org/static/ton/ton_symbol.png'} width={28} height={28} alt="TON Logo" />
                <div className="flex flex-col flex-1">
                    <span className="font-bold">The Open Network</span>
                </div>
            </li>
            <li onClick={() => handleSetChain('Solana')} className={`${currentChain?.name === 'Solana' ? 'ring-2 ring-tg-main' : ''} py-[10px] px-3 bg-tg-theme-secondary-bg rounded-xl flex items-center justify-between text-sm leading-7 gap-3`}>
                <Image src={'https://chainspy.org/static/sol/solana.png'} width={28} height={28} alt="Solana Logo" />
                <div className="flex flex-col flex-1">
                    <span className="font-bold">Solana</span>
                </div>
            </li>
        </ul>
    )
});

export default ChainList;