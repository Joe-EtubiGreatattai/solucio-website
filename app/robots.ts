import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Let every search engine crawl everything except internal/transactional pages
      { userAgent: "*", allow: "/", disallow: ["/finance", "/book/status", "/api/"] },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
