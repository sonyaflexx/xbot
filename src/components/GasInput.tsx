'use client'

import { useState } from "react";

interface GasInputProps {
    value: string;
    setValue: (value: string) => void;
}

const GasInput: React.FC<GasInputProps> = ({ value, setValue }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleNumberClick = (number: string) => {
        setValue(number);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const regex = /^[0-9]*$/;
        if (regex.test(input)) {
            setValue(input);
        }
    };

    return (
        <div>
            <div className="flex gap-2 mb-2">
                    <button
                        className={`h-6 min-w-[45px] flex-1 rounded-xl text-sm font-medium border-2 border-green-500 ${
                            value === '1' ? 'bg-green-500 text-white' : ''
                        }`}
                        onClick={() => handleNumberClick('1')}
                    >
                        1
                    </button>
                    <button
                        className={`h-6 min-w-[45px] flex-1 rounded-xl text-sm font-medium border-2 border-yellow-500 ${
                            value === '2' ? 'bg-yellow-500 text-white' : ''
                        }`}
                        onClick={() => handleNumberClick('2')}
                    >
                        2
                    </button>
                    <button
                        className={`h-6 min-w-[45px] flex-1 rounded-xl text-sm font-medium border-2 border-red-500 ${
                            value === '3' ? 'bg-red-500 text-white' : ''
                        }`}
                        onClick={() => handleNumberClick('3')}
                    >
                        3
                    </button>
            </div>
            <div className="relative">
                <label
                    className={`absolute left-4 ${
                        isFocused || value !== '' ? 'text-tg-theme-button text-xs top-2' : 'text-gray-500 top-1/2 -translate-y-1/2'
                    } transition-all pointer-events-none bg-transparent px-1`}
                >
                    Цена газа
                </label>
                <div className={`flex items-center border ${
                            isFocused ? 'border-tg-theme-button' : 'border-tg-theme-secondary-bg'
                        } rounded-xl font-light outline-none transition-colors duration-300`}>
                    <input
                        type="text"
                        value={value}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className={`w-full rounded-l-xl bg-tg-theme-secondary-bg px-5 pt-6 pb-2 outline-none`}
                        pattern="[0-9]*"
                    />
                    <div className="px-5 text-tg-theme-hint bg-tg-theme-secondary-bg rounded-r-xl py-4 font-bold">
                        Gwei
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GasInput;
