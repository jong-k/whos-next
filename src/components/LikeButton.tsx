"use client";

import { useOptimistic, useTransition } from "react";
import LikeIcon from "./LikeIcon";
import type { Post } from "@/types/equipment";
import { togglePostLikeAction } from "@/lib/actions";

interface LikeButtonProps {
  post: Post;
}

export default function LikeButton({ post }: LikeButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticPost, addOptimisticLike] = useOptimistic(
    post,
    (currentPost, newLikedState: boolean) => ({
      ...currentPost,
      liked: newLikedState,
      likes: newLikedState ? currentPost.likes + 1 : currentPost.likes - 1,
    })
  );

  const handleClick = () => {
    const originalLiked = optimisticPost.liked;
    startTransition(async () => {
      addOptimisticLike(!originalLiked);
      const result = await togglePostLikeAction(post.id, originalLiked);
      if (!result.success) {
        // 에러 발생 시 원래 상태로 롤백
        addOptimisticLike(originalLiked);
        console.error("Failed to toggle like:", result.error);
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
        optimisticPost.liked
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
      } ${isPending ? "cursor-not-allowed opacity-50" : "hover:shadow-sm active:scale-95"} `}
    >
      <LikeIcon liked={optimisticPost.liked} />
      <span>{optimisticPost.liked ? "Like" : "Like"}</span>
      <span className="text-xs opacity-75">({optimisticPost.likes})</span>
    </button>
  );
}
