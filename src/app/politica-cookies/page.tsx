import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Política de cookies",
  description: "Información sobre cookies y tecnologías de seguimiento utilizadas por jmmc.devsign.",
  path: "/politica-cookies",
});

export default function PoliticaCookiesPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold">Política de cookies</h1>
      <p className="mt-6 opacity-90">
        Este texto es una plantilla inicial. Debe completarse con la política de cookies y el consentimiento correspondiente.
      </p>
    </main>
  );
}
