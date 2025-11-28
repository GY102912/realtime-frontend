import { useEffect, useRef } from "react";

export default function CommentList({ comments, hasNext, fetchMore, onDelete }) {
  const loaderRef = useRef(null);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext) {
          fetchMore();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loaderRef.current, hasNext]);

  return (
    <section className="mt-6 space-y-6">
      {comments.map((c) => (
        <div
          key={c.id}
          className="flex gap-3 p-4 rounded-lg bg-base-200"
        >
          <div className="avatar">
            <div className="w-10 h-10 rounded-full">
              <img src={c.writerProfileImageUrl} alt="profile" />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="font-medium">{c.writerNickname}</span>
              <span className="text-sm text-gray-500">{c.createdAt}</span>
            </div>

            <p>{c.content}</p>

            {c.isWriter && (
              <button
                className="btn btn-xs btn-error mt-2 text-white"
                onClick={() => onDelete(c.id)}
              >
                삭제
              </button>
            )}
          </div>
        </div>
      ))}

      {hasNext && (
        <div ref={loaderRef} className="py-4 text-center text-gray-500">
          댓글 불러오는 중...
        </div>
      )}
    </section>
  );
}
