import { useUserApi } from "../api/useUserApi";

export const validateEmailFormat = (email) => {
    const regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/;
    return regex.test(email);
};

export const validatePasswordFormat = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d).{8,20}$/;
    return regex.test(password);
};

export const validateNicknameFormat = (nickname) => {
    const regex = /^[가-힣a-zA-Z0-9]+$/;
    return regex.test(nickname);
};

export const validateEmailAvailability = async (email) => {
    const { checkEmailAvailability } = useUserApi();
    const { isAvailable } = await checkEmailAvailability(email);
    return isAvailable;
}

export const validateNicknameAvailability = async (nickname) => {
    const { checkNicknameAvailability } = useUserApi();
    const { isAvailable } = await checkNicknameAvailability(nickname);
    return isAvailable;
}