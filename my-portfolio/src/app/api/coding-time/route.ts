import { portfolio } from "@/data/portfolio";
import { getCodingStats } from "@/lib/wakatime";

/**
 * GET /api/coding-time → your live WakaTime numbers as JSON.
 * The Coding Time card on the home page calls this every minute.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const stats = await getCodingStats(portfolio.wakatime);

  return Response.json(stats, {
    headers: {
      // Vercel shares one answer between all visitors for 20 seconds, so WakaTime
      // is asked at most ~3 times a minute however many people are on your site.
      "Cache-Control": "public, max-age=0, s-maxage=20",
    },
  });
}
