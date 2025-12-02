import { Routes, Route } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import SplashScreen from "./components/common/SplashScreen";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage"
import BoardPage from "./pages/BoardPage"
import PostDetailPage from "./pages/PostDetailPage";
import PostCreatePage from "./pages/PostCreatePage";
import PostEditPage from "./pages/PostEditPage"

function App() {
  const { initialized } = useAuthContext();
  if (!initialized) return <SplashScreen />;

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/boards/main" element={<BoardPage />} />
      <Route path="/boards/main/posts" element={<PostCreatePage />} />
      <Route path="/boards/main/posts/:postId" element={<PostDetailPage />} />
      <Route path="/boards/main/posts/:postId/edit" element={<PostEditPage />} />
    </Routes>
  );
}

export default App;