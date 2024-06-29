'use client'

import { useState } from 'react';

interface MultiInputProps {
  placeholder?: string;
  value: string;
  setValue: any;
}

const MultiInput: React.FC<MultiInputProps> = ({ value, setValue, placeholder }) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className={`w-full bg-tg-theme-secondary-bg border-tg-theme-secondary-bg px-5 pt-2 pb-2 border rounded-xl font-light outline-none transition-colors duration-300`}
      />
    </div>
  );
};

export default MultiInput;
