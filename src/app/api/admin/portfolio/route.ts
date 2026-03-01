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
        const technologies = formData.get("technologies") as string; // Recibimos como string JSON o comma separated
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

        // Parsear tecnologías si vienen como string
        let techArray = [];
        try {
            techArray = technologies ? JSON.parse(technologies) : [];
        } catch (e) {
            techArray = technologies ? technologies.split(',').map(t => t.trim()) : [];
        }

        // Guardar en DB (Ruta de la imagen + Datos)
        await query(
            "INSERT INTO portfolio (title, slug, description, main_image, category, technologies, live_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [title, slug, description, imageUrl, category, JSON.stringify(techArray), live_url]
        );

        return NextResponse.json({ success: true, url: imageUrl });
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: "Creation and upload failed" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const formData = await req.formData();
        const id = formData.get("id") as string;
        const title = formData.get("title") as string;
        const category = formData.get("category") as string;
        const description = formData.get("description") as string;
        const live_url = formData.get("live_url") as string;
        const technologies = formData.get("technologies") as string;
        const file = formData.get("image") as File | null;

        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        let imageUrl = formData.get("current_image") as string;

        // Si se subió una nueva imagen
        if (file && typeof file !== "string") {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const extension = file.name.split('.').pop();
            const fileName = `${uuidv4()}.${extension}`;
            const path = join(process.cwd(), "public", "uploads", fileName);
            await writeFile(path, buffer);
            imageUrl = `/uploads/${fileName}`;
        }

        // Parsear tecnologías
        let techArray = [];
        try {
            techArray = technologies ? JSON.parse(technologies) : [];
        } catch (e) {
            techArray = technologies ? technologies.split(',').map(t => t.trim()) : [];
        }

        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        await query(
            "UPDATE portfolio SET title = ?, slug = ?, description = ?, main_image = ?, category = ?, technologies = ?, live_url = ? WHERE id = ?",
            [title, slug, description, imageUrl, category, JSON.stringify(techArray), live_url, id]
        );

        return NextResponse.json({ success: true, url: imageUrl });
    } catch (error) {
        console.error("Update Error:", error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id, is_published } = await req.json();
        await query("UPDATE portfolio SET is_published = ? WHERE id = ?", [is_published ? 1 : 0, id]);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        await query("DELETE FROM portfolio WHERE id = ?", [id]);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}
