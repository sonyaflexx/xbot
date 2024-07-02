'use client';

import { useEffect } from 'react';

const TelegramWebApp = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const initData = window.Telegram.WebApp.initData;
      const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
      
      console.log('Init data:', initData);
      console.log('Init data unsafe:', initDataUnsafe);

      window.Telegram.WebApp.ready();
    } else {
      console.error('Telegram WebApp is not defined');
    }
  }, []);

  const sendMessage = () => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.sendData("Привет от Next.js приложения!");
    } else {
      console.error('Telegram WebApp is not defined');
    }
  };

  return (
    <div>
      <h1>Telegram Web App</h1>
      <button onClick={sendMessage}>Отправить сообщение</button>
    </div>
  );
};

export default TelegramWebApp;
