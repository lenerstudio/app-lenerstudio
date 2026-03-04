import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";

// GET — Todos los popups (admin) o solo activos (público)
export async function GET(req: Request) {
    const session = await getServerSession();
    const { searchParams } = new URL(req.url);
    const pub = searchParams.get("active");

    try {
        let sql = "SELECT * FROM popups";
        if (!session || pub === "1") {
            sql += " WHERE is_active = 1";
        }
        sql += " ORDER BY created_at DESC";
        const popups = await query(sql);
        return NextResponse.json(popups);
    } catch (error) {
        console.error("Popups GET error:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

// POST — Crear popup
export async function POST(req: Request) {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { title, subtitle, cta_text, cta_url, trigger_type, trigger_delay, is_active } = body;

        if (!title || !cta_text || !cta_url) {
            return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
        }

        await query(
            `INSERT INTO popups (title, subtitle, cta_text, cta_url, trigger_type, trigger_delay, is_active)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, subtitle || "", cta_text, cta_url, trigger_type || "exit_intent", trigger_delay || 0, is_active ? 1 : 0]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Popups POST error:", error);
        return NextResponse.json({ error: "Error al crear popup" }, { status: 500 });
    }
}

// PUT — Editar popup
export async function PUT(req: Request) {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { id, title, subtitle, cta_text, cta_url, trigger_type, trigger_delay, is_active } = body;

        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        await query(
            `UPDATE popups SET title=?, subtitle=?, cta_text=?, cta_url=?, trigger_type=?, trigger_delay=?, is_active=?, updated_at=NOW()
             WHERE id=?`,
            [title, subtitle || "", cta_text, cta_url, trigger_type || "exit_intent", trigger_delay || 0, is_active ? 1 : 0, id]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Popups PUT error:", error);
        return NextResponse.json({ error: "Error al actualizar popup" }, { status: 500 });
    }
}

// PATCH — Toggle is_active
export async function PATCH(req: Request) {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id, is_active } = await req.json();
        await query("UPDATE popups SET is_active=?, updated_at=NOW() WHERE id=?", [is_active ? 1 : 0, id]);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}

// DELETE — Eliminar popup
export async function DELETE(req: Request) {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        await query("DELETE FROM popups WHERE id=?", [id]);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}
