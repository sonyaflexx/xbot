export const showTelegramNotification = (text: string) => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.showAlert(text);
    } else {
      console.error('Telegram WebApp is not defined');
    }
};