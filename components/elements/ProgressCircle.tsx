"use client";

import React, { useEffect, useState, useRef } from "react";

interface ProgressCircleProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  fgColor?: string;
  bgColor?: string;
  duration?: number;
}

const ProgressCircle = ({
  value,
  size = 120,
  strokeWidth = 10,
  fgColor = "#C8F169",
  bgColor = "#fff",
  duration = 2000
}: ProgressCircleProps) => {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  // Observe visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Animate when in view
  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, [inView, value, duration]);

  // Circle math
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (count / 100) * circumference;

  return (
    <div
      ref={ref}
      className="pie-graph"
      style={{ width: size, height: size, position: "relative" }}
    >
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={fgColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.3s ease" }}
        />
      </svg>
      <div
        className="inner-text"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontWeight: "bold",
          fontSize: "18px",
          color: "#333"
        }}
      >
        {count}%
      </div>
    </div>
  );
};

export default ProgressCircle;
