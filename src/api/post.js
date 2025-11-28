import { axiosInstance } from "../api/axios";

export const getPosts = (cursor) => {
    if (cursor !== null) return axiosInstance.get('/posts', { cursor });
    else return axiosInstance.get('/posts');
};

export const getPostDetail = (id) => {
    return axiosInstance.get(`/posts/${id}`);
};

export const createPost = (title, content, postImageUrls) => {
    return axiosInstance.post('/posts', { title, content, postImageUrls });
};

export const updatePost = (id, title, content, postImageUrls) => {
    return axiosInstance.put(`/posts/${id}`, { title, content, postImageUrls });
};

export const deletePost = (id) => {
    return axiosInstance.delete(`/posts/${id}`);
};

export const likePost = async (postId) => {
    return axiosInstance.post(`/posts/${postId}/likes`);
};

export const unlikePost = async (postId) => {
    return axiosInstance.delete(`/posts/${postId}/likes`);
};
