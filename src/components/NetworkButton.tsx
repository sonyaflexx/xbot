import ChainStore from "@/store/ChainStore";
import modalStore from "@/store/ModalStore";
import { observer } from "mobx-react-lite";
import EthereumLogo from "./icons/EthereumLogo";
import BnbLogo from "./icons/BnbLogo";
import Image from "next/image";

const NetworkButton = observer(() => {
    const { currentChain } = ChainStore;

    return (
        <button onClick={modalStore.openNetworkModal} className="ml-auto p-[6px] pr-4 flex items-center rounded-xl shadow-sm shadow-neutral-900 bg-tg-theme-secondary-bg text-sm">
            { currentChain?.name === 'Ethereum' && (
                <>
                    <EthereumLogo />
                    <span className="font-bold mx-2 leading-none">ETH</span>
                </>
            )}
            { currentChain?.name === 'BNB Smart Chain' && (
                <>
                    <BnbLogo />
                    <span className="font-bold mx-2 leading-none">BSC</span>
                </>
            )}
            { currentChain?.name === 'Base' && (
                <>
                    <Image src={'https://chainspy.org/static/BASE.svg'} width={28} height={28} alt="Base Logo" />
                    <span className="font-bold mx-2 leading-none">BASE</span>
                </>
            )}
            { currentChain?.name === 'The Open Network' && (
                <>
                    <Image src={'https://chainspy.org/static/ton/ton_symbol.png'} width={28} height={28} alt="TON Logo" />
                    <span className="font-bold mx-2 leading-none">TON</span>
                </>
            )}
            { currentChain?.name === 'Solana' && (
                <>
                    <Image src={'https://chainspy.org/static/sol/solana.png'} width={28} height={28} alt="Solana Logo" />
                    <span className="font-bold mx-2 leading-none">SOL</span>
                </>
            )}
        </button>
    )
})

export default NetworkButton;