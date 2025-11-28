import { useState } from "react";

export default function useTitleField() {
  const [title, setTitle] = useState("");
  const [titleHelper, setTitleHelper] = useState("");

  const handleChange = (value) => {
    setTitle(value);
  };

  const handleBlur = (value) => {
    if (!value.trim()) setTitleHelper("* 제목을 입력해주세요.");
    else if (value.length > 26) setTitleHelper("* 제목은 26글자 이하로 입력해주세요.");
    else setTitleHelper("");
  };

  return {
    value: title,
    helper: titleHelper,
    onChange: handleChange,
    onBlur: handleBlur,
  };
}
