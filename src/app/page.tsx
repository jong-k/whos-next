import PostList from "@/components/PostList";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Who&apos;s Next - Like Demo
        </h1>
        <PostList />
      </div>
    </div>
  );
}
