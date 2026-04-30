export default function Home() {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-black text-white">
      <video
        className="absolute inset-0 h-dvh w-screen object-cover object-center md:h-full md:w-full"
        src="/Animate_two_logos_loading_page_202604291958.mp4"
        autoPlay
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.7)_100%)]" />

      <section className="relative z-10 grid h-full place-items-center px-5 py-10 text-center sm:px-6">
        <div className="animate-fade-up">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/70 sm:text-xs md:text-sm md:tracking-[0.24em]">
            Sitio en construcción
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white drop-shadow-[0_8px_32px_rgba(255,255,255,0.2)] sm:text-5xl md:text-7xl">
            Próximamente
          </h1>
        </div>
      </section>
    </main>
  );
}
