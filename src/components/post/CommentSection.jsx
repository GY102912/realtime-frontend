import CommentWrite from "./CommentWrite";
import CommentList from "./CommentList";

export default function CommentSection({
  comments,
  hasNext,
  onSubmit,
  onDelete,
  fetchMore,
}) {
  return (
    <>
      <CommentWrite onSubmit={onSubmit} />

      <CommentList
        comments={comments}
        hasNext={hasNext}
        fetchMore={fetchMore}
        onDelete={onDelete}
      />
    </>
  );
}
