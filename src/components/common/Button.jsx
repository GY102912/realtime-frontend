export default function Button({
    type = "button",
    children,
    variant = "",
    className = "",
    onClick,
    disabled = false,
}) {
    return (
        <button
            type={type}
            className={`btn ${variant} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
