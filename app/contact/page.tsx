import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";
export const metadata={title:"Contact"};
export default function Page(){return <main><section className="section" style={{background:'linear-gradient(145deg,#070a0c,#182126)'}}><div className="container"><div className="grid-2" style={{alignItems:'start'}}><div><div className="kicker">Talk to Copperhead</div><h1 className="h1">Bring us the problem.</h1><p className="lead">Measurement, logistics, market access, operations, software, automation or a process that simply takes too much time. Tell us what is happening.</p><div className="callout" style={{marginTop:26}}><b>{site.email}</b><div className="muted">Primary contact for CopperheadOil.com</div></div></div><ContactForm/></div></div></section></main>}
