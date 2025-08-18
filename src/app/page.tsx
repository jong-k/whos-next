import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function Home() {
  return (
    <ul className="flex flex-col gap-2">
      <li>
        <Link href={ROUTES.equipment}>장비 상태 변경 mutation 최적화</Link>
      </li>
      <li>
        <Link href={ROUTES.optimisticCounter}>낙관적 카운터 UI</Link>
      </li>
    </ul>
  );
}
