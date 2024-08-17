'use client'

import Link from "next/link";
import MainButton from "@/components/MainButton";
import ChainStore from "@/store/ChainStore";
import { observer } from "mobx-react-lite";

const Auth = () => {
    return (
        <main className="px-8">
            <div className="leading-none flex gap-2">
                <span>👋</span>
                <div>   
                    <h1 className="font-bold">Добро пожаловать</h1>
                    <p className="my-4 font-extralight mr-12 leading-5 text-sm">Для начала торговли необходимо создать или привязать кошелёк</p>
                </div>
            </div>
            <ul className="flex flex-col gap-4 ml-0">
                <li>
                    <MainButton
                        type="link"
                        icon="➕"
                        title="Создать кошелёк"
                        description="Генерация нового кошелька"
                        href="auth/create"
                    />
                </li>
                { ChainStore.currentChain && ChainStore.currentChain?.name !== 'The Open Network' && 
                    <li>
                        <MainButton
                            type="link"
                            icon="🔗"
                            title="Привязать кошелёк"
                            description="Импорт по приватному ключу или секретной фразе"
                            href="auth/import"
                        />
                    </li>
                }
            </ul>
        </main>
    );
}

export default observer(Auth);