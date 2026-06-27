"use client";

import { useState, useEffect } from "react";

const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

const B2B_ADS = [
  { text: "Vercel — Ship. Optimize. Scale.", icon: "▲", color: "#fff" },
  {
    text: "Supabase — The open source Firebase alt",
    icon: "🟢",
    color: "#3ECF8E",
  },
  { text: "Postman — Test APIs faster with AI", icon: "🔷", color: "#FF6C37" },
  { text: "Stripe — Financial Infrastructure", icon: "🟣", color: "#635BFF" },
];

export function useAdCycle() {
  const [adVisible, setAdVisible] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [spinnerFrame, setSpinnerFrame] = useState(0);

  useEffect(() => {
    const adInterval = setInterval(() => {
      setAdVisible((prev) => {
        if (prev) {
          setCurrentAdIndex((idx) => (idx + 1) % B2B_ADS.length);
          return false;
        }
        return true;
      });
    }, 3500);

    const spinnerInterval = setInterval(() => {
      setSpinnerFrame((prev) => (prev + 1) % SPINNER_FRAMES.length);
    }, 80);

    return () => {
      clearInterval(adInterval);
      clearInterval(spinnerInterval);
    };
  }, []);

  return {
    adVisible,
    currentAd: B2B_ADS[currentAdIndex],
    spinnerFrame: SPINNER_FRAMES[spinnerFrame],
    SPINNER_FRAMES,
    B2B_ADS,
  };
}
