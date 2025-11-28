export default function PostStats({ likeCount, viewCount, commentCount }) {
  return (
    <div className="stats shadow w-full my-6">
      <div className="stat">
        <div className="stat-title">좋아요수</div>
        <div className="stat-value text-primary">{likeCount}</div>
      </div>

      <div className="stat">
        <div className="stat-title">조회수</div>
        <div className="stat-value">{viewCount}</div>
      </div>

      <div className="stat">
        <div className="stat-title">댓글수</div>
        <div className="stat-value">{commentCount}</div>
      </div>
    </div>
  );
}
