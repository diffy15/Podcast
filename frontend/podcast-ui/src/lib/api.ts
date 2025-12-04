const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

export interface Episode {
  id: number;
  title: string;
  description: string;
  audio_url: string;
  play_count: number;
  created_at: string;
}

export async function fetchEpisodes(): Promise<Episode[]> {
  const response = await fetch(`${API_BASE}/api/episodes`);
  if (!response.ok) throw new Error("Failed to fetch episodes");
  return response.json();
}

export async function fetchEpisode(id: number): Promise<Episode> {
  const response = await fetch(`${API_BASE}/api/episodes/${id}`);
  if (!response.ok) throw new Error("Episode not found");
  return response.json();
}

export async function uploadEpisode(
  title: string,
  description: string,
  audioFile: File
): Promise<Episode> {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("audio", audioFile);

  const response = await fetch(`${API_BASE}/api/episodes`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to upload episode");
  return response.json();
}

export async function incrementPlayCount(id: number): Promise<void> {
  await fetch(`${API_BASE}/api/episodes/${id}/play`, { method: "POST" });
}

export function getAudioUrl(audioPath: string): string {
  if (audioPath.startsWith("http")) return audioPath;
  return `${API_BASE}${audioPath}`;
}
