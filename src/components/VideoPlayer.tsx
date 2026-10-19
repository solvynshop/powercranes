import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';

type VideoPlayerProps = {
  src?: string;
  poster?: string;
  className?: string;
};

const formatTime = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${sec}`;
};

export default function VideoPlayer({ src, poster, className = '' }: VideoPlayerProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimer = useRef<number | undefined>(undefined);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [isFull, setIsFull] = useState(false);
  const [awake, setAwake] = useState(true);

  const disabled = !src;
  const progress = duration > 0 ? (current / duration) * 100 : 0;
  const bufferedPct = duration > 0 ? (buffered / duration) * 100 : 0;
  const showUI = awake || !playing;

  // Show controls, then hide them after a moment while the video is playing
  const wake = () => {
    setAwake(true);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setAwake(false);
    }, 2500);
  };

  useEffect(() => {
    const onChange = () => setIsFull(document.fullscreenElement === wrapRef.current);
    document.addEventListener('fullscreenchange', onChange);
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
      window.clearTimeout(hideTimer.current);
    };
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v || disabled) return;
    if (v.paused) {
      v.play().catch(() => undefined);
    } else {
      v.pause();
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const toggleFullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => undefined);
    } else {
      el.requestFullscreen().catch(() => undefined);
    }
  };

  const seek = (e: React.PointerEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    v.currentTime = ratio * duration;
    setCurrent(v.currentTime);
  };

  const iconBtn =
    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent';

  return (
    <div
      ref={wrapRef}
      onMouseMove={wake}
      onTouchStart={wake}
      className={`group relative aspect-video max-h-[70vh] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#10151d] to-[#070a0f] ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        onClick={toggle}
        onPlay={() => {
          setPlaying(true);
          wake();
        }}
        onPause={() => {
          setPlaying(false);
          setAwake(true);
        }}
        onEnded={() => setPlaying(false)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onProgress={(e) => {
          const v = e.currentTarget;
          setBuffered(v.buffered.length ? v.buffered.end(v.buffered.length - 1) : 0);
        }}
        className="h-full w-full cursor-pointer object-cover"
      />

      {/* Soft gradient so the controls stay readable */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Big centre play button while paused */}
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-label="Play video"
        className={`absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-2xl backdrop-blur-xl transition duration-300 hover:scale-105 hover:bg-white/20 ${
          playing ? 'pointer-events-none scale-90 opacity-0' : 'opacity-100'
        }`}
      >
        <Play className="ml-1 h-8 w-8" fill="currentColor" />
      </button>

      {/* Floating glass control pill */}
      <div
        className={`absolute inset-x-4 bottom-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-2 py-1.5 backdrop-blur-xl transition duration-300 sm:inset-x-6 sm:bottom-6 ${
          showUI ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={toggle}
          disabled={disabled}
          aria-label={playing ? 'Pause' : 'Play'}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400 disabled:opacity-60 disabled:hover:bg-blue-500"
        >
          {playing ? (
            <Pause className="h-4 w-4" fill="currentColor" />
          ) : (
            <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
          )}
        </button>

        <span className="w-10 shrink-0 text-center text-xs tabular-nums text-white/70">
          {formatTime(current)}
        </span>

        {/* Timeline */}
        <div
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(current)}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            seek(e);
          }}
          onPointerMove={(e) => {
            if (e.buttons === 1) seek(e);
          }}
          className="group/bar relative flex h-6 flex-1 cursor-pointer items-center"
        >
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/15 transition-all group-hover/bar:h-1.5">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-white/20"
              style={{ width: `${bufferedPct}%` }}
            />
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 to-amber-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div
            className="pointer-events-none absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow transition group-hover/bar:opacity-100"
            style={{ left: `${progress}%` }}
          />
        </div>

        <span className="hidden w-10 shrink-0 text-center text-xs tabular-nums text-white/50 sm:block">
          {formatTime(duration)}
        </span>

        <button
          type="button"
          onClick={toggleMute}
          disabled={disabled}
          aria-label={muted ? 'Unmute' : 'Mute'}
          className={iconBtn}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>

        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label="Fullscreen"
          className={iconBtn}
        >
          {isFull ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
