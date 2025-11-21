"use client";

import React, { useEffect, useState } from "react";

interface ProgressBarProps {
  percentage?: number;
  duration?: number;
}

const ProgressBar = ({ percentage = 88, duration = 2600 }: ProgressBarProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = percentage / (duration / 20);
    const interval = setInterval(() => {
      start += increment;
      if (start >= percentage) {
        start = percentage;
        clearInterval(interval);
      }
      setCount(Math.floor(start));
    }, 20);

    return () => clearInterval(interval);
  }, [percentage, duration]);

  return (
    <div className="progress" style={{ background: "#eee", borderRadius: "8px", width: "100%" }}>
      <div
        className="progress-bar"
        style={{
          width: `${count}%`,
          background: "#0C6460",
          height: "100%",
          transition: `width ${duration}ms ease-in-out`,
          opacity: 1,
          position: "relative",
        }}
      >
        <div
          className="progress-value"
          style={{
            position: "absolute",
            right: "10px",
            top: "-25px",
            transform: "translateY(-50%)",
          }}
        >
          <span className="counter-number2">{count}</span>%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
