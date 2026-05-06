import type { Metadata } from "next";
import ContactConversionActions from "@/components/ContactConversionActions";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contacto",
  description: "Contacta con jmmc.devsign para consultoría web, diseño, automatizaciones e IA aplicada.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold">Contacto</h1>
      <p className="mt-6 text-lg opacity-90">Escríbenos para valorar tu proyecto y definir el siguiente paso.</p>
      <p className="mt-4 opacity-80">
        Email: <a href="mailto:hola@jmmcdevsign.es">hola@jmmcdevsign.es</a>
      </p>
      <ContactConversionActions />
    </main>
  );
}
