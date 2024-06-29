export default function BnbLogo({ width, height } : { width: string, height: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width || "28"} height={height || "28"} viewBox="0 0 32 32">
            <g fill="none">
            <circle cx="16" cy="16" r="16" fill="#F3BA2F"></circle>
            <path fill="#FFF" d="M12.116 14.404L16 10.52l3.886 3.886l2.26-2.26L16 6l-6.144 6.144l2.26 2.26zM6 16l2.26-2.26L10.52 16l-2.26 2.26L6 16zm6.116 1.596L16 21.48l3.886-3.886l2.26 2.259L16 26l-6.144-6.144l-.003-.003l2.263-2.257zM21.48 16l2.26-2.26L26 16l-2.26 2.26L21.48 16zm-3.188-.002h.002V16L16 18.294l-2.291-2.29l-.004-.004l.004-.003l.401-.402l.195-.195L16 13.706l2.293 2.293z">
            </path>
            </g>
        </svg>
    );
}