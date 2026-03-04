import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { writeFile, readdir, stat, unlink } from "fs/promises";
import { join, extname } from "path";
import { v4 as uuidv4 } from "uuid";

const UPLOADS_DIR = join(process.cwd(), "public", "uploads");
const ALLOWED_EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"];

// GET — Lista todos los archivos en /public/uploads
export async function GET() {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const files = await readdir(UPLOADS_DIR);
        const items = await Promise.all(
            files
                .filter(f => ALLOWED_EXT.includes(extname(f).toLowerCase()))
                .map(async f => {
                    const filePath = join(UPLOADS_DIR, f);
                    const info = await stat(filePath);
                    return {
                        name: f,
                        url: `/uploads/${f}`,
                        size: info.size,
                        createdAt: info.birthtime.toISOString(),
                    };
                })
        );

        // Ordenar por más reciente primero
        items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return NextResponse.json(items);
    } catch (error) {
        console.error("Media GET error:", error);
        return NextResponse.json({ error: "Error al listar archivos" }, { status: 500 });
    }
}

// POST — Sube uno o varios archivos
export async function POST(req: Request) {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const formData = await req.formData();
        const files = formData.getAll("files") as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No se recibieron archivos" }, { status: 400 });
        }

        const uploaded: { name: string; url: string; size: number }[] = [];

        for (const file of files) {
            const ext = extname(file.name).toLowerCase();
            if (!ALLOWED_EXT.includes(ext)) {
                continue; // Omitir extensiones no permitidas
            }

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const fileName = `${uuidv4()}${ext}`;
            const filePath = join(UPLOADS_DIR, fileName);

            await writeFile(filePath, buffer);
            uploaded.push({ name: fileName, url: `/uploads/${fileName}`, size: file.size });
        }

        return NextResponse.json({ success: true, files: uploaded });
    } catch (error) {
        console.error("Media POST error:", error);
        return NextResponse.json({ error: "Error al subir archivos" }, { status: 500 });
    }
}

// DELETE — Elimina un archivo por nombre
export async function DELETE(req: Request) {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const name = searchParams.get("name");

        if (!name || name.includes("..") || name.includes("/")) {
            return NextResponse.json({ error: "Nombre de archivo inválido" }, { status: 400 });
        }

        const filePath = join(UPLOADS_DIR, name);
        await unlink(filePath);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Error al eliminar archivo" }, { status: 500 });
    }
}
