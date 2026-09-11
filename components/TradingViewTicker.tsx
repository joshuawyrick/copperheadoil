"use client";
import { useEffect, useRef } from "react";
export default function TradingViewTicker(){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(!ref.current || ref.current.dataset.loaded) return;
  ref.current.dataset.loaded="1";
  const s=document.createElement('script');
  s.src='https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';s.async=true;
  s.innerHTML=JSON.stringify({symbols:[
    {proName:'TVC:USOIL',title:'WTI Crude'},{proName:'TVC:UKOIL',title:'Brent Crude'},{proName:'NYMEX:NG1!',title:'Natural Gas'},{proName:'NYMEX:RB1!',title:'RBOB Gasoline'},{proName:'NYMEX:HO1!',title:'Heating Oil'}
  ],showSymbolLogo:false,isTransparent:true,displayMode:'adaptive',colorTheme:'dark',locale:'en'});
  ref.current.appendChild(s);
 },[]);
 return <div style={{background:'#080c0f',borderTop:'1px solid #222a2f',borderBottom:'1px solid #222a2f'}}><div ref={ref} className="tradingview-widget-container"><div className="tradingview-widget-container__widget" /></div></div>
}
