"use client";

import React, { useEffect, useRef, useState } from "react";

interface ProgressState {
  value: number;
  degree: number;
}

const CircularProgressBars = () => {
  const [progress5, setProgress5] = useState<ProgressState>({ value: 0, degree: 0 });
  const [progress6, setProgress6] = useState<ProgressState>({ value: 0, degree: 0 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const animateProgress = (
      endValue: number,
      setter: React.Dispatch<React.SetStateAction<ProgressState>>
    ) => {
      let startValue = 0;
      const speed = 20;

      const progress = setInterval(() => {
        startValue++;
        setter({ value: startValue, degree: startValue * 3.6 });

        if (startValue >= endValue) clearInterval(progress);
      }, speed);
    };

    animateProgress(90, setProgress5);
    animateProgress(75, setProgress6);
  }, []);

  return (
    <div className="choose-us-progressbar">
      <div className="progress-container">
        <div
          className="circular-progress"
          style={{
            background: `conic-gradient(
              #4d5bf9 ${progress5.degree}deg,
              #cadcff ${progress5.degree}deg
            )`,
          }}
        >
          <span className="progress-value">{progress5.value}%</span>
        </div>
        <div className="text">Success Rate</div>
      </div>
      <div className="progress-container">
        <div
          className="circular-progress"
          style={{
            background: `conic-gradient(
              #4d5bf9 ${progress6.degree}deg,
              #cadcff ${progress6.degree}deg
            )`,
          }}
        >
          <span className="progress-value">{progress6.value}%</span>
        </div>
        <div className="text">Business Growth</div>
      </div>
    </div>
  );
};

export default CircularProgressBars;
