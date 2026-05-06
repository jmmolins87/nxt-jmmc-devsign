import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Aviso legal",
  description: "Aviso legal de jmmc.devsign con información del titular y condiciones generales del sitio.",
  path: "/aviso-legal",
});

export default function AvisoLegalPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold">Aviso legal</h1>
      <p className="mt-6 opacity-90">Este texto es una plantilla inicial. Sustituir por el contenido legal definitivo antes de publicar.</p>
    </main>
  );
}
