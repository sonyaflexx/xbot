import { useState } from 'react';
import SelectIcon from './icons/SelectIcon';
import GibridInput from './GibridInput';

const OrderForm = ({ value, setValue }: { value: any, setValue: any }) => {
    const [selectedOption, setSelectedOption] = useState('profit');
    const [amount, setAmount] = useState('');
    const [profit, setProfit] = useState('');
    const [lose, setLose] = useState('');

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);
        setValue(selectedValue);
    };

    return (
        <div className="p-4 bg-tg-theme-secondary-bg rounded-xl">
            <div className='flex justify-between items-center'>
                <span className='text-sm font-bold text-tg-theme-hint'>Тип ордера</span>
                <div className='flex'>
                    <select
                        value={selectedOption}
                        onChange={handleSelectChange}
                        className='text-sm text-tg-main bg-tg-theme-secondary-bg outline-none border-none pr-4 appearance-none'
                    >
                        <option value="profit">Тейк-профит</option>
                        <option value="lose">Стоп-лосс</option>
                    </select>
                    <div className='flex items-center pointer-events-none text-tg-main'>
                        <SelectIcon />
                    </div>
                </div>
            </div>
            <GibridInput className='!bg-tg-theme-bg !border-b-tg-theme-bg' value={amount} setValue={setAmount} symbols='%' label='От баланса' maxValue={100} minValue={5} step={5} />
            { selectedOption === 'profit' ? (
                <GibridInput className='!bg-tg-theme-bg !border-b-tg-theme-bg' value={profit} setValue={setProfit} symbols='%' label='При росте на' maxValue={900} minValue={10} step={10} />
            ) : (
                <GibridInput className='!bg-tg-theme-bg !border-b-tg-theme-bg' value={lose} setValue={setLose} symbols='%' label='От баланса' maxValue={95} minValue={5} step={5} />
            )}

            <button className={`w-full bg-tg-main mt-4 h-[52px] text-sm font-medium rounded-xl`}>
                Создать
            </button>
        </div>
    );
};

export default OrderForm;
