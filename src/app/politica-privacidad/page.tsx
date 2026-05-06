import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Política de privacidad",
  description: "Política de privacidad de jmmc.devsign sobre tratamiento de datos personales.",
  path: "/politica-privacidad",
});

export default function PoliticaPrivacidadPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold">Política de privacidad</h1>
      <p className="mt-6 opacity-90">
        Este texto es una plantilla inicial. Debe reemplazarse por una política conforme a RGPD/LOPDGDD antes de producción.
      </p>
    </main>
  );
}
