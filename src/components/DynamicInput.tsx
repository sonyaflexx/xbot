import React, { useEffect, useState } from 'react';
import MultiInput from './MultiInput';
import Image from 'next/image';

interface DynamicInputsProps {
  value: string[];
  setValue: (value: any) => void;
  label?: string;
  placeholder?: string;
}

const DynamicInputs: React.FC<DynamicInputsProps> = ({ placeholder, value, setValue, label }) => {
  const [inputs, setInputs] = useState<string[]>(value);

  const handleChange = (index: number, newValue: string) => {
    const newInputs = [...inputs];
    newInputs[index] = newValue;
    setInputs(newInputs);
    setValue(newInputs);

    if (index === inputs.length - 1 && newValue !== '') {
      addInput();
    }
  };

  const addInput = () => {
      const newInputs = [...inputs, ''];
      setInputs(newInputs);
      setValue(newInputs);
    };
    
    const removeInput = (index: number) => {
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);
        setValue(newInputs);
    };

    useEffect(() => addInput(), []);

  return (
    <div>
      {inputs.map((input, index) => (
        <div key={index} className="flex items-center bg-tg-theme-secondary-bg border-tg-theme-secondary-bg pl-5 py-3 border first:rounded-t-xl last:rounded-b-xl">
            <input
                type="text"
                value={input}
                placeholder={placeholder}
                onChange={(e) => handleChange(index, e.target.value)}
                className={`w-full bg-tg-theme-secondary-bg border-tg-theme-secondary-bg font-light outline-none transition-colors duration-300`}
            />
            {index !== inputs.length - 1 && ( 
                <button
                type="button"
                onClick={() => removeInput(index)}
                className="text-red-500 hover:text-red-700 px-4"
                >
                    <Image src={'https://chainspy.org/static/icons8-minus-50.png'} alt='' width={20} height={20} />
                </button>
            )}
        </div>
      ))}
    </div>
  );
};

export default DynamicInputs;
