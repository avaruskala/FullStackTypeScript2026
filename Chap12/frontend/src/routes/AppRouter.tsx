import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "../components/Layout";
import { LoginPage } from "../features/auth/LoginPage";
import { RegisterPage } from "../features/auth/RegisterPage";
import { CreatePostPage } from "../features/posts/CreatePostPage";
import { AdminRoute } from "./AdminRoute";
import { ProtectedRoute } from "./ProtectedRoute";
import { PostsPage } from "../features/posts/PostsPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<PostsPage />} />
            <Route path="/posts/:id" element={<div>coming soon</div>} />
            <Route path="/posts/new" element={<CreatePostPage />} />
            <Route path="/profile" element={<div>coming soon</div>} />
          </Route>

          {/* Admin routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<div>coming soon</div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )

}
