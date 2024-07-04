const applyTelegramTheme = () => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp?.themeParams) {
      const theme = window.Telegram.WebApp.themeParams;
  
      const root = document.documentElement;
  
      root.style.setProperty('--tg-theme-bg', theme.bg_color);
      root.style.setProperty('--tg-theme-button', theme.button_color);
      root.style.setProperty('--tg-theme-button-text', theme.button_text_color);
      root.style.setProperty('--tg-theme-hint', theme.hint_color);
      root.style.setProperty('--tg-theme-link', theme.link_color);
      root.style.setProperty('--tg-theme-secondary-bg', theme.secondary_bg_color);
      root.style.setProperty('--tg-theme-text', theme.text_color);
      root.style.setProperty('--tg-theme-header-bg', theme.header_bg_color);
      root.style.setProperty('--tg-theme-accent-text', theme.accent_color);
    }
};