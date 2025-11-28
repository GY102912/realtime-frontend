import { useState } from "react";

export default function usePasswordField() {
    const [password, setPassword] = useState("");
    const [passwordHelper, setPasswordHelper] = useState("");

    const handleChange = (password) => {
        setPassword(password);
    };

    const handleHelper = (password) => {
        if (!password) setPasswordHelper("* 비밀번호를 입력해주세요.");
        else setPasswordHelper("");
    };

    return {
        value: password,
        helper: passwordHelper,
        onChange: handleChange,
        onBlur: handleHelper,
    };
}