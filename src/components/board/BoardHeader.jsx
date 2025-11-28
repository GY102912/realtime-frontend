import { useNavigate } from "react-router-dom";
import BoardGreeting from "./BoardGreeting.jsx"
import Button from "../common/Button.jsx";

export default function BoardHeader() {
  const navigate = useNavigate();

  return (
    <section className="relative text-center py-10 pb-16">
      <BoardGreeting/>

      <div className="absolute bottom-0 right-0">
        <Button 
            type="button" 
            variant="btn-primary" 
            className="w-full rounded-xl px-5 py-2 text-base" 
            onClick={() => navigate("/boards/main/posts")}
        >게시글 작성</Button>
      </div>
    </section>
  );
}