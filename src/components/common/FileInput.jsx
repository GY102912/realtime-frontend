import { useRef } from "react";

export default function FileInput({
    label,
    id,
    preview,
    onChange,
    helperText,
    accept = "image/*",
}) {
    const inputRef = useRef();
    const handleClick = () => {
        inputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const localPreview = URL.createObjectURL(file);
        onChange({ file, preview: localPreview });
    };

    return (
        <div className="form-control w-full">
            {/* 라벨: 왼쪽 정렬 유지 */}
            <label htmlFor={id} className="label self-start">
                <span className="label-text">{label}</span>
            </label>

            {/* 원형 업로드 영역: 중앙 정렬 */}
            <div
                className="w-28 h-28 rounded-full bg-base-200 border border-base-300
                        flex items-center justify-center cursor-pointer overflow-hidden
                        mx-auto"
                onClick={handleClick}
            >
                {preview ? (
                    <img
                        src={preview}
                        alt="preview"
                        className="w-full h-full object-cover rounded-full"
                    />
                ) : (
                    <span className="text-4xl text-base-content/40">＋</span>
                )}
            </div>

            {/* 숨겨진 파일 input */}
            <input 
                id={id}
                type="file"
                ref={inputRef}
                hidden
                accept={accept}
                onChange={handleFileChange}
            />

            {helperText && (
                <p className="text-sm text-red-500 mt-2">{helperText}</p>
            )}
        </div>
    );
}