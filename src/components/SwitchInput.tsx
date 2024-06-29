import SelectedIcon from "./icons/SelectedIcon"

export default function SwitchInput({ value, setValue }: { value: any, setValue: any }) {
    return (
        <div className="bg-tg-theme-secondary-bg font-light text-sm overflow-hidden rounded-xl flex flex-col flex-1">
            <div onClick={() => setValue('create')} className="px-3 py-[13px] leading-none flex items-center gap-3 rounded-t-xl">
                <div className={value === 'create' ? '' : 'opacity-0'}>
                    <SelectedIcon />
                </div>
                <span>Сгенерировать новый</span>
            </div>
            <div onClick={() => setValue('import')} className="px-3 py-[13px] leading-none flex items-center gap-3 rounded-b-xl">
                <div className={value === 'import' ? '' : 'opacity-0'}>
                    <SelectedIcon />
                </div>
                <span>Импортировать</span>
            </div>
        </div>
    )
}