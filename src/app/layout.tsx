import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "jmmc.devsign — Diseño web, consultoría, IA y automatizaciones a medida",
  description: "Diseño web, IA y automatizaciones a medida para impulsar negocios digitales.",
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

      const forcedTheme = new URLSearchParams(window.location.search).get("theme");
      if (forcedTheme === "light" || forcedTheme === "dark") {
        root.setAttribute("data-theme", forcedTheme);
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
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve(pos.coords.latitude, pos.coords.longitude),
        () => fallbackByHour(),
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
      <body>{children}</body>
    </html>
  );
}
