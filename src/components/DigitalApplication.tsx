import { useEffect, useRef, useState } from "react";
import type { DigitalPlanSelection } from "@/components/ui/pricing";
import useApplication from "./useApplication";

export default function DigitalApplication({ selection }: { selection?: DigitalPlanSelection }) {
  const [service, setService] = useState("");
  const [option, setOption] = useState("");
  const serviceRef = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    if (!selection) return;
    setService(selection.service);
    setOption(selection.option);
    serviceRef.current?.focus({ preventScroll: true });
  }, [selection]);
  const { submit, pending, status, sent } = useApplication("Kagum Digital application");
  return <form onSubmit={submit} className="mt-8 grid gap-5">
    <label>Full name *<input name="name" required /></label><label>Email *<input name="email" type="email" required /></label><label>Phone *<input name="phone" type="tel" required /></label><label>Address *<input name="address" required /></label>
    <label>Service *<select ref={serviceRef} name="service" value={service} onChange={e => { setService(e.target.value); setOption(""); }} required><option value="" disabled>Select service</option>{["Social Media Management", "Digital Advertising Services", "Content Creation", "Web Development"].map(option => <option key={option}>{option}</option>)}</select></label>
    {service === "Social Media Management" && <label>Package *<select name="package" required value={option} onChange={e => setOption(e.target.value)}><option value="" disabled>Select package</option><option>Bronze — RM 1300</option><option>Silver — RM 1700</option><option>Gold — RM 2100</option></select></label>}
    {service === "Content Creation" && <label>Number of posts *<select name="posts" required value={option} onChange={e => setOption(e.target.value)}><option value="" disabled>Select posting package</option><option>10 posts — RM 600</option><option>20 posts — RM 1100</option><option>30 posts — RM 1500</option></select></label>}
    <label>Additional information<textarea name="message" rows={4} /></label>
    <label className="flex items-start gap-3"><input type="checkbox" name="consent" required className="!w-auto !mt-1" /><span>I agree to share my details for this enquiry.</span></label>
    <button disabled={pending || sent} className="rounded-md bg-brand px-6 py-3 font-bold text-white disabled:opacity-50">{pending ? "Sending…" : sent ? "Application sent" : "Send application"}</button>
    {status && <p role={sent ? "status" : "alert"} className="text-sm">{status}</p>}
  </form>;
}
