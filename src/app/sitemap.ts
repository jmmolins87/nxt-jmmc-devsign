import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const routes = [
  "/",
  "/consultoria-web",
  "/diseno-web-grafico",
  "/automatizaciones",
  "/ia",
  "/contacto",
  "/no-puedes-aguantar",
  "/aviso-legal",
  "/politica-privacidad",
  "/politica-cookies",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route, index) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.7,
  }));
}
