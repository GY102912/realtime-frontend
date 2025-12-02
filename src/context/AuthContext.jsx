import { createContext, useContext, useState, useRef, useEffect, useMemo } from "react";
import axios from "axios";

const ENDPOINT = "http://localhost:8080";

const AuthContext = createContext(null);

export function useAuthContext() {
    return useContext(AuthContext);
}

// 비인증 요청을 위한 axios 인스턴스
const publicAxios = axios.create({
    baseURL: ENDPOINT,
    withCredentials: true,
});

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [initialized, setInitialized] = useState(false);

    const tokenRef = useRef(null);
    useEffect(() => {
        tokenRef.current = accessToken;
    }, [accessToken]);

    const resetAuthContext = async () => {
        tokenRef.current = null; 
        setAccessToken(null);
        setUser(null);
    };

    // 인증 요청을 위한 axios 인스턴스
    const privateAxios = useMemo(() => {
        const instance = axios.create({
        baseURL: ENDPOINT,
        withCredentials: true,
        });

        // 요청 인터셉터
        instance.interceptors.request.use(
        (config) => {
            const token = tokenRef.current;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
        );

        // 응답 인터셉터
        instance.interceptors.response.use(
            (res) => res,
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status !== 401 || originalRequest._retry) {
                    return Promise.reject(error);
                }

                originalRequest._retry = true; // 중복 요청 방지

                try {
                    const res = await publicAxios.post("/tokens/reissue");
                    const { accessToken } = res.data;
                    setAccessToken(accessToken ?? null);

                    // 요청 재시도
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return instance(originalRequest); 

                } catch (refreshError) {
                    resetAuthContext();
                    return Promise.reject(refreshError);
                }
            }
        );

        return instance;
    }, []);

    // 페이지 새로고침 시 토큰 재발급
    useEffect(() => {
        async function init() {
            try {
                const reissueRes = await publicAxios.post("/tokens/reissue");
                const { accessToken } = reissueRes.data;
                setAccessToken(accessToken ?? null);

                const profileRes = await privateAxios.get("/users/me");
                const userProfile = profileRes.data;
                setUser(userProfile ?? null);

            } catch (refreshError) {
                resetAuthContext();
                
            } finally {
                setInitialized(true);
            }
        }
        init();
    }, []);

    const isAuthenticated = !!accessToken;
    const value = {
        initialized,
        isAuthenticated,
        user,
        publicAxios,
        privateAxios,
        setAccessToken,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
