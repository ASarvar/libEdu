"use client";

import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  title: string;
  targetPercentage: number;
}

const ProgressBar = ({ title, targetPercentage }: ProgressBarProps) => {
    const [percentage, setPercentage] = useState(0);
    const animationDuration = 3000;

    useEffect(() => {
        const increment = targetPercentage / (animationDuration / 10);
        let currentPercentage = 0;

        const interval = setInterval(() => {
            currentPercentage += increment;
            if (currentPercentage >= targetPercentage) {
                currentPercentage = targetPercentage;
                clearInterval(interval);
            }
            setPercentage(Math.floor(currentPercentage));
        }, 10);

        return () => clearInterval(interval);
    }, [targetPercentage, animationDuration]);

    return (
        <div className="progress-single">
          <h5 className="progress-title">{title}</h5>
          <div className="bar">
            <div className="bar-inner count-bar" style={{ width: `${percentage}%` }}>
              <div className="count-text">{percentage}%</div>
            </div>
          </div>
        </div>
    );
};

export default ProgressBar;
