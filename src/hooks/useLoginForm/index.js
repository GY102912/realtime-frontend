import useEmailField from "./useEmailField";
import usePasswordField from "./usePasswordField";
import { useAuthContext } from "../../context/AuthContext";
import { useAuthApi } from "../../api/useAuthApi";

export function useLoginForm(navigate) {
    const email = useEmailField();
    const password = usePasswordField();

    const { applyAuth } = useAuthContext();
    const { login } = useAuthApi();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const loginRes = await login(email.value, password.value);
            const accessToken = loginRes.data.accessToken;
            applyAuth(accessToken, null);
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