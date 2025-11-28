import { useState } from "react";

export default function useContentField() {
  const [content, setContent] = useState("");
  const [contentHelper, setContentHelper] = useState("");

  const handleChange = (value) => {
    setContent(value);
  };

  const handleBlur = (value) => {
    if (!value.trim()) setContentHelper("* 내용을 입력해주세요.");
    else setContentHelper("");
  };

  return {
    value: content,
    helper: contentHelper,
    onChange: handleChange,
    onBlur: handleBlur,
  };
}
