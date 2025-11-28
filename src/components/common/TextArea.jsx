export default function TextArea({
  label,
  id,
  value,
  placeholder,
  rows = 6,
  onChange,
  onBlur,
  helperText,
}) {
  return (
    <div className="form-control w-full">
      <label htmlFor={id} className="label">
        <span className="label-text">{label}</span>
      </label>

      <textarea
        id={id}
        rows={rows}
        className="textarea textarea-bordered w-full resize-none"
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
