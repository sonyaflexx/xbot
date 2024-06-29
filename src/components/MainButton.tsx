import Link from "next/link";

interface MainButtonProps {
    type: string;
    icon?: string;
    title: string;
    description: string;
    onClick?: () => void;
    href?: string;
}
  
const MainButton: React.FC<MainButtonProps> = ({ type, icon, title, description, onClick, href }) => {
    return (
        type && href && type === 'link' && (
            <Link href={href} className="py-2 px-3 flex bg-tg-theme-secondary-bg gap-3 rounded-xl">
                <span className="text-[32px]">{icon}</span>
                <div className="flex flex-col text-sm">
                    <span className="font-bold">{title}</span>
                    <span className="font-light mt-0.5 text-zinc-400 leading-5 mr-4">{description}</span>
                </div>
            </Link>
        )
    )
}

export default MainButton;