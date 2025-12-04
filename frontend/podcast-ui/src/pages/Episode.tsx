import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchEpisode } from "@/lib/api";
import { usePlayer } from "@/context/PlayerContext";
import { Button } from "@/components/ui/button";
import { Play, Pause, ArrowLeft, Headphones, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function Episode() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentEpisode, isPlaying, playEpisode, togglePlay } = usePlayer();

  const { data: episode, isLoading, error } = useQuery({
    queryKey: ["episode", id],
    queryFn: () => fetchEpisode(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading episode...</div>
      </div>
    );
  }

  if (error || !episode) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-destructive">Episode not found</p>
        <Button variant="outline" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to episodes
        </Button>
      </div>
    );
  }

  const isCurrentEpisode = currentEpisode?.id === episode.id;

  const handlePlay = () => {
    if (isCurrentEpisode) {
      togglePlay();
    } else {
      playEpisode(episode);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          All Episodes
        </Button>

        {/* Episode Header */}
        <div className="bg-card rounded-2xl p-8 border border-border">
          {/* Play Button */}
          <div className="flex justify-center mb-8">
            <Button
              variant="player"
              size="lg"
              onClick={handlePlay}
              className="w-20 h-20 rounded-full glow-primary"
            >
              {isCurrentEpisode && isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8 ml-1" />
              )}
            </Button>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-foreground mb-4">
            {episode.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center justify-center gap-6 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Headphones className="h-5 w-5" />
              <span>{episode.play_count} plays</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{format(new Date(episode.created_at), "MMM d, yyyy")}</span>
            </div>
          </div>

          {/* Description */}
          {episode.description && (
            <div className="border-t border-border pt-6 mt-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">About this episode</h2>
              <p className="text-muted-foreground leading-relaxed">
                {episode.description}
              </p>
            </div>
          )}

          {/* Now Playing Indicator */}
          {isCurrentEpisode && isPlaying && (
            <div className="mt-6 pt-6 border-t border-border flex items-center justify-center gap-2 text-primary">
              <div className="flex gap-0.5 items-end h-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-primary rounded-full animate-waveform"
                    style={{ height: "100%", animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">Now Playing</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
