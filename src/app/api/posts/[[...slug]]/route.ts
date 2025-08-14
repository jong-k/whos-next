import { DUMMY_POSTS } from "@/constants/post";

const posts = [...DUMMY_POSTS];

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  const { slug } = await params;

  // /api/posts - 모든 posts 반환
  if (!slug || slug.length === 0) {
    return Response.json(posts);
  }

  // /api/posts/:id - 특정 post 반환
  if (slug.length === 1) {
    const id = parseInt(slug[0]);

    if (isNaN(id)) {
      return Response.json(
        { error: "Invalid Post ID format" },
        { status: 400 }
      );
    }

    const post = posts.find(p => p.id === id);

    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    return Response.json(post);
  }

  // 그 외 경로는 404
  return Response.json({ error: "Not found" }, { status: 404 });
}

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  const { slug } = await params;

  // /api/posts/:id - 특정 post의 좋아요 토글
  if (slug.length === 1) {
    const id = parseInt(slug[0]);

    if (isNaN(id)) {
      return Response.json(
        { error: "Invalid Post ID format" },
        { status: 400 }
      );
    }

    const post = posts.find(p => p.id === id);

    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    // 좋아요 상태 토글
    if (post.liked) {
      post.liked = false;
      post.likes -= 1;
    } else {
      post.liked = true;
      post.likes += 1;
    }

    return Response.json(post);
  }

  // 그 외 경로는 404
  return Response.json({ error: "Not found" }, { status: 404 });
}
