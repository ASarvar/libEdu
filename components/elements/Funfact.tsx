"use client";
import React, { useEffect, useState } from "react";

interface CounterUpProps {
  count: number;
  time?: number;
}

const CounterUp: React.FC<CounterUpProps> = ({ count, time = 1 }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = count;
    const duration = time * 1000;
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setCurrent(start);
      if (start === end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [count, time]);

  return <>{current}</>;
};

export default CounterUp;
