export default function HowItWorks() {
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
            <div className="inline-flex h-9 items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 text-sm text-sky-400">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Conozca nuestro proceso
            </div>

            <h1 className="mt-8 bg-gradient-to-b from-white to-white/80 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
              ¿Cómo funciona nuestro sistema?
              <span className="block text-2xl mt-4 bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                Tu seguridad es nuestra prioridad
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Aprende cómo nuestro sistema procesa y gestiona los reportes de incidentes para garantizar una respuesta rápida y efectiva.
            </p>
          </div>

          {/* Process Steps */}
          <div className="mt-24 grid gap-12">
            {[
              {
                step: "01",
                title: "Envíe su reporte",
                description:
                  "Capture fotos o videos del incidente eléctrico. Nuestro sistema analiza automáticamente las imágenes para describir la severidad y tipo de incidente.",
                icon: (
                  <svg
                    className="h-6 w-6 text-sky-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Geolocalización y clasificación",
                description:
                  "El sistema guarda la ubicación del incidente y lo clasifica según su severidad. Esta información se utiliza para priorizar la respuesta y asignar los recursos necesarios.",
                icon: (
                  <svg 
                    className="h-6 w-6 text-sky-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor" 
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"
                    />
                  </svg>
                ),
              },              
              {
                step: "03",
                title: "Seguimiento y resolución",
                description:
                  "Manténgase informado sobre el estado de su reporte. Recibirá actualizaciones sobre las acciones tomadas y podrá proporcionar información adicional si es necesario.",
                icon: (
                  <svg
                    className="h-6 w-6 text-sky-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                ),
              },
            ].map((step, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-8 transition-all hover:bg-zinc-800/80"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10">
                      {step.icon}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-sky-400">
                      Paso {step.step}
                    </div>
                    <h3 className="mt-2 text-xl font-medium text-white">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-zinc-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Security Features */}
          <div className="mt-24 rounded-2xl bg-zinc-900 p-8">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Medidas de seguridad
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {[                
                {
                  title: "Análisis automático",
                  description: "Procesamiento inmediato de imágenes para identificar riesgos",
                  icon: (
                    <svg
                      className="h-6 w-6 text-sky-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Monitoreo en tiempo real",
                  description: "Seguimiento continuo de incidentes y respuesta en tiempo real",
                  icon: (
                    <svg
                      className="h-6 w-6 text-sky-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Respuesta priorizada",
                  description: "Sistema inteligente de priorización basado en la severidad del incidente",
                  icon: (
                    <svg
                      className="h-6 w-6 text-sky-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                    </svg>
                  ),
                },
              ].map((feature, i) => (
                <div key={i} className="text-center p-6">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 mb-20 text-center">
            <h2 className="text-2xl font-bold text-white mb-6">
              ¿Listo para hacer un reporte?
            </h2>
            <button className="group relative inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-sky-500 px-8 text-sm font-medium text-white transition-all hover:bg-sky-400">
              Iniciar reporte
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
