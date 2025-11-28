import { useEffect, useRef } from "react";
import { usePostList } from "../../hooks/usePostList";
import PostCard from "../board/PostCard";

export default function PostList() {
  const { posts, loadPosts, more, loading } = usePostList();
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!more) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) loadPosts();
    });

    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [more]);
  
  return (
    <section className="flex flex-col gap-6">
        {posts.length === 0 ? (
          <p>아직 작성된 게시글이 없습니다.</p>
        ) : (
          posts.map(post => <PostCard key={post.id} post={post} />)
        )}

        <div ref={bottomRef} style={{ height: "1px" }} />

        {loading && <p>불러오는 중...</p>}
    </section>
  );
}
