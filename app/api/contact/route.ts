import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const DESTINATAIRES = (process.env.CONTACT_TO ?? "lacap95@free.fr").split(",").map((e) => e.trim());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

function buildHtml(data: Record<string, string>): string {
  const rows = Object.entries(data)
    .filter(([k]) => k !== "sujet")
    .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:600;color:#555;white-space:nowrap">${k}</td><td style="padding:6px 12px">${v || "—"}</td></tr>`)
    .join("");
  return `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
  <h2 style="color:#c0392b;margin-bottom:4px">${data.sujet ?? "Message ACAP"}</h2>
  <p style="color:#888;font-size:0.875rem;margin-bottom:20px">Reçu via le site acap-cote-coulisse</p>
  <table style="width:100%;border-collapse:collapse;background:#fafafa;border-radius:8px;overflow:hidden">
    <tbody>${rows}</tbody>
  </table>
</div>`;
}

export async function POST(req: NextRequest) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return NextResponse.json({ error: "Configuration email manquante" }, { status: 500 });
  }

  let data: Record<string, string>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  const sujet = data.sujet ?? "Message de contact";

  try {
    await transporter.sendMail({
      from: `"Site ACAP" <${process.env.GMAIL_USER}>`,
      to: DESTINATAIRES,
      subject: `[ACAP] ${sujet}`,
      html: buildHtml(data),
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur envoi email:", err);
    return NextResponse.json({ error: "Échec envoi email" }, { status: 500 });
  }
}
