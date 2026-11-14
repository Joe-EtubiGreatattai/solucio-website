import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";

// Search + AI answer engines are welcomed explicitly so ChatGPT, Perplexity, Gemini and others can
// read and cite the site. Only internal/transactional pages are kept out.
const BLOCK = ["/finance", "/book/status", "/api/"];
const AI_BOTS = [
  "OAI-SearchBot", // ChatGPT search index
  "ChatGPT-User", // ChatGPT live fetches on a user's behalf
  "GPTBot", // OpenAI
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-User",
  "Google-Extended", // Gemini / Vertex grounding
  "Applebot-Extended",
  "cohere-ai",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: BLOCK },
      // Name the AI crawlers explicitly so their access is deliberate, not accidental
      { userAgent: AI_BOTS, allow: "/", disallow: BLOCK },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
