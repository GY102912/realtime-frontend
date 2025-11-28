import { useState } from "react";

export default function useConfirmPasswordField(password) {
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordHelper, setConfirmPasswordHelper] = useState("");

    const handleChange = (confirmPassword) => {
        setConfirmPassword(confirmPassword);
    };

    const handleHelper = (confirmPassword) => {
        if (!confirmPassword) setConfirmPasswordHelper("* 비밀번호를 한 번 더 입력해주세요.");
        else if (confirmPassword != password) setConfirmPasswordHelper("* 비밀번호가 일치하지 않습니다.");
        else setConfirmPasswordHelper("");
    };

    return {
        value: confirmPassword,
        helper: confirmPasswordHelper,
        onChange: handleChange,
        onBlur: handleHelper,
    };
}