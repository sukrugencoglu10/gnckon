"use client";

import { useState, useEffect, useRef } from "react";

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            // easeOutExpo function for smooth ending
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            setCount(Math.floor(easeProgress * end));
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return { count, ref };
}

interface StatProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

function StatCard({ end, suffix = "", prefix = "", label }: StatProps) {
  const { count, ref } = useCountUp(end, 2000);

  return (
    <div ref={ref} className="card p-4 text-center flex flex-col items-center justify-center">
      <div className="text-3xl font-black tracking-tight text-brand-600">
        {prefix}{count.toLocaleString("tr-TR")}{suffix}
      </div>
      <div className="mt-1 text-[11px] font-bold uppercase tracking-wider text-ink-500">
        {label}
      </div>
    </div>
  );
}

export function AnimatedStats({ experienceYears }: { experienceYears: number }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
      <StatCard end={experienceYears} suffix="+" label="Yıllık Tecrübe" />
      <StatCard end={100} prefix="%" label="Müşteri Memnuniyeti" />
      <div className="col-span-2 sm:col-span-1">
        <StatCard end={5000} suffix="+" label="Teslimat" />
      </div>
    </div>
  );
}
