import { useState } from "react";
import { createPost } from "../api/post";
import { uploadProfileImage } from "../api/user"
import PostForm from "../components/post/PostForm";
import { useNavigate } from "react-router-dom";

export default function PostCreatePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ title, content, images }) => {
    try {
      setLoading(true);

      const postImageUrls = [];
      for (const file of images) {
        const formData = new FormData();
        formData.append("image", file);

        const res = await uploadProfileImage(formData);
        const { imageUrl } = res.data;
        console.log("imageUrl: " + imageUrl);
        postImageUrls.push(imageUrl);
      }

      const res = await createPost(title, content, postImageUrls);
      const { id } = res.data;
      navigate(`/boards/main/posts/${id}`);

    } catch (err) {
      console.error(err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <section className="text-center mb-10">
        <h2 className="text-3xl font-bold">게시글 작성</h2>
      </section>

      <PostForm
        onSubmit={handleSubmit}
        submitText="완료"
        loading={loading}
      />
    </main>
  );
}
