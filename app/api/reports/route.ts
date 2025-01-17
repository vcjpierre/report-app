import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ReportStatus, ReportType } from "@prisma/client";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Sin autorización" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") as ReportStatus | null;
    const type = searchParams.get("type") as ReportType | null;

    // Build the where clause based on filters
    const where = {
      ...(status && { status }),
      ...(type && { type }),
    };

    // Add timeout and retry logic
    const reports = await Promise.race([
      prisma.report.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          reportId: true,
          type: true,
          title: true,
          description: true,
          location: true,
          latitude: true,
          longitude: true,
          image: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Tiempo de espera de la base de datos")), 15000)
      ),
    ]);

    return NextResponse.json(reports);
  } catch (error: any) {
    console.error("Fallo al recuperar reportes:", error);

    // More specific error messages
    if (error.code === "P1001") {
      return NextResponse.json(
        { error: "No se puede conectar a la base de datos. Vuelva a intentarlo más tarde." },
        { status: 503 }
      );
    }

    if (error.code === "P2024") {
      return NextResponse.json(
        { error: "Se ha agotado el tiempo de conexión a la base de datos. Por favor, inténtelo de nuevo." },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "Fallo al recuperar los reportes" },
      { status: 500 }
    );
  } finally {
    // Optional: Disconnect for serverless environments
    if (process.env.VERCEL) {
      await prisma.$disconnect();
    }
  }
}
