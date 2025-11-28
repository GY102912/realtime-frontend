import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPostDetail, deletePost } from "../../api/post";

export function usePostDetail() {
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    const handleCreatePost = async () => {}

    const handleDeletePost = async (postId) => {
        await deletePost(postId);
        navigate("/boards/main");
    }

    return {
        post, 
        setPost, 
        handleCreatePost,
        handleDeletePost,
    };
}