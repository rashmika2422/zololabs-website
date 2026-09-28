export default function Hero() {
    return (
        <section className="relative flex min-h-screen items-center overflow-hidden bg-[#050914] px-6 pt-20">
      <div className="absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[150px]" />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="max-w-4xl">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
            Software engineered for growth
          </p>

          <h1 className="text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl lg:text-8xl">
            We build software for
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              ideas that deserve to scale.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
            ZoloLabs designs and develops modern web platforms, SaaS products,
            AI-powered solutions and custom software for ambitious businesses.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="rounded-full bg-blue-600 px-7 py-3.5 font-medium text-white transition hover:bg-blue-500"
            >
              Start a Project
            </a>

            <a
              href="#work"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 font-medium text-white transition hover:bg-white/10"
            >
              View Our Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );

    
}