import * as z from "zod";

export enum Steps {
  INCIDENT_DETAILS = 0,
  LOCATION = 1,
  DATETIME = 2,
  WITNESS_INFO = 3,
}

export const reportSchema = z.object({
  incidentType: z.string().min(1, "Por favor, seleccione un tipo de incidente"),
  description: z.string().min(10, "Por favor, proporcione una descripción detallada del incidente"),
  location: z.string().min(1, "Ubicación es requerida"),
  dateTime: z.date(),
  witnessName: z.string().optional(),
  witnessContact: z.string().optional(),
});

export type ReportFormData = z.infer<typeof reportSchema>;
