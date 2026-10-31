import { useRoute } from "@/src/router";
import Layout from "@/src/components/Layout";
import Home from "@/src/pages/Home";
import { NotFound, ServiceDetail, Services } from "@/src/pages/Services";
import Training from "@/src/pages/Training";
import About from "@/src/pages/About";
import Career from "@/src/pages/Career";
import Contact from "@/src/pages/Contact";

function Page({ path }: { path: string }) {
  if (path === "/") return <Home />;
  if (path === "/services") return <Services />;
  if (path.startsWith("/services/")) return <ServiceDetail id={path.slice(10)} />;
  if (path === "/training") return <Training />;
  if (path === "/about") return <About />;
  if (path === "/career") return <Career />;
  if (path === "/contact") return <Contact />;
  return <NotFound />;
}

export default function App() {
  const path = useRoute();
  return <Layout path={path}><div key={path} className="fade-in"><Page path={path} /></div></Layout>;
}
