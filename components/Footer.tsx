import Link from "next/link";
import { margin, site } from "@/lib/site";
export default function Footer(){return <footer style={{background:'#050709',borderTop:'1px solid rgba(255,255,255,.1)'}}>
  <div className="container section-sm">
    <div className="grid-3" style={{alignItems:'start'}}>
      <div><img src="/brand/copperhead-logo-transparent.png" alt="Copperhead Oil Field Services" style={{width:330,maxWidth:'100%'}}/><p className="muted" style={{maxWidth:430}}>Independent producers. Real solutions. Practical technology. A stronger tomorrow.</p></div>
      <div><div className="kicker">Protect the M.A.R.G.I.N.</div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px 18px',marginTop:14}}>{margin.map(x=><span key={x.letter} style={{fontSize:13}}><b className="copper">{x.letter}</b> {x.word}</span>)}</div></div>
      <div><div className="kicker">Copperhead</div><div style={{display:'grid',gap:8,marginTop:14,fontSize:14}}><Link href="/producer-desk">Producer Desk</Link><Link href="/measurement">Measurement Workbench</Link><Link href="/contract-intelligence">Contract Intelligence</Link><Link href="/intelligence">Industry Intelligence</Link><a href={`mailto:${site.email}`}>{site.email}</a></div></div>
    </div>
    <div className="rule" style={{margin:'38px 0 20px'}}/>
    <div style={{display:'flex',gap:18,justifyContent:'space-between',flexWrap:'wrap',fontSize:12,color:'#7f8b93'}}><span>© {new Date().getFullYear()} Copperhead Oil Field Services. All rights reserved.</span><span>Technical tools are informational and should be verified for the applicable custody transfer, contract and regulatory requirements.</span></div>
  </div>
</footer>}
