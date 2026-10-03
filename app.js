const KEY="unser-zuhause-v1";
const EFF={mini:{label:"🫧",min:8},small:{label:"🌱",min:18},medium:{label:"🧹",min:30},large:{label:"💪",min:55},huge:{label:"🔥",min:75},mighty:{label:"🪟",min:110}};
const rooms=[
 ["EG","Eingangsbereich"],["EG","Garderobe"],["EG","Büro"],["EG","Flur"],["EG","Gäste-WC"],["EG","Abstellraum"],["EG","Wohnzimmer"],["EG","Essbereich"],["EG","Küche"],["EG","Speis"],
 ["KG","Technikraum"],["KG","Lagerraum"],["KG","Musikzimmer"],["KG","Trainingsraum"],["KG","Waschküche"],["KG","Flur KG"],
 ["OG","Kinderzimmer 1"],["OG","Kinderzimmer 2"],["OG","Kinderbad"],["OG","Schlafzimmer"],["OG","Ankleidezimmer"],["OG","Bad"],["OG","WC"],["OG","Saunaraum"],["OG","Flur OG"],["Haus","Stiegenhaus"]
];
const todayISO=()=>new Date().toISOString().slice(0,10);
const addDays=(s,n)=>{let d=new Date(s+"T12:00:00");d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)};
const fmt=s=>new Intl.DateTimeFormat("de-AT",{day:"2-digit",month:"2-digit",year:"numeric"}).format(new Date(s+"T12:00:00"));
const wd=s=>new Date(s+"T12:00:00").getDay();
const nextWeekday=(weekday)=>{let d=new Date(); let delta=(weekday-d.getDay()+7)%7; if(delta===0)delta=7; d.setDate(d.getDate()+delta); return d.toISOString().slice(0,10)};
const uid=()=>crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2);

function seed(){
 const t=todayISO();
 const tasks=[
  ["Bett machen","OG","Schlafzimmer","Morgenroutine","Täglich",8,"mini",1],
  ["Schlafzimmer lüften","OG","Schlafzimmer","Morgenroutine","Täglich",5,"mini",1],
  ["Kleidung wegräumen","OG","Schlafzimmer","Morgenroutine","Täglich",8,"mini",1],
  ["Geschirrspüler ausräumen","EG","Küche","Morgenroutine","Täglich",10,"mini",1],
  ["Küchenarbeitsflächen abwischen","EG","Küche","Täglich","Täglich",8,"mini",1],
  ["Esstisch abwischen","EG","Essbereich","Nach Mahlzeiten","Täglich",5,"mini",1],
  ["Baby-Hochstuhl/Essbereich reinigen","EG","Essbereich","Nach Mahlzeiten","Täglich",8,"mini",1],
  ["Geschirrspüler beladen/starten","EG","Küche","Abendroutine","Täglich",8,"mini",1],
  ["Herd abwischen","EG","Küche","Abendroutine","Täglich",6,"mini",1],
  ["Spüle/Armatur reinigen","EG","Küche","Abendroutine","Täglich",8,"mini",1],
  ["Wohnzimmer grob zurücksetzen","EG","Wohnzimmer","Abendroutine","Täglich",10,"mini",1],
  ["WC + Waschbecken reinigen","EG","Gäste-WC","Sanitärräume", "Wöchentlich Dienstag",20,"small",7],
  ["Bad + WC reinigen","OG","Bad","Sanitärräume","Wöchentlich Dienstag",30,"medium",7],
  ["Kinderbad reinigen","OG","Kinderbad","Sanitärräume","Wöchentlich Dienstag",25,"medium",7],
  ["Böden EG saugen","EG","EG","Böden","Wöchentlich",30,"medium",7],
  ["Böden OG saugen","OG","Flur OG","Böden","Wöchentlich",30,"medium",7],
  ["Küche gründlich reinigen","EG","Küche","Küche häufig","Alle 14 Tage",30,"medium",14],
  ["Waschküche: Oberflächen + Boden saugen","KG","Waschküche","Waschküche häufig","Wöchentlich",30,"medium",7],
  ["Büro + Abstellraum reinigen","EG","Büro","EG-Nebenräume","Alle 4 Wochen",35,"medium",28],
  ["Eingang + Garderobe + Flur reinigen","EG","Eingangsbereich","EG-Nebenräume","Alle 4 Wochen",35,"medium",28],
  ["Musikzimmer reinigen","KG","Musikzimmer","Keller-Rotation","Alle 5 Wochen",35,"medium",35],
  ["Trainingsraum reinigen","KG","Trainingsraum","Keller-Rotation","Alle 5 Wochen",40,"medium",35],
  ["Technikraum reinigen","KG","Technikraum","Keller-Rotation","Alle 5 Wochen",25,"medium",35],
  ["Lagerraum reinigen","KG","Lagerraum","Keller-Rotation","Alle 5 Wochen",30,"medium",35],
  ["Flur KG reinigen","KG","Flur KG","Keller-Rotation","Alle 5 Wochen",25,"medium",35],
  ["Türklinken abwischen","Haus","Alle Räume","Detailpflege","Monatlich",25,"small",30],
  ["Lichtschalter außen abwischen","Haus","Alle Räume","Detailpflege","Monatlich",20,"small",30],
  ["Decken-/Wandecken reinigen","Haus","Alle Räume","Detailpflege","Monatlich",30,"medium",30],
  ["Türrahmen/Zargen reinigen","Haus","Alle Räume","Detailpflege","Alle 3 Monate",45,"large",90],
  ["Türblätter reinigen","Haus","Alle Räume","Detailpflege","Alle 3 Monate",45,"large",90],
  ["Sockelleisten reinigen","Haus","Alle Räume","Detailpflege","Alle 3 Monate",45,"large",90],
  ["Kühlschrank prüfen/reinigen","EG","Küche","Geräte","Monatlich",30,"medium",30],
  ["Backofen gründlich reinigen","EG","Küche","Geräte","Alle 3 Monate",55,"large",90],
  ["Geschirrspüler Filter/Dichtung","EG","Küche","Geräte","Monatlich",20,"small",30],
  ["Waschmaschine Schublade/Dichtung","KG","Waschküche","Geräte","Monatlich",20,"small",30],
  ["Kaffeemaschine entkalken","EG","Küche","Geräte","Halbjährlich",25,"medium",180],
  ["Matratzen gründlich pflegen","OG","Schlafzimmer","Textilien","Halbjährlich",60,"large",180],
  ["Vorhänge/Teppiche pflegen","Haus","Mehrere Räume","Textilien","Halbjährlich",70,"huge",180],
  ["Raffstores reinigen","Haus","Außenbereiche","Saisonpflege","1–2× jährlich",110,"mighty",365],
  ["Große Fensteretappe – EG Wohnzimmer","EG","Wohnzimmer","Fenster Herbst","01.09.–31.10.",110,"mighty",180],
  ["Fensteretappe – EG Küche + Speis","EG","Küche","Fenster Herbst","01.09.–31.10.",90,"huge",180],
  ["Fensteretappe – OG Schlafzimmer + Ankleide","OG","Schlafzimmer","Fenster Herbst","01.09.–31.10.",100,"huge",180],
  ["Riesiges Stiegenhausfenster","Haus","Stiegenhaus","Fenster Herbst","01.09.–31.10.",120,"mighty",180],
  ["Kaminumfeld reinigen","EG","Wohnzimmer","Kamin","Alle 14 Tage in Heizsaison",20,"small",14],
  ["Kaminbesteck reinigen","EG","Wohnzimmer","Kamin","Monatlich in Heizsaison",15,"small",30]
 ];
 const list=tasks.map((x,i)=>{
   let due=addDays(t,(i*7)%45);
   if(x[0].includes("WC")||x[0].includes("Waschbecken")||x[0].includes("Bad +")||x[0].includes("Kinderbad")) due=nextWeekday(2);
   if(x[0].includes("Fenster")||x[0].includes("Stiegenhausfenster")) due=addDays(t,(i%8)*3);
   return {id:uid(),name:x[0],floor:x[1],room:x[2],category:x[3],description:"",effort:x[6],minutes:x[5],interval:x[7],due,weekday:(x[0].includes("WC")||x[0].includes("Bad +")||x[0].includes("Kinderbad"))?2:null,fixed:(x[0].includes("WC")||x[0].includes("Bad +")||x[0].includes("Kinderbad")),seasonal:x[3]==="Fenster Herbst",seasonStart:x[3]==="Fenster Herbst"?"09-01":null,seasonEnd:x[3]==="Fenster Herbst"?"10-31":null,history:[],created:t};
 });
 return {tasks:list,settings:{baby:false,energy:false},selectedDate:t,meTime:[],version:1};
}
let state=JSON.parse(localStorage.getItem(KEY)||"null")||seed();
let view="today"; let calMonth=new Date(); let selectedDate=state.selectedDate||todayISO();

function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function effortMinutes(t){return t.minutes||EFF[t.effort]?.min||20}
function isInSeason(t,date){if(!t.seasonal)return true;let m=date.slice(5);return m>=t.seasonStart&&m<=t.seasonEnd}
function candidateScore(t,date){
 let d=Math.round((new Date(date)-new Date(t.due))/86400000);
 let overdue=Math.max(0,d);
 let score=overdue*5 + Math.max(0,20-(t.interval||30)/10);
 if(t.fixed)score+=30;
 if(t.seasonal)score+=isInSeason(t,date)?10:-999;
 return score;
}
function isDueWindow(t,date){
 if(!isInSeason(t,date))return false;
 if(t.fixed)return t.weekday?wd(date)===Number(t.weekday):date===t.due;
 let ideal=new Date(t.due+"T12:00:00"), day=new Date(date+"T12:00:00");
 let diff=Math.round((day-ideal)/86400000);
 return diff>=-10 && diff<=10;
}
function planFor(date){
 const day=wd(date), sunday=day===0;
 const cap=state.settings.baby?65:110;
 const all=state.tasks.filter(t=>isDueWindow(t,date));
 let fixed=all.filter(t=>t.fixed && (t.weekday?day===Number(t.weekday):true));
 let flex=all.filter(t=>!t.fixed).sort((a,b)=>candidateScore(b,date)-candidateScore(a,date));
 const chosen=[...fixed]; let used=chosen.reduce((n,t)=>n+effortMinutes(t),0);
 if(sunday && !state.settings.energy) return [];
 const mighty=flex.find(t=>t.effort==="mighty");
 if(mighty && used===0){chosen.push(mighty);used+=effortMinutes(mighty)}
 else{
   for(const t of flex){
     if(chosen.some(x=>x.id===t.id))continue;
     let m=effortMinutes(t);
     let max=state.settings.baby?65:110;
     if(used+m>max)continue;
     if(chosen.some(x=>x.effort==="mighty"))continue;
     if(t.effort==="huge"||t.effort==="large"){
       if(chosen.filter(x=>!x.fixed).length>=2)continue;
     }
     if(chosen.filter(x=>!x.fixed).some(x=>x.room===t.room))continue;
     chosen.push(t);used+=m;
     if(chosen.some(x=>x.effort==="huge"||x.effort==="large") && chosen.filter(x=>!x.fixed).length>=2)break;
   }
 }
 if(state.settings.energy){
   for(const t of flex.filter(x=>!chosen.some(c=>c.id===x.id)).slice(0,3)){
     if(used+effortMinutes(t)<=Math.min(140,cap+30)){chosen.push(t);used+=effortMinutes(t)}
   }
 }
 return chosen;
}
function displayMinutes(ts){return ts.reduce((n,t)=>n+effortMinutes(t),0)}
function render(){
 document.querySelectorAll(".bottomnav button").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
 const main=document.getElementById("main");
 if(view==="today")main.innerHTML=renderToday();
 else if(view==="calendar")main.innerHTML=renderCalendar();
 else if(view==="catalog")main.innerHTML=renderCatalog();
 else main.innerHTML=renderHome();
 bind();
}
function renderToday(){
 const d=todayISO(), tasks=planFor(d), mins=displayMinutes(tasks), cap=state.settings.baby?65:110;
 return `<section class="hero"><h1>Heute · ${new Intl.DateTimeFormat("de-AT",{weekday:"long",day:"2-digit",month:"long"}).format(new Date(d+"T12:00:00"))}</h1>
 <p>${state.settings.baby?"Heute ist ein leichter Tag. Kleine, sinnvolle Schritte reichen. ❤️":"Nicht zu wenig. Nicht zu viel. Sondern realistisch."}</p>
 <div class="stats"><div class="stat"><b>${tasks.length}</b><small>Aufgaben</small></div><div class="stat"><b>${mins} Min.</b><small>Gesamtaufwand</small></div><div class="stat"><b>${Math.round(Math.min(100,mins/cap*100))}%</b><small>Belastung</small></div></div>
 <div class="capacity"><i style="width:${Math.min(100,mins/cap*100)}%"></i></div></section>
 ${state.settings.energy?`<div class="notice">⚡ Energiemodus aktiv – bis zu 3 zusätzliche sinnvolle Kandidaten können erscheinen.</div>`:""}
 <div class="sectionhead"><h2>Heute anstehend</h2><span class="muted">${tasks.length?`${mins} Min.`:"frei"}</span></div>
 <div class="tasklist">${tasks.length?tasks.map(t=>taskCard(t,d)).join(""):`<div class="empty">Für heute ist das genug. ❤️</div>`}</div>
 <p class="swipehint">← Später · Erledigt →</p>
 <button class="primary wide" id="energyBtn">⚡ ${state.settings.energy?"Energie-Modus ausschalten":"Ich habe Energie"}</button>
 <div class="sectionhead"><h2>Me-Time</h2><button class="secondary" id="addMe">＋ einplanen</button></div>
 <div class="tasklist">${state.meTime.filter(x=>x.date===d).map(x=>`<div class="task"><div class="badge">❤️</div><div class="body"><h3>${x.title}</h3><p>Bewusst eingeplante Me-Time</p></div><span class="mins">${x.minutes} Min.</span></div>`).join("")||`<div class="empty">Me-Time gehört zum System – nicht erst nach der Hausarbeit.</div>`}</div>`;
}
function taskCard(t,date){
 const done=t.history?.some(h=>h.type==="done"&&h.date===date);
 return `<article class="task ${done?"done":""}" data-id="${t.id}" data-date="${date}">
 <div class="badge">${EFF[t.effort]?.label||"🧹"}</div><div class="body"><h3>${t.name}</h3><p>${t.floor} · ${t.room} · ${t.category}</p></div><span class="mins">${effortMinutes(t)} Min.</span></article>`;
}
function renderCalendar(){
 const y=calMonth.getFullYear(), m=calMonth.getMonth();
 const first=new Date(y,m,1), last=new Date(y,m+1,0), offset=(first.getDay()+6)%7;
 let cells="";
 for(let i=0;i<offset;i++)cells+=`<div></div>`;
 for(let n=1;n<=last.getDate();n++){
  const s=`${y}-${String(m+1).padStart(2,"0")}-${String(n).padStart(2,"0")}`, ts=planFor(s), cls=(s===todayISO()?"today ":"")+(s===selectedDate?"selected ":"")+(wd(s)===0?"sun":"");
  cells+=`<button class="day ${cls}" data-date="${s}"><span class="n">${n}</span><span class="dots">${ts.slice(0,4).map(t=>`<i class="dot"></i>`).join("")}</span></button>`;
 }
 return `<section class="sectionhead"><h1>Kalender</h1></section><div class="calendar"><div class="monthhead"><button id="prevMonth">‹</button><strong>${new Intl.DateTimeFormat("de-AT",{month:"long",year:"numeric"}).format(new Date(y,m,1))}</strong><button id="nextMonth">›</button></div><div class="weekgrid"><span>Mo</span><span>Di</span><span>Mi</span><span>Do</span><span>Fr</span><span>Sa</span><span>So</span></div><div class="daygrid">${cells}</div></div>
 <div class="calendarTasks"><div class="sectionhead"><h2>${fmt(selectedDate)}</h2><span class="muted">${displayMinutes(planFor(selectedDate))} Min.</span></div><div class="tasklist">${planFor(selectedDate).map(t=>taskCard(t,selectedDate)).join("")||`<div class="empty">Keine geplanten Aufgaben.</div>`}</div></div>`;
}
function renderCatalog(){
 const q=(window.catalogQ||"").toLowerCase();
 let tasks=state.tasks.filter(t=>(t.name+" "+t.room+" "+t.floor+" "+t.category+" "+t.place).toLowerCase().includes(q));
 tasks.sort((a,b)=>a.due.localeCompare(b.due));
 return `<div class="sectionhead"><h1>Aufgabenkatalog</h1><button class="primary add" id="addTask">＋ Aufgabe</button></div>
 <div class="catalogbar"><input class="search" id="search" value="${q}" placeholder="Aufgaben, Raum, Etage, Kategorie …"></div>
 <div class="tasklist">${tasks.map(t=>`<article class="task catalogtask" data-edit="${t.id}"><div class="badge">${EFF[t.effort]?.label||"🧹"}</div><div class="body"><h3>${t.name}</h3><p>${t.floor} · ${t.room} · ${t.category}</p><p>Nächster Termin: <b>${fmt(t.due)}</b> · Intervall: ${t.interval} Tage${t.fixed?" · fest":""}</p></div><span>›</span></article>`).join("")||`<div class="empty">Keine Aufgaben gefunden.</div>`}</div>`;
}
function renderHome(){
 const roomsCount=rooms.length, taskCount=state.tasks.length, future=state.tasks.filter(t=>t.due<=addDays(todayISO(),120)).length;
 return `<section class="hero"><h1>Unser Zuhause</h1><p>Ein ruhiger, intelligenter Haushaltsassistent für ein großes Zuhause – mit zentraler Planung und realistischen Tagen.</p></section>
 <div class="homegrid"><div class="homecard"><b>${taskCount}</b><span>Aufgaben im Katalog</span></div><div class="homecard"><b>${roomsCount}</b><span>Bereiche/Räume</span></div><div class="homecard"><b>120</b><span>Tage Planungshorizont</span></div><div class="homecard"><b>${future}</b><span>Aufgaben im Horizont</span></div></div>
 <div class="sectionhead"><h2>Wochenstruktur</h2></div><div class="homecard"><p><b>Mo</b> Wohnen / Essen / Küche</p><p><b>Di</b> WCs + Waschbecken</p><p><b>Mi</b> OG</p><p><b>Do</b> EG-Nebenräume / Waschküche</p><p><b>Fr</b> ein Kellerraum</p><p><b>Sa</b> Wäsche + max. ein Paket</p><p><b>So</b> grundsätzlich haushaltsfrei</p></div>
 <div class="sectionhead"><h2>Modus</h2></div><div class="homecard"><p>🫶 Baby-/Leichtmodus: <b>${state.settings.baby?"AN":"AUS"}</b></p><p>⚡ Energie-Modus: <b>${state.settings.energy?"AN":"AUS"}</b></p><button class="secondary wide" id="settingsOpen">Einstellungen öffnen</button></div>`;
}
function openTask(id=null){
 const d=document.getElementById("taskDialog"), t=id?state.tasks.find(x=>x.id===id):null;
 document.getElementById("dialogTitle").textContent=t?"Aufgabe bearbeiten":"Aufgabe hinzufügen";
 document.getElementById("taskId").value=t?.id||"";
 document.getElementById("fName").value=t?.name||"";
 document.getElementById("fFloor").value=t?.floor||"";
 document.getElementById("fRoom").value=t?.room||"";
 document.getElementById("fPlace").value=t?.place||"";
 document.getElementById("fCategory").value=t?.category||"";
 document.getElementById("fDesc").value=t?.description||"";
 document.getElementById("fEffort").value=t?.effort||"medium";
 document.getElementById("fInterval").value=t?.interval||30;
 document.getElementById("fDue").value=t?.due||todayISO();
 document.getElementById("fWeekday").value=t?.weekday??"";
 document.getElementById("fFixed").checked=!!t?.fixed;
 document.getElementById("fSeasonal").checked=!!t?.seasonal;
 document.getElementById("fSeasonStart").value=t?.seasonStart||"";
 document.getElementById("fSeasonEnd").value=t?.seasonEnd||"";
 document.getElementById("deleteTask").style.display=t?"block":"none";
 d.showModal();
}
function bind(){
 document.querySelectorAll(".bottomnav button").forEach(b=>b.onclick=()=>{view=b.dataset.view;render()});
 document.getElementById("settingsBtn").onclick=openSettings;
 document.querySelectorAll("[data-edit]").forEach(x=>x.onclick=()=>openTask(x.dataset.edit));
 document.getElementById("addTask")?.addEventListener("click",()=>openTask());
 document.getElementById("search")?.addEventListener("input",e=>{window.catalogQ=e.target.value;render()});
 document.querySelectorAll(".day").forEach(x=>x.onclick=()=>{selectedDate=x.dataset.date;state.selectedDate=selectedDate;save();render()});
 document.getElementById("prevMonth")?.addEventListener("click",()=>{calMonth.setMonth(calMonth.getMonth()-1);render()});
 document.getElementById("nextMonth")?.addEventListener("click",()=>{calMonth.setMonth(calMonth.getMonth()+1);render()});
 document.querySelectorAll("[data-id]").forEach(el=>{
   let startX=null;
   el.addEventListener("touchstart",e=>startX=e.changedTouches[0].clientX,{passive:true});
   el.addEventListener("touchend",e=>{if(startX==null)return;let dx=e.changedTouches[0].clientX-startX; if(Math.abs(dx)>70){actionTask(el.dataset.id,el.dataset.date,dx>0?"done":"later");}});
   el.addEventListener("click",()=>{if(!el.dataset.id)return; actionTask(el.dataset.id,el.dataset.date,"done")});
 });
 document.getElementById("energyBtn")?.addEventListener("click",()=>{state.settings.energy=!state.settings.energy;save();render()});
 document.getElementById("addMe")?.addEventListener("click",()=>{let title=prompt("Was möchtest du einplanen?","Pflege / Kaffee / Lesen");if(!title)return;let min=Number(prompt("Wie viele Minuten?",30))||30;state.meTime.push({id:uid(),date:todayISO(),title,minutes:min});save();render()});
 document.getElementById("settingsOpen")?.addEventListener("click",openSettings);
 document.getElementById("fSeasonal")?.addEventListener("change",e=>document.getElementById("seasonFields").hidden=!e.target.checked);
}
function actionTask(id,date,type){
 const t=state.tasks.find(x=>x.id===id); if(!t)return;
 t.history=t.history||[]; t.history.push({type,date});
 if(type==="done"){t.lastDone=date;t.due=addDays(date,t.interval||30)}
 else {t.due=addDays(t.due,3)}
 save();render();
}
document.getElementById("deleteTask").onclick=()=>{const id=document.getElementById("taskId").value;if(!id)return;if(confirm("Aufgabe wirklich löschen?")){state.tasks=state.tasks.filter(t=>t.id!==id);save();document.getElementById("taskDialog").close();render()}};
document.getElementById("taskForm").addEventListener("submit",e=>{
 e.preventDefault();
 const id=document.getElementById("taskId").value;
 const old=id?state.tasks.find(t=>t.id===id):null;
 const t=old||{id:uid(),history:[],created:todayISO()};
 Object.assign(t,{name:fName.value.trim(),floor:fFloor.value.trim(),room:fRoom.value.trim(),place:fPlace.value.trim(),category:fCategory.value.trim(),description:fDesc.value.trim(),effort:fEffort.value,minutes:EFF[fEffort.value].min,interval:Number(fInterval.value)||30,due:fDue.value,weekday:fWeekday.value?Number(fWeekday.value):null,fixed:fFixed.checked,seasonal:fSeasonal.checked,seasonStart:fSeasonal.checked?(fSeasonStart.value||"01-01"):null,seasonEnd:fSeasonal.checked?(fSeasonEnd.value||"12-31"):null});
 if(!id)state.tasks.push(t); save(); document.getElementById("taskDialog").close(); render();
});
function openSettings(){
 document.getElementById("babyMode").checked=state.settings.baby;
 document.getElementById("energyMode").checked=state.settings.energy;
 document.getElementById("settingsDialog").showModal();
}
document.getElementById("settingsDialog").addEventListener("submit",e=>{
 e.preventDefault();
 state.settings.baby=document.getElementById("babyMode").checked;
 state.settings.energy=document.getElementById("energyMode").checked;
 save();document.getElementById("settingsDialog").close();render();
});
document.getElementById("resetDemo").onclick=()=>{if(confirm("Demo-Daten wirklich zurücksetzen?")){state=seed();save();location.reload()}};
if("serviceWorker" in navigator)navigator.serviceWorker.register("sw.js").catch(()=>{});
render();