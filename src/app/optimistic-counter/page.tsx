"use client";
import { useOptimistic, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";

export default function OptimisticCounterPage() {
  const [count, setCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startUiTransition] = useTransition();
  const [optimisticCount, addOptimisticCount] = useOptimistic<number, number>(
    count,
    (state, increment) => {
      return state + increment;
    }
  );

  const handleClick = () => {
    startUiTransition(async () => {
      setError(null);
      addOptimisticCount(1); // 낙관적 업데이트

      try {
        await new Promise<void>(res => setTimeout(() => res(), 1500));
        const isSuccess = Math.round(Math.random()) === 0;
        if (!isSuccess) throw new Error("increment failed!");
        setCount(prev => prev + 1);
      } catch (err) {
        setError((err as Error).message);
        // 실패 시 optimisticCount가 count로 자동 롤백
      }
    });
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl">낙관적 카운터 UI</h2>
      <div className="flex items-center gap-4">
        <span>count: {count}</span>
        <span>optimisticCount: {optimisticCount}</span>
        <Button onClick={handleClick} disabled={isPending}>
          {isPending ? "Updating..." : "click me"}
        </Button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
