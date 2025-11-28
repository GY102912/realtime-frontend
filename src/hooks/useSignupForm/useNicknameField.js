import { useState } from "react";
import { validateNicknameFormat, validateNicknameAvailability } from "../../validators/signupValidators";

export default function useNicknameField() {
    const [nickname, setNickname] = useState("");
    const [nicknameHelper, setNicknameHelper] = useState("");
 
    const handleChange = (nickname) => {
        setNickname(nickname);
    };

    const handleHelper = (nickname) => {
        if (!nickname) setNicknameHelper("* 닉네임을 입력해주세요.");
        else if (!validateNicknameFormat(nickname)) setNicknameHelper("* 닉네임에 한글, 영어, 숫자만 사용할 수 있습니다.");
        else if (!validateNicknameAvailability(nickname)) setNicknameHelper("* 사용할 수 없는 닉네임입니다.");
        else setNicknameHelper("");
    };

    return {
        value: nickname,
        helper: nicknameHelper,
        onChange: handleChange,
        onBlur: handleHelper,
    };
}