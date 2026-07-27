import { newsTickerApi } from "@/lib/api/newsTicker";
import NewsTickerMarquee from "./NewsTickerMarquee";

export default async function NewsTickerSection() {
  const res = await newsTickerApi.list().catch(() => null);
  const items = res?.data || [];

  return <NewsTickerMarquee items={items} />;
}
