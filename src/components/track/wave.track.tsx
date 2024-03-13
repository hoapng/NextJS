"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import WaveSurfer from "wavesurfer.js";
import { useSearchParams } from "next/navigation";
import { useWavesurfer } from "@/utils/customHook";

const WaveTrack = () => {
  const searchParams = useSearchParams();
  const fileName = searchParams.get("audio");
  const containerRef = useRef<HTMLDivElement>(null);

  const optionsMemo = useMemo(() => {
    return {
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
      url: `/api?audio=${fileName}`,
    };
  }, []);

  const wavesurfer = useWavesurfer(containerRef, optionsMemo);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (!wavesurfer) return;
    setIsPlaying(false);

    const subscriptions = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);

  const onPlayClick = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
    }
  }, [wavesurfer]);

  return (
    <>
      <div ref={containerRef}>wave track</div>
      <button onClick={() => onPlayClick()}>
        {isPlaying === true ? "Pause" : "Play"}
      </button>
    </>
  );
};

export default WaveTrack;
