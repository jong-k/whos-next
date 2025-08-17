import LikeButton from "./LikeButton";
import { getAllPosts } from "@/lib/api";

export default async function PostList() {
  try {
    const posts = await getAllPosts();

    return (
      <div className="mx-auto max-w-md space-y-4">
        <h2 className="mb-6 text-center text-2xl font-bold">Posts</h2>
        {posts.map(post => (
          <div
            key={post.id}
            className="rounded-lg border bg-white p-6 shadow-md"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Post #{post.id}</h3>
              <LikeButton post={post} />
            </div>
          </div>
        ))}
      </div>
    );
  } catch (err) {
    console.error(err);
    return (
      <div className="py-8 text-center text-red-600">Failed to fetch posts</div>
    );
  }
}
