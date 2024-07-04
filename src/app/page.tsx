'use client'

import FloatingButton from "@/components/FloatingButton";
import TokensList from "@/components/TokensList";
import WalletInfo from "@/components/WalletInfo";
import modalStore from "@/store/ModalStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { reaction } from "mobx";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;

        tg.MainButton.text = 'Добавить токен';
        tg.MainButton.show();
        tg.MainButton.onClick(() => {
            router.push('/tokens');
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
    <main className="flex px-3 flex-col">
      <WalletInfo />
      <TokensList />
    </main>
  );
}
