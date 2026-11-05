import CardDeckCarousel from "@/components/ui/card-deck-carousel";
import { Container, SectionTitle } from "./ui-kit";
import { useReducedMotion } from "motion/react";

const slides = ["KagumPhotoshootDay-16.jpg", "KagumPhotoshootDay-36.jpg", "KagumPhotoshootDay-333.jpg", "KagumPhotoshootDay-372.jpg", "KagumPhotoshootDay-385.jpg"].map((file, i) => ({ image: `/assets/stackcardimage/${file}`, title: "Our Team", caption: `Kagum Advance Group · ${i + 1} / 5`, alt: "Kagum Advance Group team photoshoot" }));
export default function Team() {
  const reduced = useReducedMotion();
  return <section className="bg-slate-50 py-20"><Container><SectionTitle center eyebrow="The people behind Kagum" title="Our Team" /><CardDeckCarousel height={600} cardWidth="min(86vw, 760px)" aspect="16 / 9" scatter={5} autoplay={reduced ? 0 : 5000} background="transparent" slides={slides} ariaLabel="Our Team photo card deck" /></Container></section>;
}
