import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Diseño web y gráfico",
  description: "Diseño web y gráfico orientado a marca y conversión: interfaces, identidad visual y activos digitales coherentes.",
  path: "/diseno-web-grafico",
});

export default function DisenoWebGraficoPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold">Diseño web y gráfico</h1>
      <p className="mt-6 text-lg opacity-90">
        Diseñamos experiencias visuales claras, atractivas y memorables, alineadas con los objetivos de negocio y la identidad de marca.
      </p>
    </main>
  );
}
