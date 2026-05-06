"use client";

import Script from "next/script";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

export default function Analytics() {
  if (!GA_ID && !ADS_ID) return null;

  const ids = [GA_ID, ADS_ID].filter(Boolean);
  const primaryId = GA_ID ?? ADS_ID;

  return (
    <>
      {primaryId ? <Script src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`} strategy="afterInteractive" /> : null}
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          ${ids.map((id) => `gtag('config', '${id}');`).join("\n")}
        `}
      </Script>
    </>
  );
}
