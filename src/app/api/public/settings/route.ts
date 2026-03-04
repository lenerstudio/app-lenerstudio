import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET /api/public/settings
export async function GET() {
    try {
        const rows = await query("SELECT setting_key, setting_value FROM site_settings") as any[];

        // Convertir de array de objetos a un objeto clave-valor simple
        const settings = rows.reduce((acc, row) => ({
            ...acc,
            [row.setting_key]: row.setting_value
        }), {});

        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
    }
}
