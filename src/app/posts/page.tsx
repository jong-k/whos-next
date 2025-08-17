import PostListWithSuspense from "@/components/PostListWithSuspense";

export default function PostsPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-8 text-center text-2xl">낙관적 업데이트</h2>
      <PostListWithSuspense />
    </div>
  );
}
