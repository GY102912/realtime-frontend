import { useState } from "react";
import { validatePasswordFormat } from "../../validators/signupValidators";

export default function usePasswordField() {
    const [password, setPassword] = useState("");
    const [passwordHelper, setPasswordHelper] = useState("");

    const handleChange = (password) => {
        setPassword(password);
    };

    const handleHelper = (password) => {
        if (!password) setPasswordHelper("* 비밀번호를 입력해주세요.");
        else if (!validatePasswordFormat(password)) setPasswordHelper("* 비밀번호는 8~20자이며, 영문 + 숫자를 포함해야 합니다.");
        else setPasswordHelper("");
    };

    return {
        value: password,
        helper: passwordHelper,
        onChange: handleChange,
        onBlur: handleHelper,
    };
}