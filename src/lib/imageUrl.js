import config from "@/config";

export function resolveImageUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${config.uploadsBaseUrl}${path}`;
}
