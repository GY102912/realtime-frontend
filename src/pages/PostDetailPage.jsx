import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePostDetail } from "../hooks/usePostDetail";
import { useCommentList } from "../hooks/useCommentList";
import { getPostDetail } from "../api/post";
import PostSection from "../components/post/PostSection";
import CommentSection from "../components/post/CommentSection";
import Modal from "../components/common/Modal";

export default function PostDetailPage() {
  const { postId } = useParams();

  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(null);
  const { post, setPost, handleDeletePost, } = usePostDetail();
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

  const modalConfig = openModal?.type === "post"
  ? {
      title: "게시글을 삭제하시겠습니까?",
      message: "삭제한 게시글은 복구할 수 없습니다.",
      onConfirm: () => handleDeletePost(openModal.id)
    }
  : openModal?.type === "comment"
  ? {
      title: "댓글을 삭제하시겠습니까?",
      message: "삭제한 댓글은 복구할 수 없습니다.",
      onConfirm: () => {
        handleDeleteComment(postId, openModal.id);
        setPost(prev => ({ ...prev, commentCount: prev.commentCount - 1 }));
      }
    }
  : null;

  if (!post) return <div>Loading...</div>;

  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <PostSection
        post={post}
        onEdit={() => navigate(`/boards/main/posts/${post.id}/edit`)}
        onDelete={() => setOpenModal({ type: "post", id: post.id })}
      />

      <hr className="divider" />

      <CommentSection
        comments={comments}
        hasNext={hasNext}
        onSubmit={async (content) => {
          handleCreateComment(postId, content);
          setPost(prev => ({ ...prev, commentCount: prev.commentCount + 1 }));
        }}
        onDelete={(commentId) => setOpenModal({ type: "comment", id: commentId })}
        fetchMore={fetchMoreComments}
      />

      {modalConfig && (
        <Modal
          visible={true}
          title={modalConfig.title}
          cancelText="취소"
          confirmText="삭제"
          onCancel={() => setOpenModal(null)}
          onConfirm={() => {
            modalConfig.onConfirm();
            setOpenModal(null);
          }}
        >
          <p>{modalConfig.message}</p>
        </Modal>
      )}
    </main>
  );
}
