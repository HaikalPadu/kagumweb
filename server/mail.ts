import nodemailer from "nodemailer";
import type { IncomingMessage, ServerResponse } from "node:http";

const attempts = new Map<string, { count: number; until: number }>();
export default async function applications(req: IncomingMessage & { body?: unknown }, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json"); res.setHeader("Cache-Control", "no-store");
  const reply = (code: number, body: object) => { res.statusCode = code; res.end(JSON.stringify(body)); };
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return reply(405, { error: "Method not allowed" }); }
  if (!req.headers["content-type"]?.startsWith("application/json")) return reply(415, { error: "Expected JSON" });
  const origin = req.headers.origin;
  if (origin) { try { if (new URL(origin).host !== req.headers.host) return reply(403, { error: "Invalid origin" }); } catch { return reply(403, { error: "Invalid origin" }); } }
  const ip = req.socket.remoteAddress || "unknown";
  const now = Date.now();
  for (const [key, entry] of attempts) if (entry.until < now) attempts.delete(key);
  const entry = attempts.get(ip) || { count: 0, until: now + 600000 };
  if (++entry.count > 10) return reply(429, { error: "Too many submissions. Please try again later." });
  attempts.set(ip, entry);
  let input: unknown;
  try {
    if (req.body !== undefined) input = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    else { let raw = ""; for await (const part of req) { raw += part; if (Buffer.byteLength(raw) > 20000) return reply(413, { error: "Application is too long" }); } input = JSON.parse(raw); }
  } catch { return reply(400, { error: "Invalid application" }); }
  const data = input as { topic?: unknown; fields?: Record<string, unknown> };
  if (!data || typeof data.topic !== "string" || data.topic.length > 100 || !data.fields || typeof data.fields !== "object" || Array.isArray(data.fields)) return reply(400, { error: "Invalid application" });
  const fields = Object.entries(data.fields);
  if (JSON.stringify(data).length > 20000) return reply(413, { error: "Application is too long" });
  if (!["Career application", "Programme registration", "Kagum Digital application", "Contact enquiry"].includes(data.topic)) return reply(400, { error: "Invalid application type" });
  if (data.topic !== "Contact enquiry" && data.fields.consent !== "on") return reply(400, { error: "Please confirm your consent." });
  if (data.topic === "Career application" && !["Internship", "Part time", "Full time"].includes(String(data.fields.employmentType))) return reply(400, { error: "Please select an employment type." });
  if (data.topic === "Kagum Digital application" && ((data.fields.service === "Social Media Management" && !["Bronze — RM 1300", "Silver — RM 1700", "Gold — RM 2100"].includes(String(data.fields.package))) || (data.fields.service === "Content Creation" && !["10 posts — RM 600", "20 posts — RM 1100", "30 posts — RM 1500"].includes(String(data.fields.posts))))) return reply(400, { error: "Please select a package." });
  if (fields.length > 20 || fields.some(([key, value]) => key.length > 100 || typeof value !== "string" || value.length > 5000)) return reply(400, { error: "Invalid application fields" });
  const email = data.fields.email;
  if (typeof email !== "string" || !/^[^\s@\r\n]+@[^\s@\r\n]+\.[^\s@\r\n]+$/.test(email) || email.length > 254 || typeof data.fields.name !== "string" || !data.fields.name.trim()) return reply(400, { error: "Please provide your name and a valid email address." });
  if (data.fields.website) return reply(400, { error: "Invalid application" });
  const { SMTP_HOST, SMTP_PORT = "587", SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) return reply(503, { error: "Email delivery is not available yet. Please email info@kagum.co directly." });
  const port = Number(SMTP_PORT);
  const transport = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, requireTLS: port !== 465, auth: { user: SMTP_USER, pass: SMTP_PASS }, connectionTimeout: 10000, socketTimeout: 20000, disableFileAccess: true, disableUrlAccess: true });
  try {
    const result = await transport.sendMail({ from: SMTP_FROM, to: "info@kagum.co", replyTo: email, subject: `Kagum website: ${data.topic.replace(/[\r\n]/g, " ")}`, text: fields.filter(([key]) => key !== "website").map(([key, value]) => `${key}: ${value}`).join("\n\n") });
    if (!result.accepted.length) throw new Error("Message rejected");
    return reply(200, { ok: true });
  } catch { return reply(502, { error: "Email could not be sent. Please try again or email info@kagum.co." }); }
  finally { transport.close(); }
}
