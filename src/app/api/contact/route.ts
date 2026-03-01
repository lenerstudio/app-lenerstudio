import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { nombre, email, telefono, tipoNegocio, mensaje, source_url } = body;

        if (!nombre || !email || !mensaje) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Insert into leads table
        await query(
            "INSERT INTO leads (name, email, phone, business_name, service_type, message, status, source_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [nombre, email, telefono || null, tipoNegocio || null, 'landing_page', mensaje, 'nuevo', source_url || '/']
        );

        // Record analytics event
        await query(
            "INSERT INTO analytics_events (event_type, page_path) VALUES (?, ?)",
            ['form_submit', source_url || '/']
        );

        return NextResponse.json({ success: true, message: "Lead saved successfully" });
    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json({ error: "External server error" }, { status: 500 });
    }
}
