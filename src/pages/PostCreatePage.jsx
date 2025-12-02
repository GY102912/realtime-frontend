import { useCreatePost } from "../hooks/usePostCreatePage";
import PostForm from "../components/post/PostForm";

export default function PostCreatePage() {
  const { publishPost, loading } = useCreatePost();

  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <section className="text-center mb-10">
        <h2 className="text-3xl font-bold">게시글 작성</h2>
      </section>

      <PostForm
        onSubmit={publishPost}
        submitText="완료"
        loading={loading}
      />
    </main>
  );
}
