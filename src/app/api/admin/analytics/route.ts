import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";

export async function GET() {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        // Basic stats aggregation
        const totalLeads: any = await query("SELECT COUNT(*) as count FROM leads");
        const newLeads: any = await query("SELECT COUNT(*) as count FROM leads WHERE status = 'nuevo'");
        const totalViews: any = await query("SELECT COUNT(*) as count FROM analytics_events WHERE event_type = 'page_view'");
        const viewsByDay: any = await query(`
      SELECT DATE(created_at) as date, COUNT(*) as count 
      FROM analytics_events 
      WHERE event_type = 'page_view' 
      GROUP BY DATE(created_at) 
      ORDER BY date DESC LIMIT 7
    `);

        return NextResponse.json({
            summary: {
                totalLeads: totalLeads[0].count,
                newLeads: newLeads[0].count,
                totalViews: totalViews[0].count,
            },
            viewsByDay
        });
    } catch (error) {
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
