import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostDetail, updatePost } from "../api/post";
import { uploadProfileImage } from "../api/user"
import PostForm from "../components/post/PostForm";

export default function PostEditPage() {
    const { postId } = useParams();

    const navigate = useNavigate();
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchPost() {
            const res = await getPostDetail(postId);
            setPost(res.data);
        };
        fetchPost();
    }, []);

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

            await updatePost(postId, title, content, postImageUrls);
            navigate(`/boards/main/posts/${postId}`);

        } catch (err) {
            console.error(err);

        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="max-w-3xl mx-auto py-8 px-4">
            <section className="text-center mb-10">
            <h2 className="text-3xl font-bold">게시글 수정</h2>
            </section>

            {post && (
                <PostForm
                    onSubmit={handleSubmit}
                    submitText="완료"
                    loading={loading}
                    initialVal={post}
                />
            )}
        </main>
    );
}