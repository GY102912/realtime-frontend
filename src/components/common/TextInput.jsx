export default function TextInput({
    label,
    id,
    type = "text",
    value,
    placeholder,
    onChange,
    onBlur,
    helperText,
}) {
    return (
        <div className="form-control w-full">
            <label htmlFor={id} className="label">
                <span className="label-text">{label}</span>
            </label>

            <input
                id={id}
                type={type}
                className="input input-bordered w-full"
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
            />

            {helperText && (
                <p className="text-sm text-red-500 mt-1 whitespace-pre-line">{helperText}</p>
            )}
        </div>
    );
}
