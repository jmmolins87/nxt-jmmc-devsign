import Loader from "@/components/Loader";
import ParallaxHero from "@/components/ParallaxHero";
import { siteConfig, siteServices } from "@/lib/site-config";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Servicios de jmmc.devsign",
    itemListElement: siteServices.map((service, index) => ({
      "@type": "Service",
      position: index + 1,
      name: service.name,
      description: service.description,
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    })),
  };

  return (
    <main className="home-main min-h-screen w-full" style={{ backgroundColor: "var(--theme-bg-primary)", color: "var(--text-primary)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }} />
      <ParallaxHero>
        <div className="parallax-layer parallax-layer-bg" aria-hidden="true" />
        <div className="parallax-layer parallax-layer-mid" aria-hidden="true" />

        <div className="parallax-layer parallax-layer-front animate-fade-up space-y-8">
          <Loader />
          <Image
            src="/dark/texto.png"
            alt="Próximamente"
            width={1098}
            height={370}
            priority
            className="theme-text-image-dark mx-auto mt-4 h-auto w-[min(90vw,560px)]"
          />
          <Image
            src="/light/texto.png"
            alt="Próximamente"
            width={1097}
            height={172}
            priority
            className="theme-text-image-light mx-auto mt-4 h-auto w-[min(90vw,560px)]"
          />
          <p className="coming-soon-reflection text-2xl font-semibold tracking-[0.08em] sm:text-3xl md:text-4xl">Próximamente</p>
          <p className="text-sm opacity-80">
            <Link href="/no-puedes-aguantar" className="underline decoration-white/50 underline-offset-4 hover:decoration-white">
              ¿No puedes aguantar?
            </Link>
          </p>
        </div>
      </ParallaxHero>
    </main>
  );
}
