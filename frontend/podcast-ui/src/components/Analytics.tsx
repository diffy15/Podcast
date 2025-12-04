import { Headphones, Disc, TrendingUp } from "lucide-react";
import { Episode } from "@/lib/api";

interface AnalyticsProps {
  episodes: Episode[];
}

export function Analytics({ episodes }: AnalyticsProps) {
  const totalPlays = episodes.reduce((sum, ep) => sum + ep.play_count, 0);
  const totalEpisodes = episodes.length;
  const avgPlays = totalEpisodes > 0 ? Math.round(totalPlays / totalEpisodes) : 0;

  const stats = [
    {
      label: "Total Plays",
      value: totalPlays.toLocaleString(),
      icon: Headphones,
    },
    {
      label: "Episodes",
      value: totalEpisodes,
      icon: Disc,
    },
    {
      label: "Avg. Plays",
      value: avgPlays.toLocaleString(),
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card rounded-xl p-4 border border-border text-center"
        >
          <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
