declare global {
    interface Window {
      Telegram: {
        WebApp: {
          initData: string;
          initDataUnsafe: any;
          ready: () => void;
          sendData: (data: string) => void;
        };
      };
    }
  }
  
  export {};
  