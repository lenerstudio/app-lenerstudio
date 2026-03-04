import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";

// GET — Todos los planes (admin) o solo publicados (público)
export async function GET(req: Request) {
    const session = await getServerSession();
    const { searchParams } = new URL(req.url);
    const pub = searchParams.get("published");

    try {
        let sql = "SELECT * FROM pricing_plans";
        if (!session || pub === "1") {
            sql += " WHERE is_published = 1";
        }
        sql += " ORDER BY display_order ASC";
        const plans = await query(sql);

        // Parsear features JSON
        const parsed = (plans as any[]).map((p: any) => ({
            ...p,
            features: (() => {
                try { return JSON.parse(p.features || "[]"); }
                catch { return []; }
            })(),
        }));

        return NextResponse.json(parsed);
    } catch (error) {
        console.error("Pricing GET error:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

// POST — Crear plan
export async function POST(req: Request) {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { name, description, price, features, cta_text, cta_url, is_popular, is_published, display_order } = body;

        if (!name || !price) {
            return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
        }

        await query(
            `INSERT INTO pricing_plans (name, description, price, features, cta_text, cta_url, is_popular, is_published, display_order)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name,
                description || "",
                price,
                JSON.stringify(Array.isArray(features) ? features : []),
                cta_text || "Contratar",
                cta_url || "/#contacto",
                is_popular ? 1 : 0,
                is_published ? 1 : 0,
                display_order || 0,
            ]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Pricing POST error:", error);
        return NextResponse.json({ error: "Error al crear plan" }, { status: 500 });
    }
}

// PUT — Editar plan
export async function PUT(req: Request) {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { id, name, description, price, features, cta_text, cta_url, is_popular, is_published, display_order } = body;

        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        await query(
            `UPDATE pricing_plans SET name=?, description=?, price=?, features=?, cta_text=?, cta_url=?,
             is_popular=?, is_published=?, display_order=?, updated_at=NOW() WHERE id=?`,
            [
                name,
                description || "",
                price,
                JSON.stringify(Array.isArray(features) ? features : []),
                cta_text || "Contratar",
                cta_url || "/#contacto",
                is_popular ? 1 : 0,
                is_published ? 1 : 0,
                display_order || 0,
                id,
            ]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Pricing PUT error:", error);
        return NextResponse.json({ error: "Error al actualizar plan" }, { status: 500 });
    }
}

// PATCH — Toggle is_published
export async function PATCH(req: Request) {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id, is_published } = await req.json();
        await query("UPDATE pricing_plans SET is_published=?, updated_at=NOW() WHERE id=?", [is_published ? 1 : 0, id]);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}

// DELETE — Eliminar plan
export async function DELETE(req: Request) {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        await query("DELETE FROM pricing_plans WHERE id=?", [id]);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}
