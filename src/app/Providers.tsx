'use client'

import { Provider } from 'mobx-react';
import { ReactNode, useEffect, useState } from 'react';
import WalletStore from '@/store/WalletStore';
import ChainStore from '@/store/ChainStore';
import NetworkModal from '@/components/modals/NetworkModal';
import WalletModal from '@/components/modals/WalletModal';
import EditWalletModal from '@/components/modals/EditWalletModal';
import MenuModal from '@/components/modals/MenuModal';
import AddWalletModal from '@/components/modals/AddWalletModal';
import { useRouter, usePathname } from 'next/navigation';
import { NextUIProvider } from '@nextui-org/react';
import { observer } from 'mobx-react-lite';

const Providers = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    WalletStore.filterWalletsByChain();
  }, [ChainStore.currentChain])

  useEffect(() => {
    const hasWallets = WalletStore.wallets && WalletStore.wallets.length > 0;

    if (!hasWallets && !pathname.startsWith('/auth')) {
      router.push('/auth');
    } else if (hasWallets && pathname.startsWith('/auth')) {
      router.push('/');
    }
  }, [pathname, WalletStore.wallets]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;

      const handleReady = () => {
        webApp.ready();
        webApp.expand();
      };

      const handleResize = () => {
        // Always force expand
        if (webApp.isExpanded) {
          webApp.expand();
        } else {
          webApp.expand();
        }
      };

      // Ensure the WebApp is ready and expanded on load
      handleReady();

      // Add a listener for resizing to enforce full-screen mode
      window.addEventListener('resize', handleResize);

      // Initial check to enforce full-screen mode
      handleResize();

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    } else {
      console.error('Telegram WebApp is not defined');
    }
  }, []);

  if (!isHydrated) {
    return null; 
  }

  return (
    <NextUIProvider>
      <Provider {...{ WalletStore, ChainStore }}>
        <NetworkModal />
        <WalletModal />
        <EditWalletModal />
        <MenuModal />
        <AddWalletModal />
        {children}
      </Provider>
    </NextUIProvider>
  );
}

export default observer(Providers);
