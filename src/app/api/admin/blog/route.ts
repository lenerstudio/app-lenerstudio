import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";

// GET — Lista todos los posts (admin: todos; público: solo publicados)
export async function GET(req: Request) {
    const session = await getServerSession();
    const { searchParams } = new URL(req.url);
    const pub = searchParams.get("published");

    try {
        let sql = "SELECT * FROM blog_posts";
        const params: any[] = [];

        if (!session || pub === "1") {
            sql += " WHERE is_published = 1";
        }

        sql += " ORDER BY created_at DESC";
        const posts = await query(sql, params);
        return NextResponse.json(posts);
    } catch (error) {
        console.error("Blog GET error:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

// POST — Crear nuevo post
export async function POST(req: Request) {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { title, excerpt, content, category, image, author, is_published } = body;

        if (!title || !excerpt || !category) {
            return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
        }

        const slug = title
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .trim();

        await query(
            `INSERT INTO blog_posts (title, slug, excerpt, content, category, image, author, is_published)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, slug, excerpt, content || "", category, image || "", author || "Lener Studio", is_published ? 1 : 0]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Blog POST error:", error);
        return NextResponse.json({ error: "Error al crear el post" }, { status: 500 });
    }
}

// PUT — Editar post existente
export async function PUT(req: Request) {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { id, title, excerpt, content, category, image, author, is_published } = body;

        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        const slug = title
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .trim();

        await query(
            `UPDATE blog_posts SET title=?, slug=?, excerpt=?, content=?, category=?, image=?, author=?, is_published=?, updated_at=NOW()
             WHERE id=?`,
            [title, slug, excerpt, content || "", category, image || "", author || "Lener Studio", is_published ? 1 : 0, id]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Blog PUT error:", error);
        return NextResponse.json({ error: "Error al actualizar el post" }, { status: 500 });
    }
}

// PATCH — Toggle is_published
export async function PATCH(req: Request) {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id, is_published } = await req.json();
        await query("UPDATE blog_posts SET is_published=?, updated_at=NOW() WHERE id=?", [is_published ? 1 : 0, id]);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}

// DELETE — Eliminar post
export async function DELETE(req: Request) {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        await query("DELETE FROM blog_posts WHERE id=?", [id]);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}
