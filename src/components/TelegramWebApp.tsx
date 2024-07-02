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
  return null;
};

export default TelegramWebApp;
