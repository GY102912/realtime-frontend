import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../api/post";
import { uploadProfileImage } from "../../api/user"

export function useCreatePost() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const publishPost = async ({ title, content, images }) => {
    try {
      setLoading(true);

      const postImageUrls = [];
      for (const file of images) {
        const formData = new FormData();
        formData.append("image", file);

        const res = await uploadProfileImage(formData);
        postImageUrls.push(res.data.imageUrl);
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

  return { publishPost, loading };
}
