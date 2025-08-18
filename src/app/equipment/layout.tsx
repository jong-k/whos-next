import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "장비 리스트",
  description: "장비 업데이트 시 낙관적 업데이트 적용",
};

export default function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
