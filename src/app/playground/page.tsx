"use client";
import { useOptimistic, useState, startTransition } from "react";

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
        await new Promise<void>(res => setTimeout(() => res(), 2000));
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
      <h2>Hello from Playground</h2>
      <div className="flex gap-2">
        <span>clicked: {optimisticCount}</span>
        <button onClick={handleClick}>click me</button>
      </div>
    </div>
  );
}
