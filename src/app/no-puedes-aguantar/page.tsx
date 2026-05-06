import type { Metadata } from "next";
import ContactConversionActions from "@/components/ContactConversionActions";
import ParallaxHero from "@/components/ParallaxHero";
import { buildPageMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata: Metadata = buildPageMetadata({
  title: "¿No puedes aguantar?",
  description: "Contacta ahora por WhatsApp o reserva una llamada con jmmc.devsign.",
  path: "/no-puedes-aguantar",
});

export default function NoPuedesAguantarPage() {
  return (
    <main className="home-main min-h-screen w-full" style={{ backgroundColor: "var(--theme-bg-primary)", color: "var(--text-primary)" }}>
      <ParallaxHero>
        <div className="parallax-layer parallax-layer-bg" aria-hidden="true" />
        <div className="parallax-layer parallax-layer-mid" aria-hidden="true" />
        <div className="center-dark-veil" aria-hidden="true" />

        <section className="parallax-layer parallax-layer-front animate-fade-up mx-auto max-w-4xl space-y-6 text-center">
          <Image
            src="/dark/logo.png"
            alt="jmmc.devsign"
            width={1560}
            height={560}
            priority
            className="theme-text-image-dark mx-auto h-auto w-[min(90vw,560px)]"
          />
          <Image
            src="/light/logo.png"
            alt="jmmc.devsign"
            width={1560}
            height={555}
            priority
            className="theme-text-image-light mx-auto h-auto w-[min(90vw,560px)]"
          />
          <h1 className="coming-soon-reflection pb-1 text-4xl font-semibold leading-[1.18] tracking-[0.04em] sm:text-5xl">
            ¿No puedes aguantar?
          </h1>
          <p className="text-lg opacity-90">Hablemos ya. Elige la vía más rápida y te respondo lo antes posible.</p>
          <ContactConversionActions includeEmail={false} />
        </section>
      </ParallaxHero>
    </main>
  );
}
