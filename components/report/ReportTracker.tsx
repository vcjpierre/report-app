"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader } from "lucide-react";

interface ReportDetails {
  id: string;
  reportId: string;
  status: string;
  createdAt: string;
  title: string;
  description: string;
  location: string;
}

export function ReportTracker() {
  const [reportId, setReportId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [reportDetails, setReportDetails] = useState<ReportDetails | null>(
    null
  );
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setReportDetails(null);
    setLoading(true);

    if (!reportId.trim()) {
      setError("Introduzca un ID del reporte válido");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/reports/${reportId}/details`);
      if (!response.ok) {
        throw new Error("Reporte no encontrado");
      }
      const data = await response.json();
      setReportDetails(data);
    } catch (err) {
      setError("No se ha podido encontrar el reporte. Por favor, compruebe el ID e inténtelo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex h-9 items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 text-sm text-sky-400">
          <Search className="w-4 h-4" />
          Seguimiento del estado de su reporte
        </div>
        <h1 className="mt-6 bg-gradient-to-b from-white to-white/80 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
            Seguimiento del reporte
          <span className="block bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
            Manténgase informado
          </span>
        </h1>
        <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
          Introduzca su ID del reporte para comprobar el estado actual y las actualizaciones
        </p>
      </div>

      {/* Dynamic Layout Container */}
      <div className="flex justify-center">
        <div
          className={`transition-all duration-300 ease-in-out 
          ${
            reportDetails
              ? "w-full grid md:grid-cols-2 gap-8 pb-10"
              : "max-w-lg w-full"
          }`}
        >
          {/* Form Section */}
          <div
            className={`bg-zinc-900/50 backdrop-blur-xl rounded-2xl border 
            border-white/5 p-6 w-full transition-all duration-300
            ${reportDetails ? "" : "mx-auto"}`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label
                  htmlFor="reportId"
                  className="block text-sm font-medium mb-2 text-zinc-400"
                >
                  ID del reporte
                </label>
                <input
                  type="text"
                  id="reportId"
                  value={reportId}
                  onChange={(e) => setReportId(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-white/5 rounded-xl
                           text-white placeholder-zinc-500 focus:outline-none focus:ring-2 
                           focus:ring-sky-500/50 focus:border-transparent transition-all"
                  placeholder="Introduzca ID del reporte"
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                  <svg
                    className="h-5 w-5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 
                         text-white py-3 px-4 rounded-xl hover:from-sky-400 
                         hover:to-blue-500 transition-all duration-200 
                         disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span>{loading ? "Buscando..." : "Informe del reporte"}</span>
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div
            className={`transition-all duration-300 
            ${
              reportDetails
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8 absolute"
            }`}
          >
            {reportDetails && (
              <div className="rounded-xl border border-white/5 bg-black/30 backdrop-blur-xl p-6 h-full">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
                  <div className="h-2 w-2 rounded-full bg-sky-400" />
                  Detalles del reporte
                </h2>

                <div className="grid gap-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                    <span className="text-zinc-400">Estado</span>
                    <span
                      className={`font-medium ${getStatusColor(
                        reportDetails.status
                      )} 
                        px-3 py-1 rounded-full bg-white/5`}
                    >
                      {reportDetails.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                    <span className="text-zinc-400">ID del reporte</span>
                    <span className="text-white font-mono">
                      {reportDetails.reportId || reportDetails.id}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                    <span className="text-zinc-400">Enviado el</span>
                    <span className="text-white">
                      {new Date(reportDetails.createdAt).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-white/5 space-y-1.5">
                    <span className="text-zinc-400 text-sm">Título</span>
                    <span className="text-white block font-medium">
                      {reportDetails.title}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-white/5 space-y-1.5">
                    <span className="text-zinc-400 text-sm">Ubicación</span>
                    <span className="text-white block font-medium">
                      {reportDetails.location}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-white/5 space-y-1.5">
                    <span className="text-zinc-400 text-sm">Descripción</span>
                    <p className="text-white text-sm leading-relaxed">
                      {reportDetails.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    pending: "text-yellow-400",
    processing: "text-sky-400",
    completed: "text-emerald-400",
    failed: "text-red-400",
  };
  return statusColors[status.toLowerCase()] || "text-white";
}
