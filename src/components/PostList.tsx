"use client";

import { useState, useEffect } from "react";
import LikeButton from "./LikeButton";
import type { Post } from "@/types/post";
import { getAllPosts, togglePostLike } from "@/lib/api";

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (err) {
        setError("Failed to fetch posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleToggleLike = async (postId: number) => {
    try {
      const currentPost = posts.find(post => post.id === postId);
      if (!currentPost) return;

      const updatedPost = await togglePostLike(postId, currentPost.liked);
      setPosts(prevPosts =>
        prevPosts.map(post => (post.id === postId ? updatedPost : post))
      );
    } catch (err) {
      console.error("Failed to toggle like:", err);
      setError("Failed to update like");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="py-8 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h2 className="mb-6 text-center text-2xl font-bold">Posts</h2>
      {posts.map(post => (
        <div key={post.id} className="rounded-lg border bg-white p-6 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Post #{post.id}</h3>
            <LikeButton post={post} onToggleLike={handleToggleLike} />
          </div>
        </div>
      ))}
    </div>
  );
}
