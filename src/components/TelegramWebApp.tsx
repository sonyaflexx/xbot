'use client';

import { useEffect } from 'react';

const TelegramWebApp = () => {
  useEffect(() => {
    const initData = window.Telegram.WebApp.initData;
    const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
    
    console.log('Init data:', initData);
    console.log('Init data unsafe:', initDataUnsafe);

    window.Telegram.WebApp.ready();
  }, []);

  const sendMessage = () => {
    window.Telegram.WebApp.sendData("Привет от Next.js приложения!");
  };

  return (
    <div>
      <h1>Telegram Web App</h1>
      <button onClick={sendMessage}>Отправить сообщение</button>
    </div>
  );
};

export default TelegramWebApp;
