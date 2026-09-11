import Link from "next/link";
const articles=[
 ['Understanding GSV and NSV','Measurement','A practical explanation of gross observed, gross standard and net standard volumes.'],
 ['Why sample temperature and flowing temperature are different','Measurement','One corrects the gravity observation. The other corrects the metered volume.'],
 ['How BS&W changes payable volume','Measurement','Why a small percentage can become a meaningful barrel difference over time.'],
 ['Price is only half the contract','Contracts','Measurement basis, deductions, custody transfer and audit rights can materially change the economics.'],
 ['Truck versus pipeline economics','Logistics','Compare destination value against transportation cost and operational constraints.'],
 ['Heat and chemical cost in heavy crude treatment','Separation','Build treatment decisions around saleable barrels and actual cost per barrel.'],
 ['California operator resource map','Regulation','A plain-language directory of agencies, notices and official resources.'],
 ['Where AI actually helps an independent producer','Technology','Production surveillance, reconciliation, paperwork and internal knowledge are often better starting points than flashy automation.']
];
export const metadata={title:"Field Library"};
export default function Page(){return <main className="surface-paper"><section style={{background:'#0b1013',color:'white',padding:'65px 0'}}><div className="container"><div className="kicker">Field Library</div><h1 className="h1">Knowledge is more useful when people can use it.</h1><p className="lead">Plain-language technical, commercial and regulatory references for producers.</p></div></section><section className="section"><div className="container"><div className="grid-2">{articles.map(([title,cat,copy])=><article className="card-light" style={{padding:22}} key={title}><span className="badge">{cat}</span><h2 style={{fontFamily:'Georgia,serif',fontSize:27}}>{title}</h2><p style={{color:'#647078'}}>{copy}</p><Link className="eyebrow" href="/measurement">Open related tools</Link></article>)}</div></div></section></main>}
