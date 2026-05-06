import type { Metadata } from "next";
import Analytics from "@/components/Analytics";
import { siteConfig, siteSocials } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  referrer: "origin-when-cross-origin",
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1024,
        height: 1024,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeScript = `
    (() => {
      const root = document.documentElement;
      const ZENITH = 90.833;
      const toRad = (d) => (d * Math.PI) / 180;
      const toDeg = (r) => (r * 180) / Math.PI;
      const norm = (d) => ((d % 360) + 360) % 360;

      const dayOfYear = (date) => {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        return Math.floor(diff / 86400000);
      };

      const localSunTime = (date, lat, lon, sunrise) => {
        const N = dayOfYear(date);
        const lngHour = lon / 15;
        const t = N + ((sunrise ? 6 : 18) - lngHour) / 24;
        const M = 0.9856 * t - 3.289;
        let L = M + 1.916 * Math.sin(toRad(M)) + 0.02 * Math.sin(toRad(2 * M)) + 282.634;
        L = norm(L);
        let RA = toDeg(Math.atan(0.91764 * Math.tan(toRad(L))));
        RA = norm(RA);
        const Lquadrant = Math.floor(L / 90) * 90;
        const RAquadrant = Math.floor(RA / 90) * 90;
        RA = (RA + (Lquadrant - RAquadrant)) / 15;
        const sinDec = 0.39782 * Math.sin(toRad(L));
        const cosDec = Math.cos(Math.asin(sinDec));
        const cosH = (Math.cos(toRad(ZENITH)) - sinDec * Math.sin(toRad(lat))) / (cosDec * Math.cos(toRad(lat)));
        if (cosH > 1 || cosH < -1) return null;
        let H = sunrise ? 360 - toDeg(Math.acos(cosH)) : toDeg(Math.acos(cosH));
        H /= 15;
        const T = H + RA - 0.06571 * t - 6.622;
        const UT = norm(T - lngHour * 1) / 24;
        const midnightUTC = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
        return new Date(midnightUTC + UT * 86400000);
      };

      const applyTheme = (isDay) => {
        root.setAttribute("data-theme", isDay ? "light" : "dark");
      };

      const notice = document.getElementById("geo-theme-notice");
      const showNotice = () => {
        if (!notice) return;
        notice.textContent = "Solicitamos tu ubicación para calcular amanecer/atardecer y activar automáticamente el tema claro u oscuro.";
        notice.setAttribute("data-open", "true");
      };
      const hideNotice = () => {
        if (!notice) return;
        notice.setAttribute("data-open", "false");
      };

      const forcedTheme = new URLSearchParams(window.location.search).get("theme");
      if (forcedTheme === "light" || forcedTheme === "dark") {
        root.setAttribute("data-theme", forcedTheme);
        return;
      }

      const systemScheme = window.matchMedia("(prefers-color-scheme: dark)");
      const applySystemTheme = () => {
        root.setAttribute("data-theme", systemScheme.matches ? "dark" : "light");
      };
      if (typeof systemScheme.matches === "boolean") {
        applySystemTheme();
        systemScheme.addEventListener("change", applySystemTheme);
        return;
      }

      const fallbackByHour = () => {
        const h = new Date().getHours();
        applyTheme(h >= 7 && h < 20);
      };

      const resolve = (lat, lon) => {
        const now = new Date();
        const sunrise = localSunTime(now, lat, lon, true);
        const sunset = localSunTime(now, lat, lon, false);
        if (!sunrise || !sunset) {
          fallbackByHour();
          return;
        }
        applyTheme(now >= sunrise && now < sunset);
      };

      fallbackByHour();
      if (!("geolocation" in navigator)) return;
      showNotice();
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve(pos.coords.latitude, pos.coords.longitude);
          hideNotice();
        },
        () => {
          fallbackByHour();
          hideNotice();
        },
        { enableHighAccuracy: false, timeout: 4000, maximumAge: 3600000 }
      );

      setInterval(() => {
        if (!("geolocation" in navigator)) {
          fallbackByHour();
          return;
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos.coords.latitude, pos.coords.longitude),
          () => fallbackByHour(),
          { enableHighAccuracy: false, timeout: 4000, maximumAge: 3600000 }
        );
      }, 300000);
    })();
  `;

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
              description: siteConfig.description,
              logo: `${siteConfig.url}${siteConfig.ogImage}`,
              sameAs: siteSocials.sameAs,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteConfig.name,
              url: siteConfig.url,
              inLanguage: siteConfig.language,
            }),
          }}
        />
        <div id="geo-theme-notice" className="geo-theme-notice" aria-live="polite" data-open="false" />
        {children}
      </body>
    </html>
  );
}
