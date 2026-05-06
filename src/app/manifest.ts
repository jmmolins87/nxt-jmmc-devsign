import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "jmmc.devsign",
    short_name: "jmmc",
    description: "Diseño web, consultoría, IA y automatizaciones a medida para impulsar negocios digitales.",
    start_url: "/",
    display: "standalone",
    background_color: "#010418",
    theme_color: "#010418",
    lang: "es",
    icons: [
      {
        src: "/icon.png",
        sizes: "1024x1024",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
