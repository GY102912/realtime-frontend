import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPostDetail, deletePost } from "../../api/post";
import { useCommentList } from "../useCommentList";

export function usePostDetailPage(postId) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(null);
  const [post, setPost] = useState(null);
  const {
    comments, cursor, hasNext,
    setComments, setCursor, setHasNext,
    handleCreateComment,
    handleDeleteComment,
    fetchMoreComments,
  } = useCommentList();

  useEffect(() => {
    async function fetchPost() {
      const res = await getPostDetail(postId);
      setPost(res.data);

      const { items, nextCursor, hasNext } = res.data.commentsPreview;
      setComments(items);
      setCursor(nextCursor);
      setHasNext(hasNext);
    }
    fetchPost();
  }, [postId]);

  const confirmDeletePost = async () => {
    await deletePost(postId);
    navigate("/boards/main");
  };

  const submitComment = async (content) => {
    const newComment = await handleCreateComment(postId, content);
    setPost(prev => ({ ...prev, commentCount: prev.commentCount + 1 }));
    return newComment;
  };

  const confirmDeleteComment = async (commentId) => {
    await handleDeleteComment(postId, commentId);
    setPost(prev => ({ ...prev, commentCount: prev.commentCount - 1 }));
  };

  const handleEdit = () => navigate(`/boards/main/posts/${postId}/edit`);

  const openDeletePostModal = () => setOpenModal({ type: "post" });
  const openDeleteCommentModal = (commentId) =>
    setOpenModal({ type: "comment", id: commentId });

  const executeModalAction = () => {
    if (openModal?.type === "post") return confirmDeletePost();
    if (openModal?.type === "comment")
      return confirmDeleteComment(openModal.id);
  };

  return {
    post,
    comments,
    hasNext,

    openModal,
    setOpenModal,
    executeModalAction,
    openDeletePostModal,
    openDeleteCommentModal,

    handleEdit,
    submitComment,
    fetchMoreComments,
  };
}
