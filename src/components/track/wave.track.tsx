"use client";

import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

const WaveTrack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      WaveSurfer.create({
        container: containerRef.current,
        waveColor: "rgb(200, 0, 200)",
        progressColor: "rgb(100, 0, 100)",
        url: "/tracks/hoidanit.m4a",
      });
    }
  }, []);
  return <div ref={containerRef}>WaveTrack</div>;
};
export default WaveTrack;
