export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/Animate_two_logos_loading_page_202604291958.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.7)_100%)]" />

      <section className="relative z-10 grid min-h-screen place-items-center px-6 text-center">
        <div className="animate-fade-up">
          <p className="text-xs md:text-sm uppercase tracking-[0.24em] text-white/70">Sitio en construcción</p>
          <h1 className="mt-4 text-5xl md:text-7xl font-semibold text-white drop-shadow-[0_8px_32px_rgba(255,255,255,0.2)]">
            Próximamente
          </h1>
        </div>
      </section>
    </main>
  );
}
