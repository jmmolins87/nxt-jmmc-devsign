import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "IA aplicada",
  description: "Implementación de IA aplicada para productos y operaciones: asistentes, automatización inteligente y optimización de procesos.",
  path: "/ia",
});

export default function IAAplicadaPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold">IA aplicada</h1>
      <p className="mt-6 text-lg opacity-90">
        Integramos IA de forma práctica para resolver problemas reales de negocio con impacto medible en productividad y experiencia de cliente.
      </p>
    </main>
  );
}
