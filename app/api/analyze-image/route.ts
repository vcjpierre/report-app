import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    const base64Data = image.split(",")[1];

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Analiza esta imagen de situación de emergencia y responda en este formato exacto sin asteriscos ni viñetas:
TÍTULO: Escriba un título claro y breve
TIPO: Elija uno (Fluctuación de voltaje, Cable de alta tensión caído, Daño en el transformador, Colapso de poste, Incendio eléctrico, o Otros)
DESCRIPCIÓN: Escriba una descripción clara y concisa`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg",
        },
      },
    ]);

    const text = await result.response.text(); // Ensure text() is awaited

    // Parse the response more precisely
    const titleMatch = text.match(/TÍTULO:\s*(.+)/);
    const typeMatch = text.match(/TIPO:\s*(.+)/);
    const descMatch = text.match(/DESCRIPCIÓN:\s*(.+)/);

    return NextResponse.json({
      title: titleMatch?.[1]?.trim() || "",
      reportType: typeMatch?.[1]?.trim() || "",
      description: descMatch?.[1]?.trim() || "",
    });
  } catch (error) {
    console.error("Error al analizar la imagen:", error);
    return NextResponse.json(
      { error: "Fallo al analizar la imagen" },
      { status: 500 }
    );
  }
}
