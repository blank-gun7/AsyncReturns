"use client";

import { useState, useEffect } from "react";

export function useMouseSpotlight(): { x: string; y: string } {
  const [mousePos, setMousePos] = useState({ x: "50vw", y: "50vh" });

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePos({ x: `${e.clientX}px`, y: `${e.clientY}px` });
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  return mousePos;
}
