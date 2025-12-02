import { useParams } from "react-router-dom";
import { usePostEditPage } from "../hooks/usePostEditPage";
import PostForm from "../components/post/PostForm";

export default function PostEditPage() {
    const { postId } = useParams();
    const { post, loading, submitEdit } = usePostEditPage(postId);

    return (
        <main className="max-w-3xl mx-auto py-8 px-4">
            <section className="text-center mb-10">
            <h2 className="text-3xl font-bold">게시글 수정</h2>
            </section>

            {post && (
                <PostForm
                    onSubmit={submitEdit}
                    submitText="완료"
                    loading={loading}
                    initialVal={post}
                />
            )}
        </main>
    );
}