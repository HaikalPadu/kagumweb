import { BookOpen, BriefcaseBusiness, ChartNoAxesCombined, CircuitBoard, Code2, Cpu, GraduationCap, Mail, Megaphone, Monitor, ShieldCheck, Truck, UsersRound } from "lucide-react";
import "./section-graphics.css";

const trackIcons = [ChartNoAxesCombined, UsersRound, Code2, Megaphone, Monitor, Truck, CircuitBoard, ShieldCheck, Cpu];

export function ProgrammeGraphic({ index }: { index: number }) {
  const Icon = trackIcons[index % trackIcons.length] ?? BookOpen;
  return <div className="programme-graphic" aria-hidden="true">
    <span className="programme-icon"><Icon size={29} strokeWidth={1.6} /></span>
    <span className="programme-lines"><i /><i /><i /></span>
    <span className="programme-number">{String(index + 1).padStart(2, "0")}</span>
  </div>;
}

export function FormGraphic({ kind = "contact" }: { kind?: "contact" | "career" | "programme" | "digital" }) {
  const Icon = kind === "career" ? BriefcaseBusiness : kind === "programme" ? GraduationCap : kind === "digital" ? Monitor : Mail;
  return <div className="form-graphic" aria-hidden="true">
    <span className="form-graphic-icon"><Icon size={29} strokeWidth={1.6} /></span>
    <span className="form-graphic-line" />
    <span className="form-graphic-seal"><ShieldCheck size={21} strokeWidth={1.5} /></span>
    <span className="form-graphic-dots" />
  </div>;
}
