import { useState } from "react";
import { validateEmailFormat, validateEmailAvailability } from "../../validators/signupValidators";

export default function useEmailField() {
    const [email, setEmail] = useState("");
    const [emailHelper, setEmailHelper] = useState("");

    const handleChange = (email) => {
        setEmail(email)
    };

    const handleHelper = (email) => {
        if (!email) setEmailHelper("* 이메일을 입력해주세요.");
        else if (!validateEmailFormat(email)) setEmailHelper("* 올바른 형식의 이메일을 입력해주세요.\n (예: example@gmail.com)");
        else if (!validateEmailAvailability(email)) setEmailHelper("* 사용할 수 없는 이메일입니다.");
        else setEmailHelper("");
    };

    return {
        value: email,
        helper: emailHelper,
        onChange: handleChange,
        onBlur: handleHelper,
    };
}