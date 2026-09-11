import Link from "next/link";
import { Calculator, FileSearch, BookOpen, Landmark, Newspaper, Banknote, Bot, Scale } from "lucide-react";
const cards=[
 [Calculator,'Measurement Workbench','LACT, truck weight, ticket checks and temperature sensitivity.','/measurement'],
 [FileSearch,'Contract Intelligence','Upload petroleum contracts for technical and commercial issue spotting.','/contract-intelligence'],
 [Scale,'Operator Calculators','Measurement variance, treatment economics, transportation and margin tools.','/measurement'],
 [Landmark,'California Operator Desk','Official agencies, rules, notices and regulatory resources.','/intelligence/california'],
 [Newspaper,'Industry Intelligence','Markets, state news, legislation, regulation and producer context.','/intelligence'],
 [Bot,'Technology Radar','Separation, H2S, corrosion, produced water, sensors and AI.','/intelligence/technology'],
 [Banknote,'Funding & Opportunities','Grants, training, commercialization and open funding opportunities.','/intelligence/funding'],
 [BookOpen,'Field Library','Plain-language technical and commercial reference material.','/library']
] as const;
export const metadata={title:"Producer Desk"};
export default function Page(){return <main><section className="section photo-overlay" style={{backgroundImage:'url(https://upload.wikimedia.org/wikipedia/commons/d/d6/Pumpjacks.JPG)',backgroundSize:'cover',backgroundPosition:'center'}}><div className="container"><div style={{maxWidth:760}}><div className="kicker">Producer Desk</div><h1 className="h1">Tools. Knowledge. Resources. No enterprise price tag.</h1><p className="lead">Practical help for measurement, contracts, regulation, technology and day-to-day operating decisions.</p></div></div></section><section className="section" style={{background:'#090d10'}}><div className="container"><div className="grid-4">{cards.map(([Icon,t,c,h])=><Link className="card" href={h} key={t} style={{padding:22}}><Icon color="#efb346"/><h3>{t}</h3><p className="muted" style={{fontSize:14}}>{c}</p><span className="eyebrow">Open</span></Link>)}</div></div></section></main>}
