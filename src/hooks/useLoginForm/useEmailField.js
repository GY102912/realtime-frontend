import { useState } from "react";

export default function useEmailField() {
    const [email, setEmail] = useState("");
    const [emailHelper, setEmailHelper] = useState("");

    const handleChange = (email) => {
        setEmail(email)
    };

    const handleHelper = (email) => {
        if (!email) setEmailHelper("* 이메일을 입력해주세요.");
        else setEmailHelper("");
    };

    return {
        value: email,
        helper: emailHelper,
        onChange: handleChange,
        onBlur: handleHelper,
    };
}