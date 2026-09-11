import IntelligenceFeed from "@/components/IntelligenceFeed";
import { notFound } from "next/navigation";
const states:Record<string,{name:string,links:{name:string,url:string}[]}>={
 california:{name:'California',links:[{name:'CalGEM Notices to Operators',url:'https://www.conservation.ca.gov/calgem/for_operators/Pages/NoticetoOperator.aspx'},{name:'CalGEM WellSTAR',url:'https://www.conservation.ca.gov/calgem/for_operators/Pages/WellSTAR.aspx'},{name:'CARB Oil & Gas Methane',url:'https://ww2.arb.ca.gov/resources/documents/oil-and-gas-methane-regulation'},{name:'California Legislature',url:'https://leginfo.legislature.ca.gov/'}]},
 texas:{name:'Texas',links:[{name:'Railroad Commission',url:'https://www.rrc.texas.gov/'},{name:'RRC Production Data',url:'https://www.rrc.texas.gov/oil-and-gas/research-and-statistics/production-data/'},{name:'Texas Legislature Online',url:'https://capitol.texas.gov/'}]},
 'new-mexico':{name:'New Mexico',links:[{name:'Oil Conservation Division',url:'https://www.emnrd.nm.gov/ocd/'}]},
 'north-dakota':{name:'North Dakota',links:[{name:'Department of Mineral Resources',url:'https://www.dmr.nd.gov/oilgas/'}]},
 colorado:{name:'Colorado',links:[{name:'Energy & Carbon Management Commission',url:'https://ecmc.state.co.us/'}]},
 oklahoma:{name:'Oklahoma',links:[{name:'Corporation Commission Oil & Gas',url:'https://oklahoma.gov/occ/divisions/oil-gas.html'}]},
 wyoming:{name:'Wyoming',links:[{name:'Oil & Gas Conservation Commission',url:'https://wogcc.wyo.gov/'}]},
 alaska:{name:'Alaska',links:[{name:'AOGCC',url:'https://www.aogcc.alaska.gov/'}]},
 utah:{name:'Utah',links:[{name:'Oil, Gas and Mining',url:'https://ogm.utah.gov/'}]}
};
export async function generateStaticParams(){return Object.keys(states).map(state=>({state}))}
export default async function Page({params}:{params:Promise<{state:string}>}){const {state}=await params;const info=states[state];if(!info)notFound();return <main className="surface-paper"><section style={{background:'#0a0e11',color:'white',padding:'62px 0'}}><div className="container"><div className="kicker">State intelligence</div><h1 className="h1">{info.name} Oil & Gas Intelligence</h1><p className="lead">Regulatory updates, production context, legislation, news and official resources filtered for producer relevance.</p></div></section><section className="section"><div className="container"><div className="grid-3" style={{marginBottom:38}}>{info.links.map(x=><a className="card-light" href={x.url} target="_blank" rel="noreferrer" style={{padding:20}} key={x.name}><span className="badge">Official source</span><h3>{x.name}</h3><span className="eyebrow">Open resource</span></a>)}</div><IntelligenceFeed state={info.name} kind="news"/></div></section></main>}
