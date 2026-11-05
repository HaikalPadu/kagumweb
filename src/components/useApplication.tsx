import { useState, useRef, type FormEvent } from "react";

export default function useApplication(topic: string) {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");
  const [sent, setSent] = useState(false);
  const busy = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    busy.current = true; setPending(true); setStatus(""); setSent(false);
    const fields = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch("/api/applications", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ topic, fields }), signal: AbortSignal.timeout(30000) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) throw new Error(data.error || "Unable to send. Please try again or email info@kagum.co.");
      setSent(true); setStatus("Your application has been sent to info@kagum.co. Thank you.");
    } catch (error) { setStatus(error instanceof Error ? error.message : "Unable to send. Please try again."); }
    finally { busy.current = false; setPending(false); }
  }
  return { submit, pending, status, sent };
}
