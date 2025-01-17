/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Report, ReportStatus, ReportType } from "@prisma/client";
import { signOut } from "next-auth/react";

interface AdminDashboardProps {
  reports: Report[];
  updateReportStatus: (reportId: string, newStatus: ReportStatus) => void;
  getStatusColor: (status: ReportStatus) => string;
}

interface ModeratorDashboardProps {
  reports: Report[];
  getStatusColor: (status: ReportStatus) => string;
}

interface UserDashboardProps {
  reports: Report[];
  getStatusColor: (status: ReportStatus) => string;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<ReportStatus | "TODOS">("TODOS");
  const [typeFilter, setTypeFilter] = useState<ReportType | "TODOS">("TODOS");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/reports");
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error("Error al obtener reportes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateReportStatus = async (
    reportId: string,
    newStatus: ReportStatus
  ) => {
    try {
      const response = await fetch(`/api/reports/${reportId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchReports();
      }
    } catch (error) {
      console.error("Error al actualizar el reporte:", error);
    }
  };

  const filteredReports = Array.isArray(reports) ? reports.filter((report) => {
    const statusMatch = filter === "TODOS" || report.status === filter;
    const typeMatch = typeFilter === "TODOS" || report.type === typeFilter;
    return statusMatch && typeMatch;
  }) : [];

  const getStatusColor = (status: ReportStatus) => {
    const colors = {
      PENDIENTE: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
      EN_PROGRESO: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
      RESUELTO: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
      DESESTIMADO:
        "bg-neutral-500/10 text-neutral-400 border border-neutral-500/20",
    };
    return colors[status];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-neutral-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-6">
              <span className="text-neutral-400">
                {session?.user?.name || "Admin"}
              </span>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 text-sm font-medium text-neutral-300 bg-neutral-900 rounded-lg hover:bg-neutral-800 border border-neutral-800 transition-all hover:border-neutral-700"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as ReportStatus | "TODOS")
              }
              className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20"
            >
              <option value="TODOS">Todos los estados</option>
              {Object.values(ReportStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as ReportType | "TODOS")
              }
              className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20"
            >
              <option value="TODOS">Todos los tipos</option>
              {Object.values(ReportType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="text-neutral-400">
            {filteredReports.length} Reportes
          </div>
        </div>

        <AdminDashboard
          reports={filteredReports}
          updateReportStatus={updateReportStatus}
          getStatusColor={getStatusColor}
        />

        {filteredReports.length === 0 && (
          <div className="text-center py-12 text-neutral-500 bg-neutral-900/50 rounded-xl border border-neutral-800">
            No se han encontrado reportes que coincidan con los filtros seleccionados.
          </div>
        )}
      </main>
    </div>
  );
}

function AdminDashboard({
  reports,
  updateReportStatus,
  getStatusColor,
}: AdminDashboardProps) {
  return (
    <div className="grid gap-4">
      {reports.map((report) => (
        <div
          key={report.id}
          className="bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-800 hover:border-neutral-700 transition-all"
        >
          <div className="flex justify-between items-start gap-6">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-medium text-neutral-200">
                  {report.title}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    report.status
                  )}`}
                >
                  {report.status}
                </span>
              </div>
              <p className="text-neutral-400 text-sm">{report.description}</p>
              <div className="flex flex-wrap gap-6 text-sm text-neutral-500">
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
                  </div>
                  {report.type}
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
                  </div>
                  {report.location || "N/A"}
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
                  </div>
                  {new Date(report.createdAt).toLocaleDateString()}
                </span>
              </div>
              {report.image && (
                <img
                  src={report.image}
                  alt="Reporte"
                  className="mt-4 rounded-lg border border-neutral-800"
                />
              )}
            </div>
            <select
              value={report.status}
              onChange={(e) =>
                updateReportStatus(report.id, e.target.value as ReportStatus)
              }
              className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20"
            >
              {Object.values(ReportStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

function ModeratorDashboard({
  reports,
  getStatusColor,
}: ModeratorDashboardProps) {
  return (
    <div className="grid gap-4">
      {reports.map((report) => (
        <div
          key={report.id}
          className="bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-800 hover:border-neutral-700 transition-all"
        >
          <div className="flex justify-between items-start gap-6">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-medium text-neutral-200">
                  {report.title}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    report.status
                  )}`}
                >
                  {report.status}
                </span>
              </div>
              <p className="text-neutral-400 text-sm">{report.description}</p>
              <div className="flex flex-wrap gap-6 text-sm text-neutral-500">
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
                  </div>
                  {report.type}
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
                  </div>
                  {report.location || "N/A"}
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
                  </div>
                  {new Date(report.createdAt).toLocaleDateString()}
                </span>
              </div>
              {report.image && (
                <img
                  src={report.image}
                  alt="Reporte"
                  className="mt-4 rounded-lg border border-neutral-800"
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function UserDashboard({
  reports,
  getStatusColor,
}: UserDashboardProps) {
  return (
    <div className="grid gap-4">
      {reports.map((report) => (
        <div
          key={report.id}
          className="bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-800 hover:border-neutral-700 transition-all"
        >
          <div className="flex justify-between items-start gap-6">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-medium text-neutral-200">
                  {report.title}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    report.status
                  )}`}
                >
                  {report.status}
                </span>
              </div>
              <p className="text-neutral-400 text-sm">{report.description}</p>
              <div className="flex flex-wrap gap-6 text-sm text-neutral-500">
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
                  </div>
                  {report.type}
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
                  </div>
                  {report.location || "N/A"}
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
                  </div>
                  {new Date(report.createdAt).toLocaleDateString()}
                </span>
              </div>
              {report.image && (
                <img
                  src={report.image}
                  alt="Reporte"
                  className="mt-4 rounded-lg border border-neutral-800"
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
