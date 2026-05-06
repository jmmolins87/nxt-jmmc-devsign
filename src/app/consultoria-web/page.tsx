import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Consultoría web",
  description: "Consultoría web estratégica para mejorar rendimiento, conversión, arquitectura y escalabilidad de tu negocio digital.",
  path: "/consultoria-web",
});

export default function ConsultoriaWebPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold">Consultoría web</h1>
      <p className="mt-6 text-lg opacity-90">
        Analizamos tu web, detectamos cuellos de botella y definimos una hoja de ruta técnica y de negocio para crecer con criterio.
      </p>
    </main>
  );
}
