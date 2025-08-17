import { Suspense } from "react";
import PostList from "./PostList";
import LoadingSpinner from "./LoadingSpinner";

export default function PostListWithSuspense() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PostList />
    </Suspense>
  );
}
