import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import nodemailer from "nodemailer";

/**
 * POST /api/popup-lead
 * Body: { email, popup_id }
 * - Guarda el lead en popup_leads
 * - Obtiene el popup activo con download_url
 * - Envía email con botón de descarga
 */
export async function POST(req: Request) {
  try {
    const { email, popup_id } = await req.json();

    // Validar email básico
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // Buscar el popup para obtener datos (title, download_url)
    let popupData: any = null;
    if (popup_id) {
      const rows = await query("SELECT * FROM popups WHERE id = ? LIMIT 1", [popup_id]) as any[];
      popupData = rows[0] ?? null;
    }

    // Si no viene popup_id, buscar el activo
    if (!popupData) {
      const rows = await query("SELECT * FROM popups WHERE is_active = 1 LIMIT 1") as any[];
      popupData = rows[0] ?? null;
    }

    const downloadUrl = popupData?.download_url ?? null;
    const popupTitle = popupData?.title ?? "Tu recurso gratuito";

    // Guardar lead en DB
    await query(
      `INSERT INTO popup_leads (email, popup_id, download_url, sent_at, created_at)
             VALUES (?, ?, ?, NOW(), NOW())`,
      [email, popupData?.id ?? null, downloadUrl]
    ).catch(err => {
      // Si la tabla no existe aún o falla, solo logueamos sin romper el flujo
      console.warn("[popup-lead] No se pudo guardar lead en DB:", err?.message);
    });

    // Enviar email si hay download_url y configuración SMTP
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const fromEmail = process.env.SMTP_FROM ?? smtpUser ?? "noreply@lenerstudio.com";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lenerstudio.com";

    if (smtpHost && smtpUser && smtpPass && downloadUrl) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(process.env.SMTP_PORT ?? "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: { user: smtpUser, pass: smtpPass },
      });

      // URL absoluta del archivo
      const fileUrl = downloadUrl.startsWith("http")
        ? downloadUrl
        : `${siteUrl}${downloadUrl}`;

      const fileName = downloadUrl.split("/").pop() ?? "recurso";

      // Si SMTP_FROM ya tiene formato "Nombre <email>", lo usamos directamente,
      // de lo contrario usamos un formato por defecto.
      const sender = process.env.SMTP_FROM || `"Lener Studio" <${smtpUser}>`;

      await transporter.sendMail({
        from: sender,
        to: email,
        subject: `📥 Tu descarga gratuita: ${popupTitle}`,
        html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1d4ed8,#0ea5e9);padding:40px 40px 32px;text-align:center;">
            <h1 style="color:#ffffff;font-size:24px;font-weight:800;margin:0 0 8px;">¡Tu recurso está listo!</h1>
            <p style="color:#bfdbfe;font-size:14px;margin:0;">${popupTitle}</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <p style="color:#374151;font-size:16px;line-height:1.6;margin:0 0 24px;">
              Hola 👋, gracias por tu interés. Aquí tienes el enlace para descargar tu recurso gratuito:
            </p>
            <!-- CTA Button -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding:8px 0 32px;">
                  <a href="${fileUrl}"
                     target="_blank"
                     style="display:inline-block;background:linear-gradient(135deg,#1d4ed8,#0ea5e9);color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;padding:16px 40px;border-radius:12px;letter-spacing:0.3px;">
                    📥 Descargar ahora: ${fileName}
                  </a>
                </td>
              </tr>
            </table>
            <p style="color:#6b7280;font-size:13px;line-height:1.6;border-top:1px solid #e5e7eb;padding-top:20px;margin:0;">
              Si el botón no funciona, copia y pega este enlace en tu navegador:<br>
              <a href="${fileUrl}" style="color:#1d4ed8;word-break:break-all;">${fileUrl}</a>
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:20px 40px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="color:#9ca3af;font-size:12px;margin:0;">
              © ${new Date().getFullYear()} Lener Studio · <a href="${siteUrl}" style="color:#1d4ed8;">lenerstudio.com</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      });
    }

    return NextResponse.json({
      success: true,
      hasFile: !!downloadUrl,
      emailSent: !!(smtpHost && smtpUser && smtpPass && downloadUrl),
    });

  } catch (error: any) {
    console.error("[popup-lead] Error:", error?.message);
    return NextResponse.json({ error: "Error interno", detail: error?.message }, { status: 500 });
  }
}
