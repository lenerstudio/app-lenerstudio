import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const portfolio = await query("SELECT * FROM portfolio ORDER BY display_order ASC");
        return NextResponse.json(portfolio);
    } catch (error) {
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const formData = await req.formData();

        // Extraer campos
        const title = formData.get("title") as string;
        const category = formData.get("category") as string;
        const description = formData.get("description") as string;
        const live_url = formData.get("live_url") as string;
        const file = formData.get("image") as File;

        if (!file) {
            return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
        }

        // Procesar Imagen
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generar nombre único y ruta
        const extension = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${extension}`;
        const path = join(process.cwd(), "public", "uploads", fileName);

        // Guardar en carpeta local
        await writeFile(path, buffer);
        const imageUrl = `/uploads/${fileName}`;

        // Crear slug básico
        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        // Guardar en DB (Ruta de la imagen + Datos)
        await query(
            "INSERT INTO portfolio (title, slug, description, main_image, category, technologies, live_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [title, slug, description, imageUrl, category, JSON.stringify([]), live_url]
        );

        return NextResponse.json({ success: true, url: imageUrl });
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: "Creation and upload failed" }, { status: 500 });
    }
}
