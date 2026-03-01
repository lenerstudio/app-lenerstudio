import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
    try {
        const portfolio = await query("SELECT * FROM portfolio WHERE is_published = 1 ORDER BY display_order ASC");
        return NextResponse.json(portfolio);
    } catch (error) {
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
