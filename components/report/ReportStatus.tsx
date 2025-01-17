/* eslint-disable @typescript-eslint/no-explicit-any */
interface ReportStatusProps {
  report: any;
}

export function ReportStatus({ report }: ReportStatusProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pendiente":
        return "text-yellow-400";
      case "en progreso":
        return "text-sky-400";
      case "resuelto":
        return "text-green-400";
      default:
        return "text-zinc-400";
    }
  };

  return (
    <div className="rounded-xl bg-zinc-900/50 border border-zinc-800/50 p-6 space-y-6">
      {/* Status Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-400">Estado del reporte</p>
          <p className={`text-lg font-medium ${getStatusColor(report.status)}`}>
            {report.status || "Pending Review"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-zinc-400">ID del reporte</p>
          <p className="text-sm font-mono text-white">{report.reportId}</p>
        </div>
      </div>

      {/* Report Details */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm text-zinc-400">Tipo de incidente</p>
          <p className="text-sm text-white mt-1">{report.incidentType}</p>
        </div>
        <div>
          <p className="text-sm text-zinc-400">Enviado el</p>
          <p className="text-sm text-white mt-1">
            {new Date(report.timestamp).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-zinc-400">Nivel de prioridad</p>
          <p className="text-sm text-white mt-1">{report.analysis?.priority}</p>
        </div>
        <div>
          <p className="text-sm text-zinc-400">Departamento asignado</p>
          <p className="text-sm text-white mt-1">
            {report.analysis?.department}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <p className="text-sm font-medium text-white mb-4">Cronología</p>
        <div className="space-y-4">
          {report.timeline?.map((event: any, index: number) => (
            <div key={index} className="flex gap-4">
              <div className="flex-none">
                <div className="h-2 w-2 mt-2 rounded-full bg-sky-500" />
              </div>
              <div>
                <p className="text-sm text-white">{event.description}</p>
                <p className="text-xs text-zinc-400">
                  {new Date(event.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}