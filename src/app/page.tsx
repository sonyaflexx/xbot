import TokensList from "@/components/TokensList";
import WalletInfo from "@/components/WalletInfo";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex px-3 flex-col">
      <WalletInfo />
      <TokensList />
      <div className="fixed bottom-14 left-1/2 -translate-x-1/2 w-full max-w-[420px]">
        <div className={`duration-300 absolute left-0 w-full transition-transform px-2`}>
            <Link href={'/tokens'} className={`w-full bg-tg-main flex justify-center items-center mb-2 h-11 rounded-xl font-semibold uppercase`}>
                Добавить токен
            </Link>
        </div>
      </div>
    </main>
  );
}
