import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Radio, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EpisodeCard } from "@/components/EpisodeCard";
import { UploadForm } from "@/components/UploadForm";
import { WaveformBars } from "@/components/WaveformBars";
import { Analytics } from "@/components/Analytics";
import { fetchEpisodes } from "@/lib/api";

function PodcastApp() {
  const [showUpload, setShowUpload] = useState(false);

  const { data: episodes, isLoading, refetch } = useQuery({
    queryKey: ["episodes"],
    queryFn: fetchEpisodes,
  });

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 gradient-primary rounded-xl">
              <Radio className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">PodcastHub</span>
          </div>
          <Button onClick={() => setShowUpload(true)}>
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Episode</span>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container max-w-5xl mx-auto px-4 py-12 text-center">
        <WaveformBars className="mb-6 opacity-50" />
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Your <span className="text-gradient">Podcast</span> Library
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Upload, manage, and listen to your podcast episodes in one place.
        </p>
      </section>

      {/* Analytics */}
      <main className="container max-w-5xl mx-auto px-4">
        <Analytics episodes={episodes || []} />

        {/* Episode List */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">All Episodes</h2>
          <span className="text-sm text-muted-foreground">
            {episodes?.length || 0} episodes
          </span>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : episodes && episodes.length > 0 ? (
          <div className="space-y-2">
            {episodes.map((episode, index) => (
              <EpisodeCard key={episode.id} episode={episode} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex p-4 bg-secondary rounded-full mb-4">
              <Radio className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No episodes yet</h3>
            <p className="text-muted-foreground mb-6">
              Upload your first episode to get started
            </p>
            <Button onClick={() => setShowUpload(true)}>
              <Plus className="h-4 w-4" />
              Upload Episode
            </Button>
          </div>
        )}
      </main>

      {/* Upload Modal */}
      {showUpload && (
        <UploadForm
          onSuccess={() => refetch()}
          onClose={() => setShowUpload(false)}
        />
      )}
    </div>
  );
}

export default function Index() {
  return <PodcastApp />;
}
