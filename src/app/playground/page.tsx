"use client";
import { useOptimistic, useState, startTransition } from "react";
import { Button } from "@/components/ui/button";

export default function PlayGroundPage() {
  const [count, setCount] = useState(0);
  const [optimisticCount, addOptimisticCount] = useOptimistic(
    count,
    (state, increment: number) => {
      return state + increment;
    }
  );

  const handleClick = () => {
    startTransition(async () => {
      addOptimisticCount(1);
      try {
        await new Promise<void>(res => setTimeout(() => res(), 1500));
        const isSuccess = Math.round(Math.random()) === 0;
        if (!isSuccess) {
          throw new Error("increment failed!");
        } else {
          console.log("increment success!");
        }
        setCount(prev => prev + 1);
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl">Hello from Playground</h2>
      <div className="space-x-2">
        <span>count: {count}</span>
        <span>optimisticCount: {optimisticCount}</span>
        <Button onClick={handleClick}>click me</Button>
      </div>
    </div>
  );
}
