import { useEffect, useRef } from "react";
import { usePostList } from "../../hooks/usePostList";
import PostCard from "../board/PostCard";
import SplashScreen from "../common/SplashScreen";

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
        {loading ? (
          <SplashScreen />
        ) : (
          <>
            {posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center text-base-content/70">
                <div className="text-4xl mb-2">📝</div>
                <p className="font-medium">아직 게시글이 없어요</p>
                <p className="font-medium">첫 번째 게시글을 작성해보세요!</p>
              </div>
            ) : (
              posts.map(post => <PostCard key={post.id} post={post} />)
            )}

            <div ref={bottomRef} style={{ height: "1px" }} />
          </>
        )}
    </section>
  );
}
