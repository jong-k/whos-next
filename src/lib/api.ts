import type { Post } from "@/types/post";

export async function togglePostLike(
  postId: number,
  currentLikedState: boolean
): Promise<Post> {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ like: !currentLikedState }),
  });

  if (!response.ok) {
    throw new Error("Failed to toggle like");
  }

  return response.json();
}

export async function getAllPosts(): Promise<Post[]> {
  const response = await fetch("/api/posts");

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

export async function getPost(id: number): Promise<Post> {
  const response = await fetch(`/api/posts/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }

  return response.json();
}
