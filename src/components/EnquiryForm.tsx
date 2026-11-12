import useApplication from "./useApplication";
import { FormGraphic } from "./SectionGraphics";
import { courseTracks } from "@/src/data/content";

type Draft = { name: string; email: string; phone: string; topic: string; message: string };
export function readDraft(): Draft | null {
  try { const raw = sessionStorage.getItem("kagum-contact-draft"); return raw ? JSON.parse(raw) : null; } catch { return null; }
}
export default function EnquiryForm({ kind }: { kind: "career" | "programme" }) {
  const career = kind === "career";
  const options = career ? ["Software Engineering", "Digital Marketing", "Administration"] : Object.values(courseTracks).flat();
  const { submit, pending, status, sent } = useApplication(career ? "Career application" : "Programme registration");
  return <form onSubmit={submit} className="form-panel mx-auto max-w-3xl rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-10">
    <FormGraphic kind={kind} />
    <h2 className="heading text-3xl">{career ? "Apply for a position" : "Register your interest"}</h2>
    <p className="mt-4 leading-relaxed text-slate-600">{career ? "Applications open in December 2026. Prepare your application below." : "Select a programme and share your preferred dates. Our team will confirm availability."} Submit this form to send your application directly to info@kagum.co.</p>
    <div className="mt-8 grid gap-5 sm:grid-cols-2"><label>Full name *<input name="name" required autoComplete="name" /></label><label>Email *<input name="email" type="email" required autoComplete="email" /></label><label>Phone *<input name="phone" type="tel" required autoComplete="tel" /></label><label>{career ? "Position" : "Programme"} *<select name="selection" required defaultValue=""><option value="" disabled>Select an option</option>{options.map(option => <option key={option}>{option}</option>)}</select></label></div>
    {career && <label className="mt-5">Employment type *<select name="employmentType" required defaultValue=""><option value="" disabled>Select employment type</option><option>Internship</option><option>Part time</option><option>Full time</option></select></label>}
    <label className="mt-5">{career ? "CV / portfolio URL *" : "Organisation / preferred dates *"}<input name="details" type={career ? "url" : "text"} required placeholder={career ? "https://…" : "Your team and preferred schedule"} /></label>
    <label className="mt-5">Additional information<textarea name="message" rows={4} /></label>
    <label className="mt-5 flex items-start gap-3"><input name="consent" type="checkbox" required className="!mt-1 !w-auto" /><span>I agree to share these details with Kagum Advance Group for this enquiry.</span></label>
    {status && <p role={sent ? "status" : "alert"} className="mt-4">{status}</p>}
    <button disabled={pending || sent} className="disabled:opacity-50 mt-7 rounded-md bg-brand px-6 py-4 font-bold text-white" type="submit">{pending ? "Sending…" : sent ? "Application sent" : "Send application"}</button>
  </form>;
}
