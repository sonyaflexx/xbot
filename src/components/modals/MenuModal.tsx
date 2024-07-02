'use client';

import React from 'react';
import { observer } from 'mobx-react-lite';
import modalStore from '@/store/ModalStore';
import WalletList from '../WalletList';
import Link from 'next/link';
import { openTelegramLink } from '@/utils/telegramLinks';
import { showTelegramNotification } from '@/utils/telegramNotifications';

const MenuModal = observer(() => {
  return (
    <div className={`fixed overflow-auto inset-0 z-50 flex items-start justify-center transition-opacity duration-300 ${modalStore.showMenuModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden={!modalStore.showMenuModal}>
      <div className={`fixed inset-0 bg-black transition-opacity duration-300 ${modalStore.showMenuModal ? 'bg-opacity-50' : 'bg-opacity-0'}`} onClick={modalStore.closeMenuModal}></div>
      <div className={`mt-3 w-[95vw] max-w-[420px] bg-tg-theme-bg !rounded-xl shadow-lg transform transition-transform duration-300 ${modalStore.showMenuModal ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="bg-tg-theme-bg rounded-t-xl p-4 flex justify-between items-center">
          <div className='w-4' />
          <h2 className="text-base font-bold">Меню</h2>
          <button onClick={modalStore.closeMenuModal} type="button" className="text-3xl leading-none text-tg-theme-hint">&times;</button>
        </div>
        <div className="bg-tg-theme-bg px-4 pb-4 rounded-b-xl">
          
          <div className='w-full'>
            <h3 className='text-sm font-bold mb-2'>Инструменты</h3>
            <div className='flex flex-col gap-px'>
              <div className='flex gap-px'>
                <Link href={'/'} onClick={modalStore.closeMenuModal} className='bg-tg-theme-secondary-bg flex flex-1 py-[6px] items-center justify-center leading-7 text-center text-sm font-medium rounded-t-xl'>🏦 Кошелёк</Link>
              </div>
              <div className='flex gap-px'>
                <Link href={'/copytrading'} onClick={modalStore.closeMenuModal} className='bg-tg-theme-secondary-bg flex flex-1 py-[6px] items-center justify-center leading-7 text-center text-sm font-medium'>🔗 Копитрейдинг</Link>
                <Link href={'/fastbuy'} onClick={modalStore.closeMenuModal} className='bg-tg-theme-secondary-bg flex flex-1 py-[6px] items-center justify-center leading-7 text-center text-sm font-medium'>🚀 Быстрая покупка</Link>
              </div>
              <div className='flex gap-px'>
                <Link href={'/grabber'} onClick={modalStore.closeMenuModal} className='bg-tg-theme-secondary-bg flex flex-1 py-[6px] items-center justify-center leading-7 text-center text-sm font-medium'>🥷 Граббер</Link>
                <div onClick={() => showTelegramNotification('В разработке')} className='bg-tg-theme-secondary-bg text-tg-theme-hint flex flex-1 py-[6px] items-center justify-center leading-7 text-center text-sm font-medium'>🔀 Мост</div>
              </div>
              <div className='flex gap-px'>
                <div onClick={() => openTelegramLink('https://t.me/TokenInformer')} className='bg-tg-theme-secondary-bg flex flex-1 py-[6px] items-center justify-center leading-7 text-center text-sm font-medium rounded-b-xl'>🔥 Тренды</div>
              </div>
            </div>
          </div>

          <div className='w-full'>
            <h3 className='text-sm font-bold my-2'>Airdrop</h3>
            <div className='flex flex-col gap-px'>
              <div className='flex gap-px'>
                <div onClick={() => showTelegramNotification('В разработке')} className='bg-tg-theme-secondary-bg text-tg-theme-hint flex flex-1 py-[6px] items-center justify-center leading-7 text-center text-sm font-medium rounded-xl'>☑️ Задания</div>
              </div>
            </div>
          </div>

          <div className='w-full'>
            <h3 className='text-sm font-bold my-2'>Профиль</h3>
            <div className='flex flex-col gap-px'>
              <div className='flex gap-px'>
                <div onClick={() => showTelegramNotification('В разработке')} className='bg-tg-theme-secondary-bg text-tg-theme-hint flex flex-1 py-[6px] items-center justify-center leading-7 text-center text-sm font-medium rounded-t-xl'>🗣️ Партнёрская программа</div>
              </div>
              <div className='flex gap-px'>
                <div onClick={() => showTelegramNotification('В разработке')} className='bg-tg-theme-secondary-bg text-tg-theme-hint flex flex-1 py-[6px] items-center justify-center leading-7 text-center text-sm font-medium'>📦 Тарифы</div>
                <div onClick={() => showTelegramNotification('В разработке')} className='bg-tg-theme-secondary-bg text-tg-theme-hint flex flex-1 py-[6px] items-center justify-center leading-7 text-center text-sm font-medium'>⚙️ Настройки</div>
              </div>
              <div className='flex gap-px'>
                <div onClick={() => showTelegramNotification('В разработке')} className='bg-tg-theme-secondary-bg text-tg-theme-hint flex flex-1 py-[6px] items-center justify-center leading-7 text-center text-sm font-medium rounded-b-xl'>💎 Токенсейл</div>
              </div>
            </div>
          </div>

          <div className='w-full'>
            <h3 className='text-sm font-bold my-2'>Ресурсы</h3>
            <div className='flex flex-col gap-px'>
              <div className='flex gap-px'>
                <a href='https://x-bot-3.gitbook.io/xbot' target='_blank' className='bg-tg-theme-secondary-bg flex flex-1 py-[6px] items-center justify-center leading-7 text-center text-sm font-medium rounded-t-xl'>📑 Инструкции</a>
              </div>
              <div className='flex gap-px'>
                <div onClick={() => openTelegramLink('https://t.me/xbotnewsru')} className='bg-tg-theme-secondary-bg flex flex-1 py-[6px] items-center justify-center leading-7 text-center text-sm font-medium'>📢 Канал</div>
                <div onClick={() => openTelegramLink('https://t.me/xbotchatru')} className='bg-tg-theme-secondary-bg flex flex-1 py-[6px] items-center justify-center leading-7 text-center text-sm font-medium'>💬 Чат</div>
              </div>
              <div className='flex gap-px'>
                <a href='https://www.youtube.com/@X-bot-dex' target='_blank' className='bg-tg-theme-secondary-bg flex flex-1 py-[6px] items-center justify-center leading-7 text-center text-sm font-medium rounded-bl-xl'>📺 YouTube</a>
                <a href='https://x.com/xbotdex' target='_blank' className='bg-tg-theme-secondary-bg flex flex-1 py-[6px] items-center justify-center leading-7 text-center text-sm font-medium rounded-br-xl'>🕊️ X (Twitter)</a>
              </div>
            </div>
          </div>

          <div className='w-full'>
            <h3 className='text-sm font-bold my-2'>Для фаундеров</h3>
            <div className='flex flex-col gap-px'>
              <div className='flex gap-px'>
                <div onClick={() => openTelegramLink('https://t.me/XNotificator_Bot')} className='bg-tg-theme-secondary-bg flex flex-1 py-[6px] items-center justify-center leading-7 text-center text-sm font-medium rounded-tl-xl'>📈 XTRENDING</div>
                <div onClick={() => openTelegramLink('https://t.me/XXXBuy_bot')} className='bg-tg-theme-secondary-bg flex flex-1 py-[6px] items-center justify-center leading-7 text-center text-sm font-medium rounded-tr-xl'>🟢 XBUY</div>
              </div>
              <div className='flex gap-px'>
                <div onClick={() => showTelegramNotification('В разработке')} className='bg-tg-theme-secondary-bg text-tg-theme-hint flex flex-1 py-[6px] items-center justify-center leading-7 text-center text-sm font-medium'>🔌 XAPI</div>
                <div onClick={() => showTelegramNotification('В разработке')} className='bg-tg-theme-secondary-bg text-tg-theme-hint flex flex-1 py-[6px] items-center justify-center leading-7 text-center text-sm font-medium'>✂️ XMM</div>
              </div>
              <div className='flex gap-px'>
                <div onClick={() => openTelegramLink('https://t.me/illmooney')} className='bg-tg-theme-secondary-bg flex flex-1 py-[6px] items-center justify-center leading-7 text-center text-sm font-medium rounded-b-xl'>🤝 Сотрудничество</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
});

export default MenuModal;



