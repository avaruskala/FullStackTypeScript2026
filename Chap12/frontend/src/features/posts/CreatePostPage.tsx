import { useActionState } from "react";
import { useNavigate } from "react-router";
import { postsApi } from "../../api/endpoints";
import { useAppSelector } from "../../store/StoreHooks";


export function CreatePostPage() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const [error, submitAction, isPending] = useActionState(
    async (_prev: string | null, formData: FormData) => {
      const title = formData.get("title") as string;
      const content = formData.get("content") as string;

      try {
        await postsApi.create({ title, content, authorId: user.id });
        navigate("/");
        return null;
      } catch (error) {
        return error instanceof Error ? error.message : "Failed to create post";
      }
    }, null);

  return (
    <form action={submitAction}>
      <h1>Create Post</h1>
      {error && <p className="error">{error}</p>}
      <input name="title" placeholder="Title" required />
      <textarea name="content" rows={10} required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create Post"}
      </button>
    </form>
  )
}
