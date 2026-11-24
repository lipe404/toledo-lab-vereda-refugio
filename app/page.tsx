"use client";
import { useState } from "react";

const stays = [{name:"Ninho", caption:"Para acordar com a mata", desc:"Cabana compacta com varanda coberta. Boa para vir a dois e não fazer quase nada.", price:480},{name:"Clareira", caption:"Um pouco mais de espaço", desc:"Cabana com dois quartos, cozinha e um deck para tomar café sem pressa.", price:680},{name:"Mirante", caption:"O horizonte na janela", desc:"Cabana no alto da trilha, com vista aberta e um lugar só para ler.", price:820}] as const;
const brl = (value:number) => new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0}).format(value);
export default function Home(){
 const [stay,setStay]=useState(0),[nights,setNights]=useState(2);
 const selected=stays[stay];
 return <>
  <a className="skip" href="#conteudo">Ir ao conteúdo</a>
  <header><a className="brand" href="#conteudo"><svg viewBox="0 0 40 40" width="38" aria-hidden="true"><path d="m20 3 15 29H5L20 3Zm0 11 8 18M20 14l-8 18M20 14v23" fill="none" stroke="currentColor" strokeWidth="1.8"/></svg> Vereda</a><nav aria-label="Principal"><a href="#cabana">Cabanas</a><a href="#ritmo">O lugar</a><a className="outline" href="#simular">Simular estadia</a></nav></header>
  <main id="conteudo">
   <section className="hero"><div className="hero-copy"><p className="small">Refúgio na natureza • Projeto conceitual</p><h1>Um intervalo<br/><i>entre árvores.</i></h1><p>Cabana, trilha e tempo de sobra para ficar do lado de fora.</p><a className="pill" href="#cabana">Conheça as cabanas</a></div><span aria-hidden="true" className="hero-mark">✳</span></section>
   <section className="intro frame" id="ritmo"><span className="stamp" aria-hidden="true">❋</span><div><p className="small">O ritmo da vereda</p><h2>A mata tem seus horários.<br/>Você pode esquecer os seus.</h2></div><p>Saia cedo para andar, volte para um café e passe a tarde na varanda. O roteiro é simples e pode mudar a qualquer hora.</p></section>
   <section className="frame cabins" id="cabana"><figure><div className="cabin-photo" role="img" aria-label="Exterior de uma casa cercada por vegetação"/><figcaption>Imagem ilustrativa</figcaption></figure><div className="cabin-copy"><p className="small">Escolha seu canto</p><h2>{selected.name}</h2><p className="subtitle">{selected.caption}</p><p>{selected.desc}</p><div role="group" aria-label="Escolher cabana" className="pick">{stays.map((item,index)=><button type="button" key={item.name} aria-pressed={index===stay} onClick={()=>setStay(index)}>{item.name}</button>)}</div></div></section>
   <section className="estimate" id="simular"><div className="frame quote"><div><p className="small">Demonstração interativa</p><h2>Quantos dias<br/>de sossego?</h2><p>Uma ideia de como a simulação de estadia funcionaria. Não há reserva nem cobrança.</p></div><div className="receipt"><label>Cabana<select value={stay} onChange={e=>setStay(Number(e.target.value))}>{stays.map((item,index)=><option key={item.name} value={index}>{item.name}</option>)}</select></label><label>Noites: {nights}<input type="range" min="1" max="7" value={nights} onChange={e=>setNights(Number(e.target.value))}/></label><div className="amount" aria-live="polite"><span>Estimativa ilustrativa</span><strong>{brl(selected.price*nights)}</strong></div></div></div></section>
  </main>
  <footer className="frame"><strong>Vereda Refúgio</strong><p>Projeto conceitual de portfólio. Hospedagem e valores fictícios.</p><a href="https://toledo-felipe.vercel.app/portfolio">Portfólio de Toledo</a></footer>
 </>;
}
