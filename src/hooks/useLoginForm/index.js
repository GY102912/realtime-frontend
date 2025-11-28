import useEmailField from "./useEmailField";
import usePasswordField from "./usePasswordField";

import { setAxiosAccessToken } from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../api/auth";

export function useLoginForm(navigate) {
    const email = useEmailField();
    const password = usePasswordField();

    const { setAccessToken } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await login(email.value, password.value);

            const { accessToken } = res.data;
            setAxiosAccessToken(accessToken);
            setAccessToken(accessToken);

            navigate("/boards/main");

        } catch(error) {
            console.log(error);
        }
    }

    return {
        email, password,
        handleSubmit,
    };
}