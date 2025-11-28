import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostStats from "./PostStats";

export default function PostSection({ post, onEdit, onDelete }) {
  return (
    <>
      <PostHeader
        title={post.title}
        writerNickname={post.writerNickname}
        writerProfileImageUrl={post.writerProfileImageUrl}
        createdAt={post.createdAt}
        isWriter={post.isWriter}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <hr className="divider" />

      <PostBody 
        content={post.content}
        postImageUrls={post.postImageUrls}
      />

      <PostStats
        likeCount={post.likeCount}
        viewCount={post.viewCount}
        commentCount={post.commentCount}
      />
    </>
  );
}
