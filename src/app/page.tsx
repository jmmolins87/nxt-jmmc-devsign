import Loader from "@/components/Loader";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#03040a] text-white">
      <section className="grid min-h-screen place-items-center px-5 py-10 text-center sm:px-6">
        <div className="animate-fade-up space-y-8">
          <Loader />
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/70 sm:text-xs md:text-sm md:tracking-[0.24em]">
            Sitio en construcción
          </p>
          <h1 className="mt-4 bg-[linear-gradient(120deg,#00D5FF_0%,#3A6DFF_48%,#A855F7_100%)] bg-clip-text text-4xl font-semibold leading-tight text-transparent drop-shadow-[0_0_18px_rgba(0,213,255,0.35)] [text-shadow:0_0_24px_rgba(58,109,255,0.28),0_0_40px_rgba(168,85,247,0.25)] sm:text-5xl md:text-7xl">
            Próximamente
          </h1>
        </div>
      </section>
    </main>
  );
}
