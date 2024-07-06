import axios from 'axios';

const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;

export const sendTelegramMessage = async (chatId: string, message: string) => {
  try {
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: message,
      parse_mode: 'MarkdownV2'
    });
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};