import { NextResponse } from "next/server";
export async function POST(req:Request){
  const body=await req.json().catch(()=>null);
  if(!body?.email||!body?.message) return NextResponse.json({error:'Email and message are required.'},{status:400});
  const to=process.env.CONTACT_TO_EMAIL||'info@copperheadoil.com';
  const key=process.env.RESEND_API_KEY;
  if(key){
    const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.CONTACT_FROM_EMAIL||'website@copperheadoil.com',to:[to],reply_to:body.email,subject:`Copperhead website inquiry: ${body.topic||'General'}`,text:`Name: ${body.name||''}\nCompany: ${body.company||''}\nEmail: ${body.email}\nPhone: ${body.phone||''}\nTopic: ${body.topic||''}\n\n${body.message}`})});
    if(!r.ok) return NextResponse.json({error:'Email service rejected the message.'},{status:502});
  } else {
    console.log('Copperhead contact form preview',body);
  }
  return NextResponse.json({ok:true,mode:key?'email':'preview'});
}
