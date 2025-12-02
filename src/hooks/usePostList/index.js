import { useEffect, useState } from "react";
import { usePostApi } from "../../api/usePostApi";

export function usePostList() {
    const [posts, setPosts] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [more, setMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const { getPosts } = usePostApi();

    const loadPosts = async () => {
        if (!more || loading) return;
        else setLoading(true);
        
        const res = await getPosts(cursor);
        const { items, nextCursor, hasNext } = res.data;

        setPosts(items);
        setCursor(nextCursor);
        setMore(hasNext);

        setLoading(false);
    };

    useEffect(() => {
        loadPosts();
    }, []);

    return { posts, loadPosts, more, loading };
}