import Link from "next/link";

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/equipment">장비 상태 변경 mutation 최적화</Link>
        <Link href="/optimistic-counter">낙관적 카운터 UI</Link>
      </li>
    </ul>
  );
}
