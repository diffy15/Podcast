import { Play, Pause, Headphones } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Episode } from "@/lib/api";
import { usePlayer } from "@/context/PlayerContext";
import { formatDistanceToNow } from "date-fns";

interface EpisodeCardProps {
  episode: Episode;
  index: number;
}

export function EpisodeCard({ episode, index }: EpisodeCardProps) {
  const navigate = useNavigate();
  const { currentEpisode, isPlaying, playEpisode, togglePlay } = usePlayer();
  const isCurrentEpisode = currentEpisode?.id === episode.id;

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentEpisode) {
      togglePlay();
    } else {
      playEpisode(episode);
    }
  };

  const handleCardClick = () => {
    navigate(`/episode/${episode.id}`);
  };

  return (
    <div
      className="group relative flex items-center gap-4 p-4 rounded-xl bg-card hover:bg-surface-elevated transition-all duration-300 animate-fade-in cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={handleCardClick}
    >
      {/* Episode Number / Play Button */}
      <div className="relative flex-shrink-0">
        <span className="group-hover:opacity-0 text-2xl font-bold text-muted-foreground w-10 flex justify-center transition-opacity">
          {String(index + 1).padStart(2, "0")}
        </span>
        <Button
          variant="player"
          size="icon"
          onClick={handlePlay}
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {isCurrentEpisode && isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" />
          )}
        </Button>
      </div>

      {/* Episode Info */}
      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold truncate transition-colors ${isCurrentEpisode ? "text-primary" : "text-foreground"}`}>
          {episode.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
          {episode.description || "No description"}
        </p>
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <Headphones className="h-4 w-4" />
          <span>{episode.play_count}</span>
        </div>
        <span className="hidden sm:block">
          {formatDistanceToNow(new Date(episode.created_at), { addSuffix: true })}
        </span>
      </div>

      {/* Playing Indicator */}
      {isCurrentEpisode && isPlaying && (
        <div className="flex gap-0.5 items-end h-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-primary rounded-full animate-waveform"
              style={{
                height: "100%",
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
