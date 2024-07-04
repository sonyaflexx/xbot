import FloatingButton from "@/components/FloatingButton";
import TokensList from "@/components/TokensList";
import WalletInfo from "@/components/WalletInfo";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex px-3 flex-col">
      <WalletInfo />
      <TokensList />
      <FloatingButton text="Добавить токен" href="/tokens" />
    </main>
  );
}
