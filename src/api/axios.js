import axios from "axios";

const ENDPOINT = "http://localhost:8080";

let isRefreshing = false;
let refreshPromise = null;

export async function refreshAccessToken() {
    if (isRefreshing) return refreshPromise;

    isRefreshing = true;
    refreshPromise = axios.post(
        `${ENDPOINT}/tokens/reissue`,
        {},
        { withCredentials: true }
    ).finally(() => { isRefreshing = false });

    return refreshPromise;
}

// 🔥 axios 전용 메모리 저장소 — React와 절대 공유 안 함
let accessToken = null;

// 외부에서 로그인/초기화 시 토큰 설정하는 함수
export function setAxiosAccessToken(token) {
    accessToken = token;
}

// 로그아웃 시 토큰 초기화
export function clearAxiosAccessToken() {
    accessToken = null;
}

export const axiosInstance = axios.create({
    baseURL: ENDPOINT,
    withCredentials: true, // refresh 토큰 쿠키 자동 전송
});

// === REQUEST INTERCEPTOR ================================
axiosInstance.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// === RESPONSE INTERCEPTOR ===============================
axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
        const original = error.config;

        // 인증 오류가 아니거나, 이미 재시도한 요청이면 중단
        if (error.response?.status !== 401 || original._retry) {
            return Promise.reject(error);
        }

        original._retry = true;

        try {
            const refreshRes = refreshAccessToken();

            const newAccessToken = refreshRes.data.accessToken;

            // 🔥 axiosInstance 전용 메모리 업데이트
            setAxiosAccessToken(newAccessToken);

            // 🔥 실패했던 요청에 새로운 토큰 적용
            original.headers.Authorization = `Bearer ${newAccessToken}`;

            // 🔥 재요청
            return axiosInstance(original);

        } catch (e) {
            console.error("토큰 재발급 실패:", e);

            // 🔥 토큰 삭제 (로그아웃 유도)
            clearAxiosAccessToken();

            return Promise.reject(e);
        }
    }
);
