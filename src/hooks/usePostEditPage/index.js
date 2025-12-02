import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPostDetail, updatePost } from "../../api/post";
import { uploadProfileImage } from "../../api/user";

export function usePostEditPage(postId) {
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      const res = await getPostDetail(postId);
      setPost(res.data);
    }
    fetchPost();
  }, [postId]);

  const submitEdit = async ({ title, content, images }) => {
    try {
      setLoading(true);

      // 이미지 업로드
      const postImageUrls = [];
      for (const file of images) {
        const formData = new FormData();
        formData.append("image", file);

        const res = await uploadProfileImage(formData);
        postImageUrls.push(res.data.imageUrl);
      }

      // 게시글 수정 요청
      await updatePost(postId, title, content, postImageUrls);

      // 상세 페이지로 이동
      navigate(`/boards/main/posts/${postId}`);

    } catch (e) {
      console.error(e);
      
    } finally {
      setLoading(false);
    }
  };

  return {
    post,
    loading,
    submitEdit,
  };
}
