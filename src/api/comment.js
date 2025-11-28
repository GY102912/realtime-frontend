import { axiosInstance } from "./axios";

export const getComments = (postId, cursor) => {
    if (cursor !== null) return axiosInstance.get(`/posts/${postId}/comments`, { cursor });
    else return get(`/posts/${postId}/comments`);
}

export const createComment = (postId, content) => axiosInstance.post(`/posts/${postId}/comments`, { content });

export const updateComment = (postId, commentId, content) => axiosInstance.put(`/posts/${postId}/comments/${commentId}`, { content });

export const deleteComment = (postId, commentId) => axiosInstance.delete(`/posts/${postId}/comments/${commentId}`);