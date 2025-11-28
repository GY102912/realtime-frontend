import useProfileField from "./useProfileField";
import useEmailField from "./useEmailField";
import usePasswordField from "./usePasswordField";
import useConfirmPasswordField from "./useConfirmPasswordField";
import useNicknameField from "./useNicknameField";

import { signup, uploadProfileImage } from "../../api/user";

export function useSignupForm(navigate) {
    const profile = useProfileField();
    const email = useEmailField();
    const password = usePasswordField();
    const confirmPassword = useConfirmPasswordField(password.value);
    const nickname = useNicknameField();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", profile.file);

        try {
            const {
                data: { imageUrl = null },
            } = await uploadProfileImage(formData);
            await signup(email.value, password.value, nickname.value, imageUrl);
            navigate("/login");
            
        } catch (error) {
            console.error(error);
        }
    };

    return {
        profile,
        email,
        password,
        confirmPassword,
        nickname,
        handleSubmit,
    };
}
