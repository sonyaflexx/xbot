'use client'

import { useState } from "react";

const InputWithSymbols = ({ className, type, value, setValue, symbols, label }: { className?: string, type?: string, value: string, setValue: any, symbols: string, label: string }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const regex = /^[0-9]*$/;
        if (regex.test(input)) {
            setValue(input);
        }
    };

    return (
        <div className="relative">
            <label
                className={`absolute left-4 ${
                    isFocused || value && value !== '' ? 'text-tg-main text-xs top-2' : 'text-gray-500 top-1/2 -translate-y-1/2'
                } transition-all pointer-events-none bg-transparent px-1`}
            >
                {label}
            </label>
            <div className={`flex items-center border ${isFocused ? 'border-tg-main' : `${className} border-tg-theme-secondary-bg`} rounded-xl transition-colors duration-300 h-full`}>
                <input
                    type="text"
                    value={value}
                    onChange={ type === 'number' ? (e) => handleNumberChange(e) : (e) => setValue(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={`w-full bg-tg-theme-secondary-bg ${className} rounded-l-xl pl-5 pt-6 pb-2 border-0 outline-none font-light`}
                />
                <div className={`px-4 text-tg-theme-hint bg-tg-theme-secondary-bg ${className} rounded-r-xl py-4 font-bold`}>
                    {symbols}
                </div>
            </div>
        </div>
    );
};

export default InputWithSymbols;
