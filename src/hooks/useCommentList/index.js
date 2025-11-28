import { useState } from "react";
import { getComments, createComment, deleteComment } from "../../api/comment";

export function useCommentList() {
    const [comments, setComments] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [hasNext, setHasNext] = useState(true);

    const handleCreateComment = async (postId, content) => {
        console.log(postId); console.log(content);
        const res = await createComment(postId, content);
        const newComment = res.data;

        setComments(prev => [newComment, ...prev]);
    }

    const handleDeleteComment = async (postId, commentId) => {
        await deleteComment(postId, commentId);
        setComments(prev => prev.filter(c => c.id !== commentId));
    }

    const fetchMoreComments = async () => {
        if (!hasNext) return;

        const res = await getComments(postId, cursor);
        const data = await res.json();

        setComments(prev => [...prev, ...data.items]);
        setCursor(data.nextCursor);
        setHasNext(data.hasNext);
    };

    return {
        comments, cursor, hasNext,
        setComments, setCursor, setHasNext,
        handleCreateComment,
        handleDeleteComment,
        fetchMoreComments,
    };
}