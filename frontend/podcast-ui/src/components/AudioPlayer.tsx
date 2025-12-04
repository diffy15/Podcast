import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/context/PlayerContext";
import { useState } from "react";

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function AudioPlayer() {
  const { currentEpisode, isPlaying, currentTime, duration, volume, togglePlay, seek, setVolume } = usePlayer();
  const [showVolume, setShowVolume] = useState(false);

  if (!currentEpisode) return null;

  const progress = duration ? (currentTime / duration) * 100 : 0;

  const skipBack = () => seek(Math.max(0, currentTime - 15));
  const skipForward = () => seek(Math.min(duration, currentTime + 30));

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border z-50 animate-slide-up">
      <div className="container max-w-5xl mx-auto px-4 py-3">
        {/* Progress Bar */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs text-muted-foreground w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <div className="flex-1 relative h-1 bg-progress-bg rounded-full overflow-hidden cursor-pointer group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const percent = (e.clientX - rect.left) / rect.width;
              seek(percent * duration);
            }}
          >
            <div
              className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity glow-primary"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>
          <span className="text-xs text-muted-foreground w-10">
            {formatTime(duration)}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          {/* Episode Info */}
          <div className="flex-1 min-w-0 pr-4">
            <p className="font-medium truncate text-foreground">{currentEpisode.title}</p>
            <p className="text-sm text-muted-foreground truncate">{currentEpisode.description}</p>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="playerSecondary"
              size="playerSm"
              onClick={skipBack}
              title="Back 15 seconds"
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              variant="player"
              size="playerLg"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-1" />
              )}
            </Button>
            <Button
              variant="playerSecondary"
              size="playerSm"
              onClick={skipForward}
              title="Forward 30 seconds"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex-1 flex justify-end items-center gap-2">
            <div
              className="relative"
              onMouseEnter={() => setShowVolume(true)}
              onMouseLeave={() => setShowVolume(false)}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setVolume(volume === 0 ? 0.8 : 0)}
              >
                {volume === 0 ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              {showVolume && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 bg-card rounded-lg shadow-lg border border-border">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20 h-1 cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, hsl(var(--primary)) ${volume * 100}%, hsl(var(--progress-bg)) ${volume * 100}%)`,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
