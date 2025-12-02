import { useAuthContext } from "../context/AuthContext";

export function usePostApi() {
    const { privateAxios } = useAuthContext();

    function getPosts(cursor) {
        if (cursor !== null) return privateAxios.get('/posts', { cursor });
        else return privateAxios.get('/posts');
    };

    function getPostDetail(id) {
        return privateAxios.get(`/posts/${id}`);
    };

    function createPost(title, content, postImageUrls) {
        return privateAxios.post('/posts', { title, content, postImageUrls });
    };

    function updatePost(id, title, content, postImageUrls) {
        return privateAxios.put(`/posts/${id}`, { title, content, postImageUrls });
    };

    function deletePost(id) {
        return privateAxios.delete(`/posts/${id}`);
    };

    function likePost (postId) {
        return privateAxios.post(`/posts/${postId}/likes`);
    };

    function unlikePost (postId) {
        return privateAxios.delete(`/posts/${postId}/likes`);
    };

    return {
        getPosts,
        getPostDetail,
        createPost,
        updatePost,
        deletePost,
        likePost,
        unlikePost,
    }
}
