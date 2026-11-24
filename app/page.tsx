"use client";
import { useState } from "react";

const stays = [{name:"Ninho", caption:"Para acordar com a mata", desc:"Cabana compacta com varanda coberta. Boa para vir a dois e não fazer quase nada.", price:480,person:"2 pessoas",feature:"Varanda coberta"},{name:"Clareira", caption:"Um pouco mais de espaço", desc:"Cabana com dois quartos, cozinha e um deck para tomar café sem pressa.", price:680,person:"4 pessoas",feature:"Dois quartos"},{name:"Mirante", caption:"O horizonte na janela", desc:"Cabana no alto da trilha, com vista aberta e um lugar só para ler.", price:820,person:"2 pessoas",feature:"Vista aberta"}] as const;
const routes = [
  {name:"Volta da Mata", time:"35 min", length:"1,4 km", level:"Leve", desc:"Caminho curto e sombreado, com uma pausa no banco de madeira ao lado das samambaias."},
  {name:"Campo Aberto", time:"1h10", length:"2,8 km", level:"Moderada", desc:"O caminho sai da sombra e atravessa uma clareira aberta, com trechos de subida suave."},
  {name:"Trilha do Mirante", time:"1h45", length:"4,6 km", level:"Moderada", desc:"Subida contínua até a vista mais alta do refúgio. O retorno segue pelo mesmo percurso."}
] as const;
function MapArt({active}:{active:number}){
 return <svg viewBox="0 0 440 310" role="img" aria-label={`Mapa ilustrativo da rota ${routes[active].name}`} className="trail-map">
  <rect x="0" y="0" width="440" height="310" rx="5" fill="#d9dfbc"/><g fill="none" stroke="#a0a77a" strokeWidth="1.5"><path d="M-19 174C77 212 93 133 157 155s94 61 163 17 104-34 143-27"/><path d="M-10 187c101 42 126-35 174-17s89 63 159 19 105-41 130-29"/><path d="M-16 205c94 48 128-38 179-18s89 63 163 17 111-43 135-29"/><path d="M-10 222c89 48 130-38 177-18s92 60 161 17 105-45 132-31"/><path d="M-14 243c91 46 125-47 180-22s62 63 159 17 108-47 139-36"/><path d="M-17 266c97 41 132-45 184-29s61 64 160 17 108-46 141-40"/><path d="M-16 287c103 39 139-52 184-34s58 67 157 20 122-52 137-44"/><path d="M234 0c16 19 37 20 65 11s54-16 72-7"/><path d="M205 0c18 32 56 44 92 26s76-21 113-1"/><path d="M186 0c17 38 64 66 114 44s85-17 126-4"/></g>
  <path d="M2 68c82 35 135-37 199 2s135 15 184 20 54 21 74 35" fill="none" stroke="#607963" strokeWidth="8" opacity=".45"/>
  <g fill="none" strokeWidth="4.5" strokeLinecap="round" strokeDasharray="8 7">{["M87 234Q108 171 156 181T219 138","M87 234Q158 228 198 197T293 170T361 134","M87 234Q136 125 213 145T276 101T369 57"].map((d,i)=><path key={d} d={d} stroke={i===active?"#273820":"#98a080"} />)}</g><circle cx="87" cy="234" r="7" fill="#273820"/><text x="69" y="260" fill="#273820" fontSize="14" fontFamily="system-ui">Chegada</text><path d="M32 60V28l-6 11m6-11 6 11" fill="none" stroke="#273820" strokeWidth="2"/><text x="27" y="73" fill="#273820" fontSize="13" fontFamily="system-ui">N</text>
 </svg>;
}
const planKey = "vereda-refugio:roteiro:v1";
type Plan = {stay:number; route:number; nights:number};
function parsePlan(raw: string | null): Plan | null {
 if (!raw) return null;
 try {
  const parsed = JSON.parse(raw) as Partial<Plan> | null;
  if (!parsed || typeof parsed.stay!=="number" || typeof parsed.route!=="number" || typeof parsed.nights!=="number") return null;
  const {stay, route, nights} = parsed;
  if (!Number.isInteger(stay) || stay<0 || stay>=stays.length || !Number.isInteger(route) || route<0 || route>=routes.length || !Number.isInteger(nights) || nights<1 || nights>7) return null;
  return {stay,route,nights};
 } catch { return null; }
}
const brl = (value:number) => new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0}).format(value);
export default function Home(){
 const [stay,setStay]=useState(0),[nights,setNights]=useState(2);
 const [route,setRoute]=useState(0);
 const [itinerary,setItinerary]=useState(false);
 const [storageStatus,setStorageStatus]=useState("");
 const selected=stays[stay];
 const selectedRoute=routes[route];
 function keepPlan(){
   try {
     window.localStorage.setItem(planKey, JSON.stringify({stay,route,nights}));
     setStorageStatus("Roteiro guardado neste navegador. Nenhuma reserva foi enviada.");
   } catch { setStorageStatus("O navegador não permitiu guardar a configuração."); }
 }
 function restorePlan(){
   try {
     const stored = parsePlan(window.localStorage.getItem(planKey));
     if (!stored) {setStorageStatus("Não há roteiro guardado neste navegador.");return;}
     setStay(stored.stay);setRoute(stored.route);setNights(stored.nights);
     setItinerary(true);setStorageStatus("Roteiro restaurado.");
   } catch { setStorageStatus("O navegador não permitiu acessar o roteiro."); }
 }
 function forgetPlan(){
   try {window.localStorage.removeItem(planKey);setStorageStatus("A cópia salva neste navegador foi apagada.");}
   catch {setStorageStatus("O navegador não permitiu apagar a cópia.");}
 }
 return <>
  <a className="skip" href="#conteudo">Ir ao conteúdo</a>
  <header><a className="brand brand-masthead" href="#conteudo"><img className="brand-image" src={(process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/brand-lockup.webp"} alt="Vereda Refúgio" width="640" height="160" decoding="async" /></a><nav aria-label="Principal"><a href="#cabana">Cabanas</a><a href="#trilhas">Trilhas</a><a className="outline" href="#simular">Simular estadia</a></nav></header>
  <main id="conteudo" tabIndex={-1}>
   <section className="hero"><div className="hero-copy"><p className="small">Refúgio na natureza • Projeto conceitual</p><h1>Um intervalo<br/><i>entre árvores.</i></h1><p>Escolha uma cabana e uma caminhada no seu ritmo. Veja a estimativa antes de montar o roteiro.</p><div className="hero-actions"><a className="pill" href="#simular">Planejar minha escapada</a><a className="secondary" href="#cabana">Comparar cabanas</a></div><p className="hero-note">1 a 7 noites · Simulação sem cadastro ou pagamento</p></div><span aria-hidden="true" className="hero-mark">✳</span></section>
   <section className="intro frame" id="ritmo"><span className="stamp" aria-hidden="true">❋</span><div><p className="small">O ritmo da vereda</p><h2>A mata tem seus horários.<br/>Você pode esquecer os seus.</h2></div><p>Saia cedo para andar, volte para um café e passe a tarde na varanda. O roteiro é simples e pode mudar a qualquer hora.</p></section>
   <section className="frame cabins" id="cabana"><figure><div className="cabin-photo" role="img" aria-label="Exterior de uma casa cercada por vegetação"/><figcaption>Imagem ilustrativa</figcaption></figure><div className="cabin-copy"><p className="small">Escolha seu canto</p><div className="cabin-live" aria-live="polite"><h2>{selected.name}</h2><p className="subtitle">{selected.caption}</p><p>{selected.desc}</p><ul className="amenities"><li>{selected.person}</li><li>{selected.feature}</li></ul></div><div role="group" aria-label="Escolher cabana" className="pick">{stays.map((item,index)=><button type="button" key={item.name} aria-pressed={index===stay} onClick={()=>{setStay(index);setItinerary(false);}}>{item.name}</button>)}</div></div></section>
   <section className="photo-strip" aria-label="Um dia no refúgio"><figure><div className="day-photo window" role="img" aria-label="Poltrona de fibra iluminada por luz natural"/><figcaption>Comece dentro, sem pressa.</figcaption></figure><figure><div className="day-photo field" role="img" aria-label="Clareira com flores e mata ao fundo"/><figcaption>Depois, procure a luz do lado de fora.</figcaption></figure></section>
   <section className="frame trails" id="trilhas"><div className="trail-copy"><p className="small">Guia de caminhada • Dados ilustrativos</p><h2>Por onde ir.</h2><div className="pick" role="group" aria-label="Trilha">{routes.map((item,index)=><button key={item.name} type="button" aria-pressed={index===route} onClick={()=>{setRoute(index);setItinerary(false);}}>{item.name}</button>)}</div><div aria-live="polite"><h3>{routes[route].name}</h3><ul><li>{routes[route].time}</li><li>{routes[route].length}</li><li>{routes[route].level}</li></ul><p>{routes[route].desc}</p></div></div><figure><MapArt active={route}/><figcaption>Mapa esquemático. As rotas não são reais.</figcaption></figure></section>
   <section className="estimate" id="simular"><div className="frame quote"><div><p className="small">Demonstração interativa</p><h2>Quantos dias<br/>de sossego?</h2><p>Troque a cabana, ajuste as noites e veja o total na hora. A caminhada vem da sua escolha no mapa. Não há reserva nem cobrança.</p></div><div className="receipt"><label>Cabana<select value={stay} onChange={e=>{setStay(Number(e.target.value));setItinerary(false);}}>{stays.map((item,index)=><option key={item.name} value={index}>{item.name}</option>)}</select></label><label>Noites: {nights}<input type="range" min="1" max="7" value={nights} onChange={e=>{setNights(Number(e.target.value));setItinerary(false);}}/></label><div className="nights-presets" role="group" aria-label="Atalhos para a duração">{[{label:"Escapada",n:1},{label:"Fim de semana",n:2},{label:"Uma semana",n:7}].map(({label,n})=><button key={n} type="button" aria-pressed={n===nights} onClick={()=>{setNights(n);setItinerary(false);}}>{label}</button>)}</div><div className="amount" aria-live="polite"><span>Estimativa ilustrativa</span><strong>{brl(selected.price*nights)}</strong></div><button className="plan-button" type="button" aria-expanded={itinerary} aria-controls="vereda-plan" onClick={()=>setItinerary(value=>!value)}>{itinerary?"Ocultar roteiro":"Ver meu roteiro"}</button><div id="vereda-plan" className="trip-plan">{itinerary&&<div><strong>Cabana {selected.name} · {nights} {nights===1?"noite":"noites"}</strong><p>Caminhada sugerida: {selectedRoute.name}, {selectedRoute.time} · {selectedRoute.level.toLowerCase()}.</p><p>Estimativa: {brl(selected.price*nights)}. Nada foi reservado.</p><button className="plan-button" type="button" onClick={keepPlan}>Guardar roteiro neste navegador</button></div>}</div><div className="storage"><p>Se guardar, somente cabana, trilha e noites ficam neste navegador. Nenhum dado é enviado.</p><div><button type="button" className="ghost" onClick={restorePlan}>Recuperar roteiro</button><button type="button" className="ghost" onClick={forgetPlan}>Apagar cópia</button></div><p role="status" className="storage-status">{storageStatus}</p></div><p className="sr-only" role="status">{itinerary?`Roteiro exibido: cabana ${selected.name}, ${nights} ${nights===1?"noite":"noites"}, caminhada ${selectedRoute.name}.`:""}</p></div></div></section>
  </main>
  <footer className="frame"><img className="brand-image brand-footer" src={(process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/brand-lockup.webp"} alt="Vereda Refúgio" width="640" height="160" decoding="async" /><p>Projeto conceitual de portfólio. Hospedagem e valores fictícios.</p><a href="https://toledo-felipe.vercel.app/portfolio">Portfólio de Toledo</a></footer>
 </>;
}
