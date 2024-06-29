import { Slider } from '@nextui-org/react';
import InputWithSymbols from './InputWithSymbols';

const GibridInput = ({ step, minValue, maxValue, className, value, setValue, symbols, label }: { step: number, minValue: number, maxValue: number, className?: string, value: string, setValue: any, symbols: string, label: string }) => {
    return (
        <div>
            <Slider
                step={step}
                maxValue={maxValue}
                minValue={minValue}
                onChange={setValue}
                color='secondary'
                className='my-2'
                classNames={{ thumb: 'bg-tg-main', track: 'bg-tg-theme-bg h-[10px]', filler: 'bg-tg-main' }}
            />
            <InputWithSymbols className={className} type="number" value={value} setValue={setValue} symbols={symbols} label={label} />
        </div>
    );
};

export default GibridInput;
