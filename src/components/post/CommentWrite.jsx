import { useState } from "react";
import Button from "../common/Button";

export default function CommentWrite({
  placeholder = "댓글을 남겨주세요!",
  submitText = "댓글 등록",
  onSubmit,
  disabled = false,
  autoResize = true,
  onFocus,
  onBlur,
  className = "",
}) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content);
    setContent(""); // 초기화
  };

  const handleChange = (e) => {
    setContent(e.target.value);

    // textarea 자동 높이 조절 기능
    if (autoResize) {
      const el = e.target;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  return (
    <section className="mt-8 mb-4">
      <textarea
        className="textarea textarea-bordered w-full h-28"
        placeholder={placeholder}
        value={content}
        disabled={disabled}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      <div className="mt-3 flex justify-end"></div>

      <Button
        variant="btn-primary"
        onClick={handleSubmit}
        disabled={disabled}
      >
        {submitText}
      </Button>
    </section>
  );
}
