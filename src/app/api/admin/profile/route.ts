import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";

/**
 * PUT /api/admin/profile
 * Body: { currentPassword, newPassword }
 * Cambia el password del usuario actualmente logueado.
 */
export async function PUT(req: Request) {
    const session = await getServerSession() as any;
    if (!session?.user?.email) {
        return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    try {
        const { currentPassword, newPassword } = await req.json();

        if (!currentPassword || !newPassword) {
            return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
        }

        if (newPassword.length < 8) {
            return NextResponse.json({ error: "La nueva contraseña debe tener al menos 8 caracteres" }, { status: 400 });
        }

        // Obtener usuario actual
        const users = await query(
            "SELECT * FROM users WHERE email = ? LIMIT 1",
            [session.user.email]
        ) as any[];

        const user = users[0];
        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        }

        // Verificar contraseña actual
        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid) {
            return NextResponse.json({ error: "La contraseña actual es incorrecta" }, { status: 400 });
        }

        // Hashear nueva contraseña
        const hashed = await bcrypt.hash(newPassword, 12);

        // Actualizar en DB
        await query(
            "UPDATE users SET password = ?, updated_at = NOW() WHERE email = ?",
            [hashed, session.user.email]
        );

        return NextResponse.json({ success: true, message: "Contraseña actualizada correctamente" });

    } catch (error: any) {
        console.error("[profile] PUT error:", error?.message);
        return NextResponse.json({ error: "Error interno al actualizar contraseña" }, { status: 500 });
    }
}
