"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  ["Capabilities","/capabilities"],
  ["M.A.R.G.I.N.","/margin"],
  ["AI & Automation","/ai-automation"],
  ["Producer Desk","/producer-desk"],
  ["Intelligence","/intelligence"],
  ["About","/about"],
] as const;

export default function Header(){
  const [open,setOpen]=useState(false);
  return <header className="site-header">
    <style jsx>{`
      .site-header{position:sticky;top:0;z-index:50;background:rgba(6,9,11,.94);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.08)}
      .row{height:78px;display:flex;align-items:center;gap:28px}.brand{width:285px;max-width:38vw}.brand img{width:100%;height:auto;filter:drop-shadow(0 2px 4px rgba(0,0,0,.35))}.nav{display:flex;align-items:center;gap:19px;margin-left:auto;font-size:.79rem;font-weight:750}.nav a{color:#d9dee1}.nav a:hover{color:#f2b84b}.menu{display:none;margin-left:auto;background:none;color:white;border:0;padding:8px}.mobile{display:none}
      @media(max-width:980px){.brand{width:245px;max-width:70vw}.nav{display:none}.menu{display:block}.mobile{display:${open?'grid':'none'};position:absolute;top:78px;left:0;right:0;background:#080c0f;border-bottom:1px solid #30383d;padding:18px 20px;gap:6px}.mobile a{padding:12px 8px;border-bottom:1px solid #20282d;font-weight:800}}
      @media(max-width:520px){.row{height:68px}.mobile{top:68px}.brand{width:225px}}
    `}</style>
    <div className="container row">
      <Link className="brand" href="/" aria-label="Copperhead Oil Field Services home"><img src="/brand/copperhead-logo-transparent.png" alt="Copperhead Oil Field Services" /></Link>
      <nav className="nav">{nav.map(([n,h])=><Link key={h} href={h}>{n}</Link>)}<Link className="btn btn-primary" href="/contact">Contact</Link></nav>
      <button className="menu" aria-label="Toggle menu" onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</button>
      <nav className="mobile">{nav.map(([n,h])=><Link key={h} href={h} onClick={()=>setOpen(false)}>{n}</Link>)}<Link href="/dashboard" onClick={()=>setOpen(false)}>Producer Account</Link><Link href="/contact" onClick={()=>setOpen(false)}>Contact Copperhead</Link></nav>
    </div>
  </header>
}
