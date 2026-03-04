import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";

/**
 * Tabla site_settings:
 *   id INT NOT NULL (SIN AUTO_INCREMENT), setting_key, setting_value,
 *   setting_group ENUM('contacto','seo','rrss','estilo'), description, updated_at
 */

function getGroup(key: string): "contacto" | "seo" | "rrss" | "estilo" {
    if (key.startsWith("social_")) return "rrss";
    if (key.startsWith("seo_")) return "seo";
    if (key === "maintenance_mode") return "estilo";
    return "contacto";
}

// GET — lista todos los settings
export async function GET() {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const settings = await query(
            "SELECT id, setting_key, setting_value, setting_group, description FROM site_settings ORDER BY id"
        ) as any[];
        return NextResponse.json(settings);
    } catch (error: any) {
        console.error("[Settings GET]", error?.message || error);
        return NextResponse.json({ error: "Database error", detail: error?.message }, { status: 500 });
    }
}

// PATCH — actualiza si existe / inserta si no (respetando que id no es AUTO_INCREMENT)
export async function PATCH(req: Request) {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { key, value } = await req.json();
        if (!key) return NextResponse.json({ error: "Missing key" }, { status: 400 });

        const safeValue = value ?? "";

        // 1. Intentar actualizar la fila si ya existe
        const updateResult = await query(
            "UPDATE site_settings SET setting_value = ? WHERE setting_key = ?",
            [safeValue, key]
        ) as any;

        const affected = updateResult?.affectedRows ?? 0;

        // 2. Si no existía, calcular el próximo id e insertar
        if (affected === 0) {
            const group = getGroup(key);

            // Obtenemos el máximo id actual para asignar el siguiente
            const maxRows = await query(
                "SELECT COALESCE(MAX(id), 0) + 1 AS next_id FROM site_settings"
            ) as any[];
            const nextId = maxRows[0]?.next_id ?? 10;

            await query(
                "INSERT INTO site_settings (id, setting_key, setting_value, setting_group, description) VALUES (?, ?, ?, ?, ?)",
                [nextId, key, safeValue, group, ""]
            );
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("[Settings PATCH] key error:", error?.message || error);
        return NextResponse.json({ error: "Update failed", detail: error?.message }, { status: 500 });
    }
}

// POST — alias de PATCH
export async function POST(req: Request) {
    return PATCH(req);
}
