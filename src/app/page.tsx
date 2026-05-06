import Loader from "@/components/Loader";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen w-full" style={{ backgroundColor: "var(--theme-bg-primary)", color: "var(--text-primary)" }}>
      <section className="grid min-h-screen place-items-center px-5 py-10 text-center sm:px-6">
        <div className="animate-fade-up space-y-8">
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
          <p className="coming-soon-reflection text-2xl font-semibold tracking-[0.08em] sm:text-3xl md:text-4xl">
            Próximamente
          </p>
        </div>
      </section>
    </main>
  );
}
