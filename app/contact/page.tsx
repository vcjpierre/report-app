export default function Contact() {
  return (
    <div className="relative min-h-screen bg-black selection:bg-sky-500/20 overflow-hidden">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10 min-h-screen">
        <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03),transparent_50%)]" />
        <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.04),transparent_70%)]" />
      </div>

      <main className="relative px-6 pt-32">
        <div className="mx-auto max-w-5xl">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold text-white">
              Contáctanos
            </h1>
            <p className="mt-2 text-lg text-zinc-400">
              ¿Tienes alguna duda o sugerencia?
              <a href="mailto:contact@example.com" className="text-white underline pl-1">
               Escríbenos
            </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
