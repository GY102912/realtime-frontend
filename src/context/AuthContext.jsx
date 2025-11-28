import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { refreshAccessToken, setAxiosAccessToken, clearAxiosAccessToken } from "../api/axios";
import { getMyProfile } from "../api/user";

const ENDPOINT = "http://localhost:8080";

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const location = useLocation();
    const pathname = location.pathname;

    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [initialized, setInitialized] = useState(false);

    const logout = () => {
        setAccessToken(null);
        setUser(null);
    };

    useEffect(() => {
        async function init() {
            try {
                // 로그인/회원가입 페이지에서는 refresh 시도 안 함
                if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
                    setInitialized(true);
                    return;
                }

                // 🔥 새로고침 시 refreshToken으로 accessToken 재발급
                const refreshRes = await refreshAccessToken();
                const { accessToken } = refreshRes.data;

                // 🔥 axiosInstance의 메모리에 accessToken 저장
                setAxiosAccessToken(accessToken);

                // 🔥 UI에도 accessToken을 넣음 (isAuthenticated 등)
                setAccessToken(accessToken);

                // 🔥 프로필도 불러오기 (선택)
                const profileRes = await getMyProfile();
                setUser(profileRes.data);

            } catch (e) {
                console.log("초기 토큰 복구 실패:", e);
                clearAxiosAccessToken();
                setAccessToken(null);
                setUser(null);

            } finally {
                setInitialized(true);
            }
        }
        init();
    }, []);

    const isAuthenticated = !!accessToken;

    return (
        <AuthContext.Provider
            value={{ 
                initialized,
                user, 
                isAuthenticated, 
                logout, 
                accessToken,
                setAccessToken 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
