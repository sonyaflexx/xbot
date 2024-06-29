'use client'

import { useState } from 'react';

interface TextInputProps {
  label: string;
  value: string;
  setValue: any;
}

const TextInput: React.FC<TextInputProps> = ({ value, setValue, label }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`w-full bg-tg-theme-secondary-bg px-5 pt-6 pb-2 border ${
          isFocused ? 'border-tg-main' : 'border-tg-theme-secondary-bg'
        } rounded-xl font-light outline-none transition-colors duration-300`}
      />
      <label
        className={`absolute left-4 ${
          isFocused || value && value !== '' ? 'text-tg-main text-xs top-2' : 'text-gray-500 top-1/2 -translate-y-1/2'
        } transition-all pointer-events-none bg-transparent px-1`}
      >
        {label}
      </label>
    </div>
  );
};

export default TextInput;
