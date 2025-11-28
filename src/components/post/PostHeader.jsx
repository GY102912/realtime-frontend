import Button from "../common/Button";

export default function PostHeader({
  title,
  writerNickname,
  writerProfileImageUrl,
  createdAt,
  isWriter = false,
  onEdit,
  onDelete,
  actions, // custom actions
  className = "",
}) {
  return (
    <section className="flex justify-between items-start mb-6">
      <div className="space-y-2">
        {title && <h2 className="text-3xl font-bold">{title}</h2>}

        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full">
                {writerProfileImageUrl && (
                    <img src={writerProfileImageUrl} alt="profile" />
                )}
            </div>
          </div>
          <span className="font-semibold">{writerNickname}</span>
            <span className="text-sm text-gray-500">{createdAt}</span>
        </div>
      </div>

      <div className="post-header-right">
        {actions}

        {isWriter && onEdit && (
          <Button variant="secondary" onClick={onEdit}>
            수정
          </Button>
        )}

        {isWriter && onDelete && (
          <Button variant="delete" onClick={onDelete}>
            삭제
          </Button>
        )}
      </div>
    </section>
  );
}
