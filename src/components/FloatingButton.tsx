'use client'

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Link from 'next/link';

interface FloatingButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ text, href, onClick }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[420px]">
      <div className="duration-300 absolute left-0 w-full transition-transform px-2">
        {href ? (
          <Link href={href} className="w-full bg-tg-theme-button text-white flex justify-center items-center mb-2 h-11 rounded-xl font-semibold uppercase">
            {text}
          </Link>
        ) : (
          <button onClick={onClick} className="w-full bg-tg-theme-button text-white flex justify-center items-center mb-2 h-11 rounded-xl font-semibold uppercase">
            {text}
          </button>
        )}
      </div>
    </div>,
    document.body
  );
};

export default FloatingButton;
