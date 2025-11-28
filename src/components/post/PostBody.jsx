export default function PostBody({
  content,
  postImageUrls = [],
  maxLines = null, // 목록에서 줄 제한하고 싶을 때 사용
  className = "",
}) {
  return (
    <section className="space-y-6 my-6">
      {postImageUrls.length > 0 && (
        <div className="space-y-4">
          {postImageUrls.map((url, idx) => (
            <img key={idx} className="w-full rounded-lg shadow-sm" src={url} alt={`post-${idx}`} />
          ))}
        </div>
      )}

      <p
        className="prose max-w-none"
        style={
          maxLines
            ? {
                display: "-webkit-box",
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }
            : {}
        }
      >
        {content}
      </p>
    </section>
  );
}
