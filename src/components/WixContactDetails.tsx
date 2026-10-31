import { Container } from "./ui-kit";

export default function WixContactDetails() {
  return <section className="bg-slate-50 py-20"><Container className="grid gap-10 md:grid-cols-3">
    <div><h2 className="heading text-2xl">CONTACT US</h2><div className="mt-5 grid gap-2"><a href="mailto:info@kagum.co">info@kagum.co</a><a href="tel:+601139699786">011-3969 9786</a></div></div>
    <div><h2 className="heading text-2xl">VISIT US</h2><p className="mt-5 leading-relaxed">No. 34-01,Jalan Pulai Makmur 5/1,<br />Bandar Baru Kangkar Pulai<br />81300 Kangkar Pulai,<br />Johor Bahru, Johor.</p></div>
    <div><h2 className="heading text-2xl">OUR BRANCH</h2><p className="mt-5 leading-relaxed">J 8837 Batu 15, Sungai Renggei, 77300 Merlimau, Melaka.</p></div>
  </Container></section>;
}
