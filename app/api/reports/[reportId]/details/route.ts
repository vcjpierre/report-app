import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { reportId: string } }
) {
  try {
    const report = await prisma.report.findUnique({
      where: {
        reportId: params.reportId,
      },
    });

    if (!report) {
      return NextResponse.json({ error: "Reporte no encontrado" }, { status: 404 });
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error trayendo los detalles del reporte:", error);
    return NextResponse.json(
      { error: "Error al recuperar los detalles del reporte" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Sin autorización" }, { status: 401 });
    }

    const { status } = await request.json();
    const report = await prisma.report.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json(report);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al actualizar el reporte" },
      { status: 500 }
    );
  }
}
