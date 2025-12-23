const YOUTUBE_REGEXES = [
  /youtu\.be\/([a-zA-Z0-9_-]{6,})/,
  /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{6,})/,
  /youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/,
  /youtube\.com\/shorts\/([a-zA-Z0-9_-]{6,})/,
  /^([a-zA-Z0-9_-]{6,})$/,
];

export function extractYouTubeId(raw?: string | null): string | null {
  if (!raw) return null;

  const candidate = raw.trim();

  for (const regex of YOUTUBE_REGEXES) {
    const match = candidate.match(regex);
    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
}
