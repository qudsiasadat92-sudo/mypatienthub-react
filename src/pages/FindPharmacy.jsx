import { useState, useEffect, useRef } from 'react';
import { Marketplace } from '../Hub.jsx';
const pharmacies = [
 ['Shifa Pharmacy','Kabul','Shahr-e-Naw, Kabul','08:00–20:00','shifa'],
 ['Sehat Pharmacy','Charikar','Main bazaar, Charikar, Parwan','08:00–19:00','sehat'],
 ['Sina Pharmacy','Herat','City center, Herat','08:00–20:00','sina'],
 ['Aryana Pharmacy','Mazar-e-Sharif','Rawza Road, Balkh','09:00–20:00','aryana'],
 ['Omid Pharmacy','Jalalabad','City center, Nangarhar','08:00–19:00','omid'],
 ['Rahat Pharmacy','Kandahar','Marwias mena, Kandahar','09:00–19:00','Merwias'],
];
export default function FindPharmacy() {
 const [term,setTerm]=useState(''),[city,setCity]=useState(''),[selected,setSelected]=useState(null),[medicines,setMedicines]=useState(false);
 const dialog=useRef(null);
 useEffect(()=>{if(selected){const previous=document.activeElement;dialog.current?.querySelector("button")?.focus(); const key=e=>{if(e.key==='Escape')setSelected(null);if(e.key==='Tab'){const controls=dialog.current.querySelectorAll('button,a,input');const first=controls[0],last=controls[controls.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}};document.addEventListener('keydown',key);return()=>{document.removeEventListener('keydown',key);previous?.focus()}}},[selected]);
 const rows=pharmacies.filter(p=>p.join(' ').toLowerCase().includes(term.trim().toLowerCase())&&(!city||p[1]===city));
 return <>
 <section className="pharmacy-hero"><span className="eyebrow">HEALTHCARE IN AFGHANISTAN</span><h1>Find a Pharmacy</h1><p>Find medicines and everyday healthcare close to home.</p><div className="pharmacy-search"><label>Pharmacy or neighborhood<input value={term} onChange={e=>setTerm(e.target.value)} placeholder="Search pharmacies..."/></label><label>City<select value={city} onChange={e=>setCity(e.target.value)}><option value="">All cities</option>{pharmacies.map(p=><option key={p[1]}>{p[1]}</option>)}</select></label></div></section>
 <section className="panel"><div className="results-heading"><h2>Pharmacies ({rows.length})</h2><button className="text-button" onClick={()=>{setTerm('');setCity('')}}>CLEAR FILTERS</button></div><p className="photo-credit-note">Academic demo · Sample addresses and opening hours · Illustrative images</p><div className="pharmacy-grid">{rows.map(p=><article className="pharmacy-card" key={p[0]}><img src={'/images/pharmacies/'+p[4]+'-photo.jpg'} alt={'Illustrative pharmacy image for '+p[0]} loading="lazy"/><div className="pharmacy-card-body"><span className="city-pill">{p[1]}</span><h3>{p[0]}</h3><p>{p[2]}</p><p className="hours">Hours: {p[3]}</p><button className="btn" onClick={()=>setSelected(p)}>VIEW DETAILS</button></div></article>)}</div>{!rows.length&&<p className="empty-state" role="status">No pharmacies found. Try another name or city.</p>}</section>
 <section className="panel medicine-toggle"><div><h3>Looking for a medicine?</h3><p>Browse sample products, compare prices and view packaging.</p></div><button className="btn" aria-expanded={medicines} onClick={()=>setMedicines(!medicines)}>{medicines?'HIDE MEDICINES':'BROWSE MEDICINES'}</button></section>{medicines&&<Marketplace type="pharmacy"/>}
 {selected&&<div className="modal-backdrop" onClick={e=>{if(e.target===e.currentTarget)setSelected(null)}}><section ref={dialog} tabIndex={-1} className="modal pharmacy-detail" role="dialog" aria-modal="true" aria-labelledby="pharmacy-title"><img src={'/images/pharmacies/'+selected[4]+'-photo.jpg'} alt="Illustrative pharmacy"/><span className="city-pill">{selected[1]}</span><h2 id="pharmacy-title">{selected[0]}</h2><p>{selected[2]}</p><p>Opening hours: {selected[3]}</p><p>Services: medicines, first-aid supplies and everyday health products.</p><p className="muted-text">This is a sample pharmacy profile for the project demonstration.</p><button className="btn" onClick={()=>{setSelected(null);setMedicines(true)}}>BROWSE MEDICINES</button> <button className="btn muted" onClick={()=>setSelected(null)}>CLOSE</button></section></div>}
 </>;
}
