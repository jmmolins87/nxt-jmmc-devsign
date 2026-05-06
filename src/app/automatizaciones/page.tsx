import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Automatizaciones",
  description: "Automatizaciones para ahorrar tiempo, reducir errores y escalar operaciones en ventas, marketing y procesos internos.",
  path: "/automatizaciones",
});

export default function AutomatizacionesPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold">Automatizaciones</h1>
      <p className="mt-6 text-lg opacity-90">
        Diseñamos e implementamos flujos automatizados conectando tus herramientas para mejorar eficiencia operativa y seguimiento comercial.
      </p>
    </main>
  );
}
