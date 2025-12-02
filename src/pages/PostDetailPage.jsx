import { useParams } from "react-router-dom";
import { usePostDetailPage } from "../hooks/usePostDetailPage";
import PostSection from "../components/post/PostSection";
import CommentSection from "../components/post/CommentSection";
import Modal from "../components/common/Modal";
import SplashScreen from "../components/common/SplashScreen"

export default function PostDetailPage() {
  const { postId } = useParams();

  const {
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
  } = usePostDetailPage(postId);

  const modalConfig = openModal?.type === "post"
  ? {
      title: "게시글을 삭제하시겠습니까?",
      message: "삭제한 게시글은 복구할 수 없습니다.",
    }
  : openModal?.type === "comment"
  ? {
      title: "댓글을 삭제하시겠습니까?",
      message: "삭제한 댓글은 복구할 수 없습니다.",
    }
  : null;

  if (!post) return <SplashScreen />;

  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <PostSection
        post={post}
        onEdit={handleEdit}
        onDelete={openDeletePostModal}
      />

      <hr className="divider" />

      <CommentSection
        comments={comments}
        hasNext={hasNext}
        onSubmit={submitComment}
        onDelete={openDeleteCommentModal}
        fetchMore={fetchMoreComments}
      />

      {modalConfig && (
        <Modal
          visible={true}
          title={modalConfig.title}
          cancelText="취소"
          confirmText="삭제"
          onCancel={() => setOpenModal(null)}
          onConfirm={async () => {
            await executeModalAction();
            setOpenModal(null);
          }}
        >
          <p>{modalConfig.message}</p>
        </Modal>
      )}
    </main>
  );
}
