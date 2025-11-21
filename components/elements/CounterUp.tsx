"use client";

import { useEffect, useState, useRef } from 'react';
import Counter from './Counter';

interface CounterUpProps {
  end: number;
}

export default function CounterUp({ end }: CounterUpProps) {
    const [inViewport, setInViewport] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInViewport(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.5, // Adjust as needed
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return <span ref={ref} className="count-text">{inViewport && <Counter end={end} duration={20} />}</span>;
}