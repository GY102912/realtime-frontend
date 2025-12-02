import { useAuthContext } from "../context/AuthContext";

export function useCommentApi() {
  const { privateAxios } = useAuthContext();

  function getComments(postId, cursor) {
    if (cursor !== null) return privateAxios.get(`/posts/${postId}/comments`, { cursor });
    else return privateAxios.get(`/posts/${postId}/comments`);
  };

  function createComment(postId, content) {
    return privateAxios.post(`/posts/${postId}/comments`, { content });
  };

  function updateComment(postId, commentId, content) {
    return privateAxios.put(`/posts/${postId}/comments/${commentId}`, { content });
  };

  function deleteComment(postId, commentId) {
    return privateAxios.delete(`/posts/${postId}/comments/${commentId}`);
  };

  return {
    getComments,
    createComment,
    updateComment,
    deleteComment,
  };
};