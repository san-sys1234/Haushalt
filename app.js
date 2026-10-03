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
 const D=[];
 const addTask=(name,floor,room,category,effort,interval,due,fixed=false,weekday=null,seasonal=false,seasonStart=null,seasonEnd=null,description="")=>{
   D.push({id:uid(),name,floor,room,category,effort,interval,due,fixed,weekday,seasonal,seasonStart,seasonEnd,description,history:[]});
 };
 // DAILY MORNING — every item remains a separate task.
 addTask("Bett machen","OG","Schlafzimmer","Tägliche Morgenroutine","mini",1,t);
 addTask("Schlafzimmer lüften","OG","Schlafzimmer","Tägliche Morgenroutine","mini",1,t);
 addTask("Kleidung wegräumen","OG","Schlafzimmer","Tägliche Morgenroutine","mini",1,t);
 addTask("Vorhänge / Raffstores öffnen","Haus","Mehrere Räume","Tägliche Morgenroutine","mini",1,t);
 addTask("Geschirrspüler ausräumen","EG","Küche","Tägliche Morgenroutine","mini",1,t);
 addTask("Frühstücksgeschirr in den Geschirrspüler geben","EG","Küche","Tägliche Morgenroutine","mini",1,t);
 addTask("Küchenarbeitsflächen abwischen","EG","Küche","Tägliche Morgenroutine","mini",1,t);
 addTask("Esstisch abwischen","EG","Essbereich","Tägliche Morgenroutine","mini",1,t);
 addTask("Baby-Hochstuhl / Essbereich reinigen","EG","Essbereich","Tägliche Morgenroutine","mini",1,t);
 addTask("Schuhe, Jacken und Taschen kurz ordnen","EG","Eingangsbereich / Garderobe","Tägliche Morgenroutine","mini",1,t);
 // AFTER MEALS
 addTask("Benutztes Geschirr in den Geschirrspüler geben","EG","Küche","Nach Mahlzeiten","mini",1,t);
 addTask("Esstisch nach der Mahlzeit abwischen","EG","Essbereich","Nach Mahlzeiten","mini",1,t);
 addTask("Baby-Essbereich / Hochstuhl nach der Mahlzeit reinigen","EG","Essbereich","Nach Mahlzeiten","mini",1,t);
 addTask("Heruntergefallenes Essen entfernen","EG","Essbereich / Küche","Nach Mahlzeiten","mini",1,t);
 addTask("Küchenarbeitsfläche bei Bedarf abwischen","EG","Küche","Nach Mahlzeiten","mini",1,t);
 // DURING THE DAY
 addTask("Wege im Haus freihalten","Haus","Alle Bereiche","Tägliche Tagesroutine","mini",1,t);
 addTask("Gefährliche / zerbrechliche Gegenstände wegräumen","Haus","Alle Bereiche","Tägliche Tagesroutine","mini",1,t);
 addTask("Schmutzige Wäsche in den Wäschekorb geben","Haus","Alle Räume","Tägliche Tagesroutine","mini",1,t);
 addTask("Benutztes Geschirr wegräumen","Haus","Alle Räume","Tägliche Tagesroutine","mini",1,t);
 addTask("Spielzeug grob in die Spielzeugbox geben","Haus","Kinderbereiche","Tägliche Tagesroutine","mini",1,t);
 // EVENING
 addTask("Geschirrspüler beladen und starten","EG","Küche","Tägliche Abendroutine","mini",1,t);
 addTask("Küchenarbeitsflächen abends abwischen","EG","Küche","Tägliche Abendroutine","mini",1,t);
 addTask("Herd abwischen","EG","Küche","Tägliche Abendroutine","mini",1,t);
 addTask("Spüle und Armatur reinigen","EG","Küche","Tägliche Abendroutine","mini",1,t);
 addTask("Esstisch abends abwischen","EG","Essbereich","Tägliche Abendroutine","mini",1,t);
 addTask("Baby-Essbereich abends reinigen","EG","Essbereich","Tägliche Abendroutine","mini",1,t);
 addTask("Müll kontrollieren","Haus","Küche / Abstellraum","Tägliche Abendroutine","mini",1,t);
 addTask("Wohnzimmer grob zurücksetzen","EG","Wohnzimmer","Tägliche Abendroutine","mini",1,t);
 addTask("Eingangsbereich und Garderobe kurz zurücksetzen","EG","Eingangsbereich / Garderobe","Tägliche Abendroutine","mini",1,t);
 addTask("Kleidung abends wegräumen","OG","Schlafzimmer / Ankleide","Tägliche Abendroutine","mini",1,t);
 addTask("Vorhänge / Raffstores schließen","Haus","Mehrere Räume","Tägliche Abendroutine","mini",1,t);

 // TUESDAY SANITARY — explicitly separated, never a generic "Bad reinigen".
 addTask("Gäste-WC: Toilette reinigen","EG","Gäste-WC","Dienstag – Sanitär","small",7,nextWeekday(2),true,2);
 addTask("Gäste-WC: Waschbecken reinigen","EG","Gäste-WC","Dienstag – Sanitär","small",7,nextWeekday(2),true,2);
 addTask("Gäste-WC: Toilettenbürste reinigen","EG","Gäste-WC","Dienstag – Sanitär","mini",7,nextWeekday(2),true,2);
 addTask("Bad: Toilette reinigen","OG","WC","Dienstag – Sanitär","small",7,nextWeekday(2),true,2);
 addTask("Bad: Waschbecken reinigen","OG","Bad","Dienstag – Sanitär","small",7,nextWeekday(2),true,2);
 addTask("Bad: Toilettenbürste reinigen","OG","WC","Dienstag – Sanitär","mini",7,nextWeekday(2),true,2);
 addTask("Kinderbad: Toilette reinigen","OG","Kinderbad","Dienstag – Sanitär","small",7,nextWeekday(2),true,2);
 addTask("Kinderbad: Waschbecken reinigen","OG","Kinderbad","Dienstag – Sanitär","small",7,nextWeekday(2),true,2);
 addTask("Kinderbad: Toilettenbürste reinigen","OG","Kinderbad","Dienstag – Sanitär","mini",7,nextWeekday(2),true,2);
 addTask("Bad: Dusche reinigen","OG","Bad","Dienstag – Sanitär","medium",14,add(t,3));
 addTask("Bad: Badewanne reinigen","OG","Bad","Dienstag – Sanitär","medium",14,add(t,10));

 // OTHER TURNUS TASKS — each physical action is separate.
 addTask("EG: Boden saugen","EG","Eingangsbereich / Garderobe / Flur","Böden","medium",7,add(t,1));
 addTask("EG: Boden wischen","EG","Eingangsbereich / Garderobe / Flur","Böden","medium",14,add(t,9));
 addTask("Wohnzimmer: Boden saugen","EG","Wohnzimmer","Böden","medium",7,add(t,2));
 addTask("Wohnzimmer: Boden wischen","EG","Wohnzimmer","Böden","medium",14,add(t,16));
 addTask("Essbereich: Boden saugen","EG","Essbereich","Böden","small",7,add(t,3));
 addTask("Essbereich: Boden wischen","EG","Essbereich","Böden","small",14,add(t,17));
 addTask("Küche: Boden saugen","EG","Küche","Böden","medium",7,add(t,4));
 addTask("Küche: Boden wischen","EG","Küche","Böden","medium",14,add(t,18));
 addTask("OG: Boden saugen","OG","Flur OG","Böden","medium",7,add(t,5));
 addTask("OG: Boden wischen","OG","Flur OG","Böden","medium",14,add(t,19));
 addTask("Schlafzimmer: Boden saugen","OG","Schlafzimmer","Böden","small",7,add(t,6));
 addTask("Schlafzimmer: Boden wischen","OG","Schlafzimmer","Böden","small",14,add(t,20));
 addTask("Ankleide: Boden saugen","OG","Ankleidezimmer","Böden","small",14,add(t,12));
 addTask("Kinderzimmer 1: Boden saugen","OG","Kinderzimmer 1","Böden","small",7,add(t,7));
 addTask("Kinderzimmer 2: Boden saugen","OG","Kinderzimmer 2","Böden","small",7,add(t,13));
 addTask("Kinderbad: Boden saugen","OG","Kinderbad","Böden","mini",7,add(t,14));
 addTask("Kinderbad: Boden wischen","OG","Kinderbad","Böden","small",14,add(t,28));

 // KITCHEN / APPLIANCES
 addTask("Küche: Fronten abwischen","EG","Küche","Küche – häufig","small",14,add(t,8));
 addTask("Küche: Griffe reinigen","EG","Küche","Küche – häufig","mini",14,add(t,15));
 addTask("Küche: Dunstabzug außen reinigen","EG","Küche","Küche – selten","small",60,add(t,30));
 addTask("Küche: Dunstabzug Filter reinigen","EG","Küche","Küche – selten","medium",90,add(t,50));
 addTask("Küche: kleine Schublade reinigen","EG","Küche","Küche – selten","small",90,add(t,24));
 addTask("Küche: Vorratsschrank abschnittsweise reinigen","EG","Speis","Küche – selten","medium",90,add(t,40));
 addTask("Kühlschrank: Innenraum prüfen und reinigen","EG","Küche","Geräte","medium",30,add(t,11));
 addTask("Kühlschrank: Dichtungen reinigen","EG","Küche","Geräte","small",30,add(t,25));
 addTask("Backofen: Innenraum gründlich reinigen","EG","Küche","Geräte","large",90,add(t,22));
 addTask("Geschirrspüler: Filter reinigen","EG","Küche","Geräte","small",30,add(t,26));
 addTask("Geschirrspüler: Dichtung reinigen","EG","Küche","Geräte","mini",30,add(t,27));
 addTask("Kaffeemaschine entkalken","EG","Küche","Geräte","medium",180,add(t,45));

 // LAUNDRY
 addTask("Waschmaschine: Außenflächen reinigen","KG","Waschküche","Waschküche – wöchentlich","small",7,add(t,1));
 addTask("Waschmaschine: Waschmittelschublade reinigen","KG","Waschküche","Waschküche – monatlich","small",30,add(t,31));
 addTask("Waschmaschine: Türdichtung reinigen","KG","Waschküche","Waschküche – monatlich","small",30,add(t,32));
 addTask("Trockner: Flusensieb nach Herstellerangabe reinigen","KG","Waschküche","Waschküche – Pflege","mini",7,add(t,2));
 addTask("Waschküche: Arbeitsflächen reinigen","KG","Waschküche","Waschküche – wöchentlich","small",7,add(t,3));
 addTask("Waschküche: Boden saugen","KG","Waschküche","Waschküche – wöchentlich","small",7,add(t,4));
 addTask("Waschküche: Boden wischen","KG","Waschküche","Waschküche – wöchentlich","small",14,add(t,21));
 addTask("Waschküche: Wäschekörbe reinigen","KG","Waschküche","Waschküche – wöchentlich","mini",7,add(t,5));
 addTask("Waschküche: Sockelleisten reinigen","KG","Waschküche","Waschküche – monatlich","small",90,add(t,36));
 addTask("Waschküche: zugängliche Bereiche hinter/zwischen Geräten reinigen","KG","Waschküche","Waschküche – monatlich","medium",30,add(t,44));

 // DETAIL CLEANING — every room is its own task. Never create "all door handles in the house".
 const detailRooms = [
   ["EG","Eingangsbereich"],["EG","Garderobe"],["EG","Büro"],["EG","Flur"],["EG","Gäste-WC"],
   ["EG","Abstellraum"],["EG","Wohnzimmer"],["EG","Essbereich"],["EG","Küche"],["EG","Speis"],
   ["KG","Technikraum"],["KG","Lagerraum"],["KG","Musikzimmer"],["KG","Trainingsraum"],["KG","Waschküche"],["KG","Flur KG"],
   ["OG","Kinderzimmer 1"],["OG","Kinderzimmer 2"],["OG","Kinderbad"],["OG","Schlafzimmer"],["OG","Ankleidezimmer"],
   ["OG","Bad"],["OG","WC"],["OG","Saunaraum"],["OG","Flur OG"],["Haus","Stiegenhaus"]
 ];
 detailRooms.forEach(([floor,room],i)=>{
   addTask("Türklinken abwischen – "+room,floor,room,"Detailpflege","mini",30,add(t,8+i%17));
   addTask("Lichtschalter außen abwischen – "+room,floor,room,"Detailpflege","mini",30,add(t,15+i%19));
   addTask("Steckdosen außen abwischen – "+room,floor,room,"Detailpflege","mini",90,add(t,35+i%23));
   addTask("Decken- und Wandecken reinigen – "+room,floor,room,"Detailpflege","small",30,add(t,22+i%21));
   addTask("Türrahmen / Zargen reinigen – "+room,floor,room,"Detailpflege","small",90,add(t,33+i%29));
   addTask("Türblätter reinigen – "+room,floor,room,"Detailpflege","small",90,add(t,43+i%31));
   addTask("Sockelleisten reinigen – "+room,floor,room,"Detailpflege","small",90,add(t,53+i%37));
 });
 const lampRooms = [
   ["EG","Eingangsbereich"],["EG","Garderobe"],["EG","Büro"],["EG","Flur"],["EG","Wohnzimmer"],["EG","Essbereich"],["EG","Küche"],
   ["KG","Musikzimmer"],["KG","Trainingsraum"],["KG","Waschküche"],["OG","Kinderzimmer 1"],["OG","Kinderzimmer 2"],
   ["OG","Schlafzimmer"],["OG","Ankleidezimmer"],["OG","Bad"],["OG","Saunaraum"],["Haus","Stiegenhaus"]
 ];
 lampRooms.forEach(([floor,room],i)=>addTask("Erreichbare Lampen reinigen – "+room,floor,room,"Lampen","small",120,add(t,75+i%27)));
 detailRooms.forEach(([floor,room],i)=>addTask("Fensterbank reinigen – "+room,floor,room,"Fensterpflege","mini",7,add(t,9+i%13)));

 // TEXTILES / LARGER
 addTask("Matratze Schlafzimmer gründlich pflegen","OG","Schlafzimmer","Textilien","large",180,add(t,60));
 addTask("Teppiche gründlich pflegen – EG","EG","Mehrere Räume","Textilien","large",180,add(t,70));
 addTask("Teppiche gründlich pflegen – OG","OG","Mehrere Räume","Textilien","large",180,add(t,100));
 addTask("Vorhänge pflegen – EG","EG","Mehrere Räume","Textilien","huge",180,add(t,80));
 addTask("Vorhänge pflegen – OG","OG","Mehrere Räume","Textilien","huge",180,add(t,110));

 // CELLAR ROTATION — one room/week, individual tasks.
 addTask("Keller: Musikzimmer – Oberflächen reinigen","KG","Musikzimmer","Keller-Rotation","medium",35,add(t,5));
 addTask("Keller: Musikzimmer – Boden saugen","KG","Musikzimmer","Keller-Rotation","medium",35,add(t,5));
 addTask("Keller: Musikzimmer – Boden wischen","KG","Musikzimmer","Keller-Rotation","medium",35,add(t,12));
 addTask("Keller: Trainingsraum – Oberflächen reinigen","KG","Trainingsraum","Keller-Rotation","medium",35,add(t,17));
 addTask("Keller: Trainingsraum – Boden saugen","KG","Trainingsraum","Keller-Rotation","medium",35,add(t,17));
 addTask("Keller: Trainingsraum – Boden wischen","KG","Trainingsraum","Keller-Rotation","medium",35,add(t,24));
 addTask("Keller: Technikraum – Oberflächen reinigen","KG","Technikraum","Keller-Rotation","small",35,add(t,29));
 addTask("Keller: Technikraum – Boden saugen","KG","Technikraum","Keller-Rotation","small",35,add(t,29));
 addTask("Keller: Lagerraum – Oberflächen reinigen","KG","Lagerraum","Keller-Rotation","medium",35,add(t,41));
 addTask("Keller: Lagerraum – Boden saugen","KG","Lagerraum","Keller-Rotation","medium",35,add(t,41));
 addTask("Keller: Flur KG – Oberflächen reinigen","KG","Flur KG","Keller-Rotation","small",35,add(t,53));
 addTask("Keller: Flur KG – Boden saugen","KG","Flur KG","Keller-Rotation","medium",35,add(t,53));
 addTask("Keller: Flur KG – Boden wischen","KG","Flur KG","Keller-Rotation","medium",35,add(t,60));

 // FIREPLACE
 addTask("Kaminumfeld reinigen","EG","Wohnzimmer","Kamin","small",14,add(t,4));
 addTask("Kaminbesteck reinigen","EG","Wohnzimmer","Kamin","mini",30,add(t,35));
 addTask("Vollständig erkaltete Kaminasche entfernen","EG","Wohnzimmer","Kamin","small",7,add(t,7));

 // WINDOWS: every section is separate.
 addTask("Fenster innen – EG Garderobe","EG","Garderobe","Fenster Frühjahr/Herbst","medium",180,add(t,2),false,null,true,"09-01","10-31");
 addTask("Fenster innen – EG Büro 1","EG","Büro","Fenster Frühjahr/Herbst","medium",180,add(t,5),false,null,true,"09-01","10-31");
 addTask("Fenster innen – EG Büro 2","EG","Büro","Fenster Frühjahr/Herbst","medium",180,add(t,8),false,null,true,"09-01","10-31");
 addTask("Fenster innen – EG Büro 3","EG","Büro","Fenster Frühjahr/Herbst","medium",180,add(t,11),false,null,true,"09-01","10-31");
 addTask("Fenster innen – EG Wohnzimmer bodentief","EG","Wohnzimmer","Fenster Frühjahr/Herbst","mighty",180,add(t,14),false,null,true,"09-01","10-31");
 addTask("Fenster innen – EG Essbereich bodentief","EG","Essbereich","Fenster Frühjahr/Herbst","huge",180,add(t,17),false,null,true,"09-01","10-31");
 addTask("Fenster innen – EG Essbereich normal","EG","Essbereich","Fenster Frühjahr/Herbst","medium",180,add(t,20),false,null,true,"09-01","10-31");
 addTask("Fenster innen – EG Küche 1","EG","Küche","Fenster Frühjahr/Herbst","medium",180,add(t,23),false,null,true,"09-01","10-31");
 addTask("Fenster innen – EG Küche 2","EG","Küche","Fenster Frühjahr/Herbst","medium",180,add(t,26),false,null,true,"09-01","10-31");
 addTask("Fenster innen – EG Speis","EG","Speis","Fenster Frühjahr/Herbst","small",180,add(t,29),false,null,true,"09-01","10-31");
 addTask("Fenster innen – EG Abstellraum","EG","Abstellraum","Fenster Frühjahr/Herbst","small",180,add(t,32),false,null,true,"09-01","10-31");
 addTask("Fenster innen – EG Gäste-WC","EG","Gäste-WC","Fenster Frühjahr/Herbst","small",180,add(t,35),false,null,true,"09-01","10-31");
 addTask("Fenster innen – OG Kinderzimmer 1 Fenster 1","OG","Kinderzimmer 1","Fenster Frühjahr/Herbst","medium",180,add(t,38),false,null,true,"09-01","10-31");
 addTask("Fenster innen – OG Kinderzimmer 1 Fenster 2","OG","Kinderzimmer 1","Fenster Frühjahr/Herbst","medium",180,add(t,41),false,null,true,"09-01","10-31");
 addTask("Fenster innen – OG Kinderzimmer 2 Fenster 1","OG","Kinderzimmer 2","Fenster Frühjahr/Herbst","medium",180,add(t,44),false,null,true,"09-01","10-31");
 addTask("Fenster innen – OG Kinderzimmer 2 Fenster 2","OG","Kinderzimmer 2","Fenster Frühjahr/Herbst","medium",180,add(t,47),false,null,true,"09-01","10-31");
 addTask("Fenster innen – OG Kinderzimmer 2 Fenster 3","OG","Kinderzimmer 2","Fenster Frühjahr/Herbst","medium",180,add(t,50),false,null,true,"09-01","10-31");
 addTask("Fenster innen – OG Kinderbad","OG","Kinderbad","Fenster Frühjahr/Herbst","small",180,add(t,53),false,null,true,"09-01","10-31");
 addTask("Fenster innen – OG Schlafzimmer bodentief","OG","Schlafzimmer","Fenster Frühjahr/Herbst","mighty",180,add(t,56),false,null,true,"09-01","10-31");
 addTask("Fenster innen – OG Ankleide","OG","Ankleidezimmer","Fenster Frühjahr/Herbst","medium",180,add(t,59),false,null,true,"09-01","10-31");
 addTask("Fenster innen – OG Eltern-WC","OG","WC","Fenster Frühjahr/Herbst","small",180,add(t,62),false,null,true,"09-01","10-31");
 addTask("Fenster innen – OG Sauna","OG","Saunaraum","Fenster Frühjahr/Herbst","huge",180,add(t,65),false,null,true,"09-01","10-31");
 addTask("Fenster innen – OG Bad bodentief 1","OG","Bad","Fenster Frühjahr/Herbst","huge",180,add(t,68),false,null,true,"09-01","10-31");
 addTask("Fenster innen – OG Bad bodentief 2","OG","Bad","Fenster Frühjahr/Herbst","huge",180,add(t,71),false,null,true,"09-01","10-31");
 addTask("Riesiges Stiegenhausfenster innen","Haus","Stiegenhaus","Fenster Frühjahr/Herbst","mighty",180,add(t,74),false,null,true,"09-01","10-31");

 // Outside / frames are attached to each section, not one giant task.
 addTask("Fensterrahmen und Falze – EG Garderobe","EG","Garderobe","Fensterrahmen/Falze","small",180,add(t,3),false,null,true,"09-01","10-31");
 addTask("Fensterrahmen und Falze – EG Büro","EG","Büro","Fensterrahmen/Falze","medium",180,add(t,12),false,null,true,"09-01","10-31");
 addTask("Fensterrahmen und Falze – EG Wohnzimmer","EG","Wohnzimmer","Fensterrahmen/Falze","huge",180,add(t,24),false,null,true,"09-01","10-31");
 addTask("Fensterrahmen und Falze – EG Essbereich","EG","Essbereich","Fensterrahmen/Falze","large",180,add(t,36),false,null,true,"09-01","10-31");
 addTask("Fensterrahmen und Falze – EG Küche / Speis","EG","Küche / Speis","Fensterrahmen/Falze","large",180,add(t,48),false,null,true,"09-01","10-31");
 addTask("Fensterrahmen und Falze – OG Kinderzimmer","OG","Kinderzimmer","Fensterrahmen/Falze","large",180,add(t,60),false,null,true,"09-01","10-31");
 addTask("Fensterrahmen und Falze – OG Schlafzimmer / Ankleide","OG","Schlafzimmer / Ankleide","Fensterrahmen/Falze","huge",180,add(t,72),false,null,true,"09-01","10-31");
 addTask("Fensterrahmen und Falze – OG Bad / Sauna","OG","Bad / Sauna","Fensterrahmen/Falze","huge",180,add(t,84),false,null,true,"09-01","10-31");
 addTask("Fensterrahmen und Falze – Stiegenhausfenster","Haus","Stiegenhaus","Fensterrahmen/Falze","mighty",180,add(t,96),false,null,true,"09-01","10-31");

 return {tasks:D,settings:{baby:false,energy:false},meTime:[]};
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
function isDaily(t){
 return t.interval===1 && (
   t.category==="Tägliche Morgenroutine" ||
   t.category==="Nach Mahlzeiten" ||
   t.category==="Tägliche Tagesroutine" ||
   t.category==="Tägliche Abendroutine"
 );
}
function plannedRooms(tasks){
 return new Set(tasks.filter(t=>!isDaily(t)).map(t=>t.room));
}
function plan(d){
 const daily=state.tasks.filter(isDaily);
 const scheduled=state.tasks.filter(t=>!isDaily(t)&&dueCandidate(t,d)).sort((a,b)=>score(b,d)-score(a,d));
 // Daily routine is a permanent baseline and is not a turnus-room package.
 // All additional household work is strictly limited to TWO rooms per day.
 if(day(d)===0 && !state.settings.energy) return daily;
 const cap=state.settings.baby?65:110;
 const chosen=[...daily];
 let total=0;
 const rooms=new Set();

 // Fixed Tuesday sanitary tasks belong to one room at a time. Never add a third room.
 for(const t of scheduled.filter(x=>x.fixed)){
   if(rooms.size<2 || rooms.has(t.room)){
     if(total+minutes(t)<=cap){chosen.push(t);total+=minutes(t);rooms.add(t.room)}
   }
 }

 // A mighty task may fill the additional-work portion of a day, but only in one room.
 const mighty=scheduled.find(t=>t.effort==="mighty" && !rooms.has(t.room) && rooms.size<2);
 if(mighty && total===0){
   chosen.push(mighty);total+=minutes(mighty);rooms.add(mighty.room);
 } else {
   for(const t of scheduled){
     if(chosen.includes(t)) continue;
     if(rooms.size>=2 && !rooms.has(t.room)) continue;
     if(total+minutes(t)>cap) continue;
     if(chosen.some(x=>!isDaily(x)&&x.effort==="mighty")) continue;

     const big=t.effort==="large"||t.effort==="huge"||t.effort==="mighty";
     const bigCount=chosen.filter(x=>!isDaily(x)&&(x.effort==="large"||x.effort==="huge"||x.effort==="mighty")).length;
     if(big && bigCount>=1) continue;

     // Keep a room coherent, but don't dump every task for the room onto one day.
     const roomCount=chosen.filter(x=>!isDaily(x)&&x.room===t.room).length;
     if(roomCount>=3) continue;

     chosen.push(t);total+=minutes(t);rooms.add(t.room);
   }
 }

 if(state.settings.energy){
   for(const t of scheduled){
     if(chosen.includes(t)) continue;
     if(rooms.size>=2 && !rooms.has(t.room)) continue;
     if(total+minutes(t)>Math.min(140,cap+30)) continue;
     chosen.push(t);total+=minutes(t);rooms.add(t.room);
     if(rooms.size>=2 && chosen.filter(x=>!isDaily(x)).length>=6) break;
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
 const d=today(), list=plan(d), extra=list.filter(t=>!isDaily(t)), total=extra.reduce((n,t)=>n+minutes(t),0), cap=state.settings.baby?65:110;
 return `<section class="hero"><h1>Heute · ${new Intl.DateTimeFormat("de-AT",{weekday:"short",day:"2-digit",month:"short"}).format(new Date(d+"T12:00:00"))}</h1>
 <p>${state.settings.baby?"Heute ist ein leichter Tag. Das reicht. ❤️":"Was ist heute sinnvoll UND machbar?"}</p>
 <div class="stats"><div class="stat"><b>${list.length}</b><small>Aufgaben</small></div><div class="stat"><b>${total} Min.</b><small>Zusatzaufwand</small></div><div class="stat"><b>${plannedRooms(list).size}/2</b><small>Turnus-Räume</small></div></div><div class="bar"><i style="width:${Math.min(100,total/cap*100)}%"></i></div></section>
 ${state.settings.energy?`<div class="notice">⚡ Energiemodus ist aktiv.</div>`:""}
 <div class="head"><h2>Tägliche Basisroutine</h2><span class="muted">jeden Tag</span></div>
 <div class="tasks">${list.filter(isDaily).map(t=>taskCard(t,d)).join("")}</div>
 <div class="head"><h2>Heute zusätzlich geplant</h2><span class="muted">${list.filter(t=>!isDaily(t)).reduce((n,t)=>n+minutes(t),0)} Min.</span></div>
 <div class="tasks">${list.filter(t=>!isDaily(t)).map(t=>taskCard(t,d)).join("")||`<div class="empty">Heute ist keine zusätzliche Turnusaufgabe nötig. ❤️</div>`}</div>
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
 <div class="head"><h2>${fmt(selected)}</h2><span class="muted">${plannedRooms(p).size}/2 Räume · ${p.reduce((n,t)=>n+minutes(t),0)} Min.</span></div><div class="tasks">${p.map(t=>taskCard(t,selected)).join("")||`<div class="empty">Keine geplanten Aufgaben.</div>`}</div>`;
}
function catalogView(){
 const q=(window.q||"").toLowerCase(), list=state.tasks.filter(t=>(t.name+" "+t.room+" "+t.floor+" "+t.category+" "+(t.place||"")).toLowerCase().includes(q)).sort((a,b)=>a.due.localeCompare(b.due));
 return `<div class="head"><h1>Aufgabenkatalog</h1><button class="primary add" id="add">＋ Aufgabe</button></div>
 <div class="searchrow"><input class="search" id="search" value="${q}" placeholder="Aufgabe, Raum, Etage, Kategorie …"></div>
 <div class="pillrow"><button class="pill active" type="button">Alle ${state.tasks.length}</button><button class="pill" type="button">Tägliche Routine ${state.tasks.filter(isDaily).length}</button><button class="pill" type="button">Sanitär</button><button class="pill" type="button">Fenster</button><button class="pill" type="button">Küche</button></div>
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