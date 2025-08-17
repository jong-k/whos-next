import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "포스트 리스트",
  description: "포스트 업데이트 시 낙관적 업데이트 적용",
};

export default function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
