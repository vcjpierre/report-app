"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const ReportWizardDynamic = dynamic(
  () => import("@/components/report/ReportWizard").then((mod) => mod.ReportWizard),
  { 
    loading: () => (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
      </div>
    ),
    ssr: false
  }
);

export default function SubmitReport() {
  return (
    <div className="relative min-h-screen bg-black selection:bg-sky-500/20 overflow-hidden">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10 min-h-screen">
        <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03),transparent_50%)]" />
        <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.04),transparent_70%)]" />
      </div>

      <main className="relative px-6 pt-10 pb-10">
        <div className="mx-auto max-w-3xl">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Seguridad garantizada
            </div>

            <h1 className="mt-8 bg-gradient-to-b from-white to-white/80 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
              Enviar reporte
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Su seguridad es nuestra prioridad. Todos los envíos están encriptados y son anónimos.
            </p>
          </div>

          <div className="mt-16 bg-zinc-900/50 rounded-2xl border border-white/5 p-6">
            <Suspense fallback={null}>
              <ReportWizardDynamic />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
