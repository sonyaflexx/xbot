'use client'

interface SwitchProps {
    value: boolean;
    setValue: (value: boolean) => void;
    label?: string;
}
  
const Switch: React.FC<SwitchProps> = ({ value, setValue, label }) => {
    const toggleSwitch = () => {
        setValue(!value);
    };
  
    return (
        <div className="flex items-center space-x-4">
            <div
            className={`w-[60px] h-[34px] flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-400 ${value ? '!bg-tg-theme-button' : 'bg-gray-300 bg-opacity-30'}`}
            onClick={toggleSwitch}
            >
            <div
                className={`bg-white size-[26px] rounded-full shadow-md transform transition-transform duration-500 ${value ? 'translate-x-[26px]' : ''}`}
            />
            </div>
            {label && <span className="font-medium">{label}</span>}
        </div>
    );
  }
  
  export default Switch;