(() => {
"use strict";
const KEY="unser-zuhause-v2";
const E={mini:["🫧",8],small:["🌱",18],medium:["🧹",30],large:["💪",55],huge:["🔥",75],mighty:["🪟",110]};
const $=id=>document.getElementById(id);
const iso=d=>{const x=new Date(d);x.setHours(12,0,0,0);return x.toISOString().slice(0,10)};
const today=()=>iso(new Date());
const add=(s,n)=>{const d=new Date(s+"T12:00:00");d.setDate(d.getDate()+n);return iso(d)};
const day=s=>new Date(s+"T12:00:00").getDay();
const fmt=s=>new Intl.DateTimeFormat("de-AT",{day:"2-digit",month:"2-digit",year:"numeric"}).format(new Date(s+"T12:00:00"));
const monthName=(y,m)=>new Intl.DateTimeFormat("de-AT",{month:"long",year:"numeric"}).format(new Date(y,m,1));
const uid=()=>("id-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2));
function safeLoad(){try{return JSON.parse(localStorage.getItem(KEY)||"null")}catch(e){return null}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){}}
function seed(){
 const t=today();
 const data=[
 ["Bett machen","OG","Schlafzimmer","Basisroutine","mini",1,t,false],
 ["Schlafzimmer lüften","OG","Schlafzimmer","Basisroutine","mini",1,t,false],
 ["Kleidung wegräumen","OG","Schlafzimmer","Basisroutine","mini",1,t,false],
 ["Geschirrspüler ausräumen","EG","Küche","Basisroutine","mini",1,t,false],
 ["Küchenarbeitsflächen abwischen","EG","Küche","Basisroutine","mini",1,t,false],
 ["Esstisch abwischen","EG","Essbereich","Basisroutine","mini",1,t,false],
 ["Baby-Hochstuhl/Essbereich reinigen","EG","Essbereich","Basisroutine","mini",1,t,false],
 ["Geschirrspüler beladen/starten","EG","Küche","Basisroutine","mini",1,t,false],
 ["Herd abwischen","EG","Küche","Basisroutine","mini",1,t,false],
 ["Spüle/Armatur reinigen","EG","Küche","Basisroutine","mini",1,t,false],
 ["Wohnzimmer grob zurücksetzen","EG","Wohnzimmer","Basisroutine","mini",1,t,false],
 ["WC + Waschbecken reinigen","EG","Gäste-WC","Sanitärräume","small",7,t,true,2],
 ["Bad + WC reinigen","OG","Bad","Sanitärräume","medium",7,t,true,2],
 ["Kinderbad reinigen","OG","Kinderbad","Sanitärräume","medium",7,t,true,2],
 ["Böden EG saugen","EG","EG","Böden","medium",7,add(t,1),false],
 ["Böden OG saugen","OG","Flur OG","Böden","medium",7,add(t,2),false],
 ["Küche gründlich reinigen","EG","Küche","Küche","medium",14,add(t,3),false],
 ["Waschküche: Oberflächen + Boden saugen","KG","Waschküche","Waschküche","medium",7,add(t,4),false],
 ["Eingang + Garderobe + Flur reinigen","EG","Eingangsbereich","EG-Nebenräume","medium",28,add(t,7),false],
 ["Büro + Abstellraum + Speis reinigen","EG","Büro","EG-Nebenräume","medium",28,add(t,11),false],
 ["Musikzimmer reinigen","KG","Musikzimmer","Keller-Rotation","medium",35,add(t,5),false],
 ["Trainingsraum reinigen","KG","Trainingsraum","Keller-Rotation","medium",35,add(t,17),false],
 ["Technikraum reinigen","KG","Technikraum","Keller-Rotation","medium",35,add(t,29),false],
 ["Lagerraum reinigen","KG","Lagerraum","Keller-Rotation","medium",35,add(t,41),false],
 ["Flur KG reinigen","KG","Flur KG","Keller-Rotation","medium",35,add(t,53),false],
 ["Türklinken abwischen","Haus","Alle Räume","Detailpflege","small",30,add(t,8),false],
 ["Lichtschalter außen abwischen","Haus","Alle Räume","Detailpflege","small",30,add(t,15),false],
 ["Decken-/Wandecken reinigen","Haus","Alle Räume","Detailpflege","medium",30,add(t,22),false],
 ["Türrahmen/Zargen reinigen","Haus","Alle Räume","Detailpflege","large",90,add(t,25),false],
 ["Türblätter reinigen","Haus","Alle Räume","Detailpflege","large",90,add(t,55),false],
 ["Sockelleisten reinigen","Haus","Alle Räume","Detailpflege","large",90,add(t,85),false],
 ["Kühlschrank prüfen/reinigen","EG","Küche","Geräte","medium",30,add(t,6),false],
 ["Backofen gründlich reinigen","EG","Küche","Geräte","large",90,add(t,18),false],
 ["Geschirrspüler Filter/Dichtung","EG","Küche","Geräte","small",30,add(t,26),false],
 ["Waschmaschine Schublade/Dichtung","KG","Waschküche","Geräte","small",30,add(t,32),false],
 ["Kaffeemaschine entkalken","EG","Küche","Geräte","medium",180,add(t,45),false],
 ["Matratzen gründlich pflegen","OG","Schlafzimmer","Textilien","large",180,add(t,60),false],
 ["Raffstores reinigen","Haus","Außenbereiche","Saisonpflege","mighty",365,add(t,50),false],
 ["Große Fensteretappe – EG Wohnzimmer","EG","Wohnzimmer","Fenster Herbst","mighty",180,add(t,2),false,"09-01","10-31"],
 ["Fensteretappe – EG Küche + Speis","EG","Küche","Fenster Herbst","huge",180,add(t,8),false,"09-01","10-31"],
 ["Fensteretappe – OG Schlafzimmer + Ankleide","OG","Schlafzimmer","Fenster Herbst","huge",180,add(t,14),false,"09-01","10-31"],
 ["Riesiges Stiegenhausfenster","Haus","Stiegenhaus","Fenster Herbst","mighty",180,add(t,20),false,"09-01","10-31"],
 ["Kaminumfeld reinigen","EG","Wohnzimmer","Kamin","small",14,add(t,4),false]
 ];
 return {tasks:data.map(x=>({id:uid(),name:x[0],floor:x[1],room:x[2],category:x[3],effort:x[4],interval:x[5],due:x[6],fixed:!!x[7],weekday:x[8]??null,seasonal:!!x[9],seasonStart:x[9]||null,seasonEnd:x[10]||null,history:[],description:""})),settings:{baby:false,energy:false},meTime:[]};
}
let state=safeLoad()||seed(), view="today", selected=today(), cal=new Date();
function minutes(t){return t.minutes||E[t.effort]?.[1]||20}
function seasonOK(t,d){if(!t.seasonal)return true;const md=d.slice(5);return md>=t.seasonStart&&md<=t.seasonEnd}
function score(t,d){const overdue=Math.max(0,Math.round((new Date(d)-new Date(t.due))/86400000));return overdue*6+(180/(t.interval||30))+(t.fixed?35:0)+(t.seasonal?8:0)}
function dueCandidate(t,d){
 if(!seasonOK(t,d))return false;
 if(t.fixed && t.weekday!==null)return day(d)===Number(t.weekday);
 const diff=Math.round((new Date(d)-new Date(t.due))/86400000);
 return diff>=-10&&diff<=10;
}
function plan(d){
 if(day(d)===0 && !state.settings.energy)return [];
 const cap=state.settings.baby?65:110;
 let list=state.tasks.filter(t=>dueCandidate(t,d)).sort((a,b)=>score(b,d)-score(a,d));
 const chosen=[], used=0;
 // fixed tasks first
 for(const t of list.filter(x=>x.fixed)) chosen.push(t);
 let total=chosen.reduce((n,t)=>n+minutes(t),0);
 // a mighty task fills the day
 const mighty=list.find(t=>t.effort==="mighty"&&!chosen.includes(t));
 if(mighty && total===0){chosen.push(mighty);total+=minutes(mighty)}
 else for(const t of list.filter(x=>!chosen.includes(x))){
   if(total+minutes(t)>cap)continue;
   if(chosen.some(x=>x.effort==="mighty"))continue;
   const big=t.effort==="large"||t.effort==="huge";
   const bigCount=chosen.filter(x=>x.effort==="large"||x.effort==="huge").length;
   if(big&&bigCount>=1)continue;
   if(chosen.filter(x=>x.room===t.room).length>=1 && !t.category.includes("Basis"))continue;
   chosen.push(t);total+=minutes(t);
 }
 if(state.settings.energy){
   for(const t of list.filter(x=>!chosen.includes(x)).slice(0,3)){
     if(total+minutes(t)<=Math.min(140,cap+30)){chosen.push(t);total+=minutes(t)}
   }
 }
 return chosen;
}
function icon(t){return E[t.effort]?.[0]||"🧹"}
function taskCard(t,d){
 const done=t.history.some(h=>h.type==="done"&&h.date===d);
 return `<article class="task ${done?"done":""}" data-task="${t.id}" data-date="${d}">
 <div class="badge">${icon(t)}</div><div class="body"><h3>${t.name}</h3><p>${t.floor} · ${t.room} · ${t.category}</p></div><span class="mins">${minutes(t)} Min.</span></article>`;
}
function render(){
 document.querySelectorAll(".tabbar button").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
 try{
  $("main").innerHTML=view==="today"?todayView():view==="calendar"?calendarView():view==="catalog"?catalogView():houseView();
  bind();
 }catch(err){
  $("main").innerHTML=`<div class="empty"><b>Die Ansicht konnte nicht geladen werden.</b><p>${String(err.message||err)}</p><button class="primary" onclick="location.reload()">Neu laden</button></div>`;
  console.error(err);
 }
}
function todayView(){
 const d=today(), list=plan(d), total=list.reduce((n,t)=>n+minutes(t),0), cap=state.settings.baby?65:110;
 return `<section class="hero"><h1>Heute · ${new Intl.DateTimeFormat("de-AT",{weekday:"short",day:"2-digit",month:"short"}).format(new Date(d+"T12:00:00"))}</h1>
 <p>${state.settings.baby?"Heute ist ein leichter Tag. Das reicht. ❤️":"Was ist heute sinnvoll UND machbar?"}</p>
 <div class="stats"><div class="stat"><b>${list.length}</b><small>Aufgaben</small></div><div class="stat"><b>${total} Min.</b><small>Aufwand</small></div><div class="stat"><b>${Math.round(Math.min(100,total/cap*100))}%</b><small>Belastung</small></div></div><div class="bar"><i style="width:${Math.min(100,total/cap*100)}%"></i></div></section>
 ${state.settings.energy?`<div class="notice">⚡ Energiemodus ist aktiv.</div>`:""}
 <div class="head"><h2>Heute anstehend</h2><span class="muted">${list.length?total+" Min.":"frei"}</span></div>
 <div class="tasks">${list.map(t=>taskCard(t,d)).join("")||`<div class="empty">Für heute ist das genug. ❤️</div>`}</div>
 <div class="swipe">← Später &nbsp;&nbsp; · &nbsp;&nbsp; Erledigt →</div>
 <button class="primary wide" id="energy">${state.settings.energy?"⚡ Energie-Modus ausschalten":"⚡ Ich habe Energie"}</button>
 <div class="head"><h2>Me-Time</h2><button class="secondary" id="meAdd">＋ einplanen</button></div>
 <div class="tasks">${state.meTime.filter(x=>x.date===d).map(x=>`<div class="task"><div class="badge">❤️</div><div class="body"><h3>${x.title}</h3><p>Bewusst eingeplante Me-Time</p></div><span class="mins">${x.minutes} Min.</span></div>`).join("")||`<div class="empty">Me-Time wird bewusst eingeplant – nicht erst, wenn alles erledigt ist.</div>`}</div>`;
}
function calendarView(){
 const y=cal.getFullYear(),m=cal.getMonth(),first=new Date(y,m,1),days=new Date(y,m+1,0).getDate(),off=(first.getDay()+6)%7;
 let cells="";for(let i=0;i<off;i++)cells+="<div></div>";
 for(let n=1;n<=days;n++){const d=`${y}-${String(m+1).padStart(2,"0")}-${String(n).padStart(2,"0")}`,p=plan(d);cells+=`<button class="day ${d===today()?"today ":""}${d===selected?"selected ":""}${day(d)===0?"sun":""}" data-day="${d}"><span class="num">${n}</span><span class="dots">${p.slice(0,4).map(()=>'<i class="dot"></i>').join("")}</span></button>`}
 const p=plan(selected);
 return `<div class="head"><h1>Kalender</h1></div><div class="calendar"><div class="month"><button id="prev">‹</button><b>${monthName(y,m)}</b><button id="next">›</button></div><div class="week"><span>Mo</span><span>Di</span><span>Mi</span><span>Do</span><span>Fr</span><span>Sa</span><span>So</span></div><div class="days">${cells}</div></div>
 <div class="head"><h2>${fmt(selected)}</h2><span class="muted">${p.reduce((n,t)=>n+minutes(t),0)} Min.</span></div><div class="tasks">${p.map(t=>taskCard(t,selected)).join("")||`<div class="empty">Keine geplanten Aufgaben.</div>`}</div>`;
}
function catalogView(){
 const q=(window.q||"").toLowerCase(), list=state.tasks.filter(t=>(t.name+" "+t.room+" "+t.floor+" "+t.category+" "+(t.place||"")).toLowerCase().includes(q)).sort((a,b)=>a.due.localeCompare(b.due));
 return `<div class="head"><h1>Aufgabenkatalog</h1><button class="primary add" id="add">＋ Aufgabe</button></div>
 <div class="searchrow"><input class="search" id="search" value="${q}" placeholder="Aufgabe, Raum, Etage, Kategorie …"></div>
 <div class="tasks">${list.map(t=>`<article class="task catalog" data-edit="${t.id}"><div class="badge">${icon(t)}</div><div class="body"><h3>${t.name}</h3><p>${t.floor} · ${t.room} · ${t.category}</p><p>Nächster Termin: <b>${fmt(t.due)}</b> · ${t.interval} Tage${t.fixed?" · fester Termin":""}</p></div><span>›</span></article>`).join("")||'<div class="empty">Keine Aufgaben gefunden.</div>'}</div>`;
}
function houseView(){
 return `<section class="hero"><h1>Dein Zuhause</h1><p>Ein großes Haus, aber keine riesigen Tageslisten. Die Planung verteilt Pflege sinnvoll über Zeit.</p></section>
 <div class="head"><h2>Übersicht</h2></div><div class="homegrid"><div class="homecard"><b class="big">${state.tasks.length}</b><small>Aufgaben</small></div><div class="homecard"><b class="big">300 m²</b><small>Hausgröße</small></div><div class="homecard"><b class="big">120</b><small>Tage Planungshorizont</small></div><div class="homecard"><b class="big">${state.tasks.filter(t=>t.seasonal).length}</b><small>saisonale Aufgaben</small></div></div>
 <div class="head"><h2>Wochenstruktur</h2></div><div class="homecard weekcard"><p><b>Mo</b> Wohnen · Essen · Küche</p><p><b>Di</b> WCs · Waschbecken · Sanitär</p><p><b>Mi</b> OG</p><p><b>Do</b> EG-Nebenräume · Waschküche</p><p><b>Fr</b> ein Kellerraum</p><p><b>Sa</b> Wäsche · maximal ein Zusatzpaket</p><p><b>So</b> grundsätzlich haushaltsfrei</p></div>`;
}
function bind(){
 document.querySelectorAll(".tabbar button").forEach(b=>b.onclick=()=>{view=b.dataset.view;render()});
 $("settingsBtn").onclick=()=>{$("babyMode").checked=state.settings.baby;$("energyMode").checked=state.settings.energy;$("settingsDialog").showModal()};
 document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>$(b.dataset.close).close());
 $("energy")?.addEventListener("click",()=>{state.settings.energy=!state.settings.energy;save();render()});
 $("meAdd")?.addEventListener("click",()=>{const title=prompt("Me-Time","Pflege / Kaffee / Lesen");if(!title)return;const m=Number(prompt("Minuten","30"))||30;state.meTime.push({id:uid(),date:today(),title,minutes:m});save();render()});
 $("add")?.addEventListener("click",()=>openTask());
 $("search")?.addEventListener("input",e=>{window.q=e.target.value;render()});
 $("prev")?.addEventListener("click",()=>{cal.setMonth(cal.getMonth()-1);render()});
 $("next")?.addEventListener("click",()=>{cal.setMonth(cal.getMonth()+1);render()});
 document.querySelectorAll("[data-day]").forEach(b=>b.onclick=()=>{selected=b.dataset.day;render()});
 document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>openTask(b.dataset.edit));
 document.querySelectorAll("[data-task]").forEach(el=>{
  let sx=null;
  el.addEventListener("touchstart",e=>sx=e.changedTouches[0].clientX,{passive:true});
  el.addEventListener("touchend",e=>{if(sx===null)return;const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>65)act(el.dataset.task,el.dataset.date,dx>0?"done":"later");sx=null},{passive:true});
 });
 $("fSeasonal")?.addEventListener("change",e=>$("seasonFields").hidden=!e.target.checked);
}
function act(id,d,type){
 const t=state.tasks.find(x=>x.id===id);if(!t)return;
 t.history.push({type,date:d});
 if(type==="done")t.due=add(d,t.interval||30);else t.due=add(t.due,3);
 save();render();
}
function openTask(id){
 const t=id?state.tasks.find(x=>x.id===id):null;
 $("dialogTitle").textContent=t?"Aufgabe bearbeiten":"Aufgabe hinzufügen";
 $("fId").value=t?.id||"";$("fName").value=t?.name||"";$("fFloor").value=t?.floor||"";$("fRoom").value=t?.room||"";$("fPlace").value=t?.place||"";$("fCategory").value=t?.category||"";$("fDesc").value=t?.description||"";
 $("fEffort").value=t?.effort||"medium";$("fInterval").value=t?.interval||30;$("fDue").value=t?.due||today();$("fWeekday").value=t?.weekday??"";
 $("fFixed").checked=!!t?.fixed;$("fSeasonal").checked=!!t?.seasonal;$("fSeasonStart").value=t?.seasonStart||"";$("fSeasonEnd").value=t?.seasonEnd||"";$("seasonFields").hidden=!t?.seasonal;
 $("taskDialog").showModal();
}
$("taskForm").addEventListener("submit",e=>{
 e.preventDefault();const id=$("fId").value,t=id?state.tasks.find(x=>x.id===id):{id:uid(),history:[]};
 Object.assign(t,{name:$("fName").value.trim(),floor:$("fFloor").value.trim(),room:$("fRoom").value.trim(),place:$("fPlace").value.trim(),category:$("fCategory").value.trim(),description:$("fDesc").value.trim(),effort:$("fEffort").value,interval:Number($("fInterval").value)||30,due:$("fDue").value,weekday:$("fWeekday").value===""?null:Number($("fWeekday").value),fixed:$("fFixed").checked,seasonal:$("fSeasonal").checked,seasonStart:$("fSeasonal").checked?($("fSeasonStart").value||"01-01"):null,seasonEnd:$("fSeasonal").checked?($("fSeasonEnd").value||"12-31"):null});
 if(!id)state.tasks.push(t);save();$("taskDialog").close();render();
});
$("settingsForm").addEventListener("submit",e=>e.preventDefault());
$("babyMode").addEventListener("change",e=>{state.settings.baby=e.target.checked;save();render();$("settingsDialog").close()});
$("energyMode").addEventListener("change",e=>{state.settings.energy=e.target.checked;save();render();$("settingsDialog").close()});
$("reset").onclick=()=>{if(confirm("Demo-Daten zurücksetzen?")){state=seed();save();location.reload()}};
window.addEventListener("error",e=>console.error(e.error||e.message));
if("serviceWorker" in navigator)navigator.serviceWorker.register("./sw.js").catch(()=>{});
render();
})();