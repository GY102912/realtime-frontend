import { useNavigate } from "react-router-dom";
export default function PostCard({ post }) {
    const { 
        title, updatedAt, 
        writerNickname, writerProfileImageUrl, 
        likeCount, commentCount, viewCount, 
    } = post;

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/boards/main/posts/${post.id}`);
    };

    return (
        <article className="card bg-base-100 shadow-md hover:shadow-lg transition cursor-pointer rounded-xl p-6" onClick={handleClick}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-2xl font-semi-bold leading-snug">{title}</h3>
                    <div className="text-sm text-gray-500 mt-1 flex gap-3">
                        <span>좋아요 {likeCount}</span>
                        <span>댓글 {commentCount}</span>
                        <span>조회수 {viewCount}</span>
                    </div>
                </div>
                <span className="text-sm text-gray-400 mt-1">{updatedAt}</span>
            </div>

            <div className="divider my-4"></div>

            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-300">
                    {writerProfileImageUrl && (
                        <img src={writerProfileImageUrl} alt="profile" className="w-full h-full object-cover"/>
                    )}
                </div>
                <span className="text-base font-medium">{writerNickname}</span>
            </div>
        </article>
    );
}