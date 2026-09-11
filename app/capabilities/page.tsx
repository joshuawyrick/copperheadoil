import SectionTitle from "@/components/SectionTitle";
import { capabilityData } from "@/lib/seed";
import Link from "next/link";
export const metadata={title:"Capabilities"};
export default function Page(){return <main><section className="section" style={{background:'linear-gradient(180deg,#0a0e11,#151d22)'}}><div className="container"><SectionTitle kicker="Capabilities" title="One operating partner across the barrel." copy="Copperhead combines field operations, measurement, logistics, markets and technology. That matters because the problems rarely stay inside one department." dark/><div className="grid-3">{capabilityData.map(c=><Link className="card" href={`/capabilities/${c.slug}`} key={c.slug} style={{padding:26}}><h2 style={{fontFamily:'Georgia,serif',fontSize:28}}>{c.title}</h2><p className="muted">{c.short}</p><span className="eyebrow">View capability</span></Link>)}</div></div></section></main>}
