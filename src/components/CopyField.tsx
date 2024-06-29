import React from 'react';
import CopyIcon from './icons/CopyIcon';

interface CopyFieldProps {
  title: string;
  content: string;
}

const CopyField: React.FC<CopyFieldProps> = ({ title, content }) => {
  const isContentEmpty = content === "";

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  }

  return (
    <div className="flex items-center w-full">
        <div className="pl-5 py-2 bg-tg-theme-secondary-bg overflow-hidden rounded-xl flex flex-col flex-1">
            <span className="text-xs text-tg-main">{title}</span>
            {isContentEmpty ? (
                <div className="h-6 my-1 rounded-md bg-tg-theme-hint animate-pulse" />
            ) : (
              <div className='flex items-center w-full'>
                <input type="text" disabled value={content} className="bg-tg-theme-secondary-bg focus:outline-none h-8 flex-1" />
                <span onClick={handleCopy} className="material-symbols-outlined text-tg-main mx-3 -mt-4 leading-none cursor-pointer">
                  <CopyIcon />
                </span>
              </div>
            )}
        </div>
    </div>
  );
}

export default CopyField;


