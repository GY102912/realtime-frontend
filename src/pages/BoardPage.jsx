import BoardHeader from "../components/board/BoardHeader";
import PostList from "../components/board/PostList";

export default function BoardPage() {
  return (
    <main className="max-w-[760px] mx-auto w-full px-5 py-16 flex flex-col gap-10">
      <BoardHeader />
      <PostList />
    </main>
  );
}
