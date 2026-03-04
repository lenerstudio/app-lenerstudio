import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";

// GET — Lista todos los popup leads (solo admin)
export async function GET() {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const leads = await query(
            `SELECT pl.*, p.title as popup_title
             FROM popup_leads pl
             LEFT JOIN popups p ON pl.popup_id = p.id
             ORDER BY pl.created_at DESC`
        );
        return NextResponse.json(leads);
    } catch (error: any) {
        console.error("[popup-leads] GET error:", error?.message);
        // Si la tabla no existe todavía, devolver array vacío en vez de error
        return NextResponse.json([]);
    }
}

// DELETE — Eliminar un lead
export async function DELETE(req: Request) {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        await query("DELETE FROM popup_leads WHERE id = ?", [id]);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: "Delete failed", detail: error?.message }, { status: 500 });
    }
}
