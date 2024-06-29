'use client'

import { Provider } from "mobx-react"
import { ReactNode, useEffect } from "react"
import WalletStore from "@/store/WalletStore";
import NetworkModal from "@/components/modals/NetworkModal";
import WalletModal from "@/components/modals/WalletModal";
import EditWalletModal from "@/components/modals/EditWalletModal";
import MenuModal from "@/components/modals/MenuModal";
import AddWalletModal from "@/components/modals/AddWalletModal";
import { useRouter, usePathname } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";

export default function Providers({ children } : { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const hasWallets = WalletStore.wallets && WalletStore.wallets.length > 0;

        if (!hasWallets && !pathname.startsWith('/auth')) {
            router.push('/auth');
        } else if (hasWallets && pathname.startsWith('/auth')) {
            router.push('/');
        }
    }, [pathname]);

    return (
        <NextUIProvider>
            <Provider {...{ WalletStore }}>
                <NetworkModal />
                <WalletModal />
                <EditWalletModal />
                <MenuModal />
                <AddWalletModal />
                {children}
            </Provider>
        </NextUIProvider>
    )
}
