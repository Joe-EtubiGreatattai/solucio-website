import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Hospital in ${site.city}`,
    short_name: site.name,
    description: `Consultant-led private hospital in ${site.city}, ${site.region}.`,
    start_url: "/",
    display: "standalone",
    background_color: "#fffaf5",
    theme_color: "#0f766e",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
