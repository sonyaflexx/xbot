import React from 'react';

interface InfoFieldProps {
  title: string;
  content: string;
}

const InfoField: React.FC<InfoFieldProps> = ({ title, content }) => {
  const isContentEmpty = content === "";

  return (
    <div className="flex items-center w-full">
        <div className="px-5 py-2 bg-tg-theme-secondary-bg overflow-hidden rounded-xl flex flex-col flex-1">
            <span className="text-xs text-tg-theme-button">{title}</span>
            {isContentEmpty ? (
                <div className="h-6 my-1 rounded-md bg-tg-theme-hint animate-pulse" />
            ) : (
                <input type="text" disabled value={content} className="bg-tg-theme-secondary-bg focus:outline-none h-8" />
            )}
        </div>
    </div>
  );
}

export default InfoField;


