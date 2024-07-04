'use client'

import FloatingButton from "@/components/FloatingButton";
import TokensList from "@/components/TokensList";
import WalletInfo from "@/components/WalletInfo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;

    tg.MainButton.text = "Добавить токен";
    tg.MainButton.show();
    tg.MainButton.onClick(() => {
      router.push('/tokens')
    });

    return () => {
      tg.MainButton.hide();
    };
  }
  }, []);

  return (
    <main className="flex px-3 flex-col">
      <WalletInfo />
      <TokensList />
    </main>
  );
}
