import React from 'react';
import CopyIcon from './icons/CopyIcon';
import { showTelegramNotification } from '@/utils/telegramNotifications';

interface CopyFieldProps {
  title: string;
  content: string;
  notification?: string;
}

const CopyField: React.FC<CopyFieldProps> = ({ title, content, notification }) => {
  const isContentEmpty = content === "";

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    if (notification) showTelegramNotification(notification);
  }

  return (
    <div className="flex items-center w-full">
        <div className="pl-5 py-2 bg-tg-theme-secondary-bg overflow-hidden rounded-xl flex flex-col flex-1">
            <span className="text-xs text-tg-theme-button">{title}</span>
            {isContentEmpty ? (
                <div className="h-6 my-1 rounded-md bg-tg-theme-hint animate-pulse" />
            ) : (
              <div className='flex items-center w-full'>
                <input type="text" disabled value={content} className="bg-tg-theme-secondary-bg text-tg-text focus:outline-none h-8 flex-1 min-w-0" />
                <span onClick={handleCopy} className="material-symbols-outlined text-tg-theme-button mx-3 -mt-4 leading-none cursor-pointer">
                  <CopyIcon />
                </span>
              </div>
            )}
        </div>
    </div>
  );
}

export default CopyField;


