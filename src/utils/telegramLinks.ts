export const openTelegramLink = (link: string) => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.openTelegramLink(link);
    } else {
      console.error('Telegram WebApp is not defined');
    }
};