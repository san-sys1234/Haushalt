/* Unser Zuhause – Neuaufbau 2026
   Zentrale Datenbasis + persistierter Plan + lightweight swipe path.
   Der Plan wird einmal erzeugt/aktualisiert; Ansichten lesen nur daraus.
*/
const APP_BUILD='V400';
const STORAGE='unser-zuhause-v400';
const LEGACY_KEYS=['unser-zuhause-v321','unser-zuhause-v310','unser-zuhause-v303','unser-zuhause-v165','unser-zuhause-v148','unser-zuhause-v139','unser-zuhause-v109'];

const DAILY=[
 ['Morgenroutine',['Bett machen','Schlafzimmer kurz lüften','Kleidung wegräumen','Schmutzwäsche in den Wäschekorb','Vorhänge/Raffstores öffnen','Geschirrspüler ausräumen','Frühstücksgeschirr einräumen','Küchenarbeitsfläche abwischen','Esstisch abwischen','Hochstuhl/Essplatz sauber machen','Schuhe, Jacken & Taschen kurz ordnen']],
 ['Nach Mahlzeiten',['Geschirr in den Geschirrspüler','Tisch abwischen','Hochstuhl/Essplatz sauber machen','Heruntergefallenes Essen vom Boden entfernen','Arbeitsfläche bei Bedarf abwischen']],
 ['Abend · max. 10 Minuten',['Geschirrspüler einräumen & einschalten','Küchenflächen kurz abwischen','Spüle kurz sauber machen','Herd kurz sauber machen','Esstisch abwischen','Hochstuhl/Essplatz sauber machen','Müll kontrollieren','Wohnzimmer grob zurücksetzen','Garderobe kurz ordnen','Kleidung wegräumen','Vorhänge/Raffstores schließen']],
 ['Tagescheck',['Restmüll kontrollieren','Biomüll kontrollieren','Wäsche nur bei Bedarf starten','Kühlschrank nur bei Bedarf prüfen','Toiletten nur bei Bedarf prüfen','Küchenboden bei Essensresten reinigen','Sichtbare Bodenflecken beseitigen']]
];

const ROOMS={
 'Wohnzimmer':['Wohnzimmer','EG'],'Essbereich':['Essbereich','EG'],'Küche':['Küche','EG'],'Garderobe':['Garderobe','EG'],'Eingangsbereich':['Eingangsbereich','EG'],'Flur':['Flur','EG'],'Büro':['Büro','EG'],'Abstellraum':['Abstellraum','EG'],'Speis':['Speis','EG'],'Gäste-WC':['Gäste-WC','EG'],'Kinderbad':['Kinderbad','OG'],'Bad':['Bad','OG'],'Eltern-WC':['Eltern-WC','OG'],'Schlafzimmer':['Schlafzimmer','OG'],'Ankleidezimmer':['Ankleidezimmer','OG'],'Kinderzimmer 1':['Kinderzimmer 1','OG'],'Kinderzimmer 2':['Kinderzimmer 2','OG'],'Flur OG':['Flur OG','OG'],'Waschküche':['Waschküche','Keller'],'Musikzimmer':['Musikzimmer','Keller'],'Trainingsraum':['Trainingsraum','Keller'],'Technikraum':['Technikraum','Keller'],'Lagerraum':['Lagerraum','Keller'],'Flur KG':['Flur KG','Keller'],'Saunaraum':['Saunaraum','OG'],'Stiegenhaus':['Stiegenhaus','EG/OG']
};
const ROOM_ORDER=Object.keys(ROOMS);
const BASEMENT=['Waschküche','Musikzimmer','Trainingsraum','Technikraum','Lagerraum','Flur KG'];
const DAY_THEME={1:'EG · Wohnen, Essen & Küche',2:'Bäder & WCs',3:'OG · Schlafen, Kinder & Sauna',4:'EG · Nebenräume',5:'Keller · nur ein Raum',6:'Wäsche + maximal eine Sonderaufgabe',0:'Haushaltsfrei'};
const WEEKDAY_BY_ROOM={Wohnzimmer:1,Essbereich:1,Küche:1,'Gäste-WC':2,Kinderbad:2,Bad:2,'Eltern-WC':2,Schlafzimmer:3,Ankleidezimmer:3,'Kinderzimmer 1':3,'Kinderzimmer 2':3,'Flur OG':3,Saunaraum:3,Stiegenhaus:3,Eingangsbereich:4,Garderobe:4,Flur:4,Büro:4,Abstellraum:4,Speis:4};

const ROTATIONS=[
 {text:"Türklinken reinigen",interval:180,rooms:["Wohnzimmer","Essbereich","Küche","Garderobe","Eingangsbereich","Flur","Büro","Abstellraum","Speis","Gäste-WC","Kinderbad","Bad","Eltern-WC","Schlafzimmer","Ankleidezimmer","Kinderzimmer 1","Kinderzimmer 2","Flur OG","Waschküche","Musikzimmer","Trainingsraum","Technikraum","Lagerraum","Flur KG","Saunaraum","Stiegenhaus"],area:"Raum"},
 {text:"Türblätter gründlich reinigen",interval:365,rooms:["Wohnzimmer","Essbereich","Küche","Garderobe","Eingangsbereich","Flur","Büro","Abstellraum","Speis","Gäste-WC","Kinderbad","Bad","Eltern-WC","Schlafzimmer","Ankleidezimmer","Kinderzimmer 1","Kinderzimmer 2","Flur OG","Waschküche","Musikzimmer","Trainingsraum","Technikraum","Lagerraum","Flur KG","Saunaraum","Stiegenhaus"],area:"Raum"},
 {text:"Sockelleisten reinigen",interval:180,rooms:["Wohnzimmer","Essbereich","Küche","Garderobe","Eingangsbereich","Flur","Büro","Abstellraum","Speis","Gäste-WC","Kinderbad","Bad","Eltern-WC","Schlafzimmer","Ankleidezimmer","Kinderzimmer 1","Kinderzimmer 2","Flur OG","Waschküche","Musikzimmer","Trainingsraum","Technikraum","Lagerraum","Flur KG","Saunaraum","Stiegenhaus"],area:"Raum"},
 {text:"Decken-/Wandecken auf Spinnweben prüfen",interval:120,rooms:["Wohnzimmer","Essbereich","Küche","Garderobe","Eingangsbereich","Flur","Büro","Abstellraum","Speis","Gäste-WC","Kinderbad","Bad","Eltern-WC","Schlafzimmer","Ankleidezimmer","Kinderzimmer 1","Kinderzimmer 2","Flur OG","Waschküche","Musikzimmer","Trainingsraum","Technikraum","Lagerraum","Flur KG","Saunaraum","Stiegenhaus"],area:"Raum"},
 {text:"Lichtschalter außen reinigen",interval:180,rooms:["Wohnzimmer","Essbereich","Küche","Garderobe","Eingangsbereich","Flur","Büro","Abstellraum","Speis","Gäste-WC","Kinderbad","Bad","Eltern-WC","Schlafzimmer","Ankleidezimmer","Kinderzimmer 1","Kinderzimmer 2","Flur OG","Waschküche","Musikzimmer","Trainingsraum","Technikraum","Lagerraum","Flur KG","Saunaraum","Stiegenhaus"],area:"Raum"},
 {text:"Steckdosen außen reinigen",interval:365,rooms:["Wohnzimmer","Essbereich","Küche","Garderobe","Eingangsbereich","Flur","Büro","Abstellraum","Speis","Gäste-WC","Kinderbad","Bad","Eltern-WC","Schlafzimmer","Ankleidezimmer","Kinderzimmer 1","Kinderzimmer 2","Flur OG","Waschküche","Musikzimmer","Trainingsraum","Technikraum","Lagerraum","Flur KG","Saunaraum","Stiegenhaus"],area:"Raum"},
 {text:" Stuck vorsichtig trocken entstauben",interval:30,rooms:["Wohnzimmer","Flur","Stiegenhaus"],area:"Raum"},
 {text:"Vorhangstangen / Schienen reinigen",interval:365,rooms:["Wohnzimmer","Essbereich","Schlafzimmer","Kinderzimmer 1","Kinderzimmer 2","Ankleidezimmer"],area:"Raum"},
 {text:"Erreichbare Lampen reinigen",interval:180,rooms:["Wohnzimmer","Essbereich","Küche","Garderobe","Eingangsbereich","Flur","Büro","Abstellraum","Speis","Gäste-WC","Kinderbad","Bad","Eltern-WC","Schlafzimmer","Ankleidezimmer","Kinderzimmer 1","Kinderzimmer 2","Flur OG","Waschküche","Musikzimmer","Trainingsraum","Technikraum","Lagerraum","Flur KG","Saunaraum","Stiegenhaus"],area:"Raum"},
 {text:" Kühlschrank prüfen und bei Bedarf reinigen",interval:90,rooms:["Küche"],area:"EG"},
 {text:" Backofen gründlich reinigen",interval:90,rooms:["Küche"],area:"EG"},
 {text:" Geschirrspüler: Filter, Dichtung & Pflegeprogramm nach Hersteller",interval:90,rooms:["Küche"],area:"EG"},
 {text:" Waschmaschine: Waschmittelschublade & Dichtung reinigen",interval:90,rooms:["Waschküche"],area:"Keller"},
 {text:" Sauna reinigen / pflegen",interval:90,rooms:["Saunaraum"],area:"OG"},
 {text:" Matratzen wenden/pflegen nach Herstellerangabe",interval:180,rooms:["Schlafzimmer","Kinderzimmer 1","Kinderzimmer 2"],area:"OG"},
 {text:" Fugen & Silikon kontrollieren / materialgerecht reinigen",interval:180,rooms:["Gäste-WC","Kinderbad","Bad","Eltern-WC"],area:"Raum"},
 {text:" Kamin: erkaltete Asche entfernen",interval:60,rooms:["Wohnzimmer"],area:"EG"},
 {text:" Kamin: Feuerraum auskehren",interval:60,rooms:["Wohnzimmer"],area:"EG"},
 {text:" Kaminrost reinigen",interval:60,rooms:["Wohnzimmer"],area:"EG"},
 {text:" Kaminbesteck abwischen",interval:60,rooms:["Wohnzimmer"],area:"EG"},
 {text:" Kaminholz schlichten",interval:14,rooms:["Wohnzimmer"],area:"EG"},
 {text:" Holzablage reinigen",interval:60,rooms:["Wohnzimmer"],area:"EG"},
 {text:" Bereich direkt vor Kamin gründlich absaugen",interval:14,rooms:["Wohnzimmer"],area:"EG"},
 {text:" Ruß-/Aschespuren entfernen",interval:30,rooms:["Wohnzimmer"],area:"EG"},
 {text:" Kaminverkleidung materialgerecht reinigen",interval:90,rooms:["Wohnzimmer"],area:"EG"},
 {text:" Kaminglas reinigen, falls vorhanden",interval:90,rooms:["Wohnzimmer"],area:"EG"},
 {text:" Fachgerechte Kamin-/Schornsteinkontrolle und Wartung nach Vorgabe",interval:365,rooms:["Wohnzimmer"],area:"EG"},
 {text:" Bettwäsche wechseln",interval:14,rooms:["Schlafzimmer","Kinderzimmer 1","Kinderzimmer 2"],area:"OG"},
 {text:" Handtücher wechseln",interval:14,rooms:["Gäste-WC","Kinderbad","Bad","Eltern-WC"],area:"Raum"},
 {text:" Decken nach Pflegeetikett reinigen",interval:365,rooms:["Wohnzimmer","Schlafzimmer","Kinderzimmer 1","Kinderzimmer 2"],area:"Raum"},
 {text:" Teppiche nach Pflegehinweisen reinigen",interval:365,rooms:["Wohnzimmer","Essbereich","Kinderzimmer 1","Kinderzimmer 2"],area:"Raum"},
 {text:" Vorhänge nach Pflegeetikett reinigen",interval:365,rooms:["Wohnzimmer","Essbereich","Schlafzimmer","Kinderzimmer 1","Kinderzimmer 2"],area:"Raum"},
 {text:"Lüftungsgitter außen reinigen, falls vorhanden",interval:180,rooms:["Gäste-WC","Kinderbad","Bad","Eltern-WC","Saunaraum","Technikraum"],area:"Raum"},
 {text:"Rauchmelder Funktionstest nach Herstellerangabe",interval:180,rooms:["Wohnzimmer","Essbereich","Flur","Flur OG","Schlafzimmer","Kinderzimmer 1","Kinderzimmer 2","Flur KG","Stiegenhaus"],area:"Raum"},
 {text:"Rauchmelder äußerlich von Staub befreien",interval:180,rooms:["Wohnzimmer","Essbereich","Flur","Flur OG","Schlafzimmer","Kinderzimmer 1","Kinderzimmer 2","Flur KG","Stiegenhaus"],area:"Raum"}
];

const catalogSeed=[
['Wohnzimmer','EG',['Polster absaugen','Sofaritze absaugen','Sofakissen ausschütteln','Decken ordentlich zusammenlegen','Fernbedienungen sammeln','Dekoration abstauben','Bilderrahmen abstauben','Fensterbank abwischen','Möbelfüße sichtbar reinigen','Teppich gründlich absaugen','Teppichränder kontrollieren','Vorhänge auf Staub prüfen','Kaminbereich reinigen']],
['Essbereich','EG',['Esstischoberseite reinigen','Tischkanten abwischen','Tischbeine abwischen','Stuhlsitze reinigen','Stuhllehnen abwischen','Krümel aus Tischritzen entfernen','Sideboard abstauben','Sideboardfronten abwischen','Dekoration abstauben','Boden unter dem Tisch gründlich reinigen']],
['Küche','EG',['Arbeitsplatten gründlich reinigen','Herd gründlich reinigen','Kochfeldränder reinigen','Dunstabzug außen reinigen','Dunstabzugfilter nach Herstellerangabe reinigen','Spüle entkalken','Armatur entkalken','Backofeninnenraum reinigen','Backofentür reinigen','Backofenbleche reinigen','Mikrowelle reinigen, falls vorhanden','Kühlschrank Fächer reinigen','Kühlschrank Türdichtungen reinigen','Kühlschrank Gemüsefächer reinigen','Gefrierfach prüfen/abtauen nach Herstellerangabe','Vorratsschrank auswischen','Schubladen innen auswischen','Mülleimer auswischen','Fronten gründlich abwischen','Sockelleisten reinigen','Boden unter beweglichen Möbeln reinigen']],
['Garderobe','EG',['Jacken nach Saison ordnen','Schuhe paarweise ordnen','Schuhsohlen bei Bedarf reinigen','Schuhschrank außen reinigen','Schuhschrank innen auswischen','Ablageflächen leeren','Taschen ordnen','Schlüsselplatz reinigen','Spiegel gründlich reinigen','Garderobenhaken abwischen','Türklinken reinigen']],
['Eingangsbereich','EG',['Fußmatte ausschütteln/absaugen','Fußmatte nach Hersteller reinigen','Tür innen abwischen','Tür außen bei Bedarf reinigen','Türrahmen reinigen','Sockelleisten reinigen','Spinnweben entfernen','Boden gründlich saugen','Boden wischen','Ecken kontrollieren']],
['Flur','EG',['Bilderrahmen abstauben','Lichtschalter außen reinigen','Türklinken reinigen','Türrahmen reinigen','Sockelleisten reinigen','Spinnweben entfernen','Ecken absaugen','Boden saugen','Boden wischen']],
['Flur OG','OG',['Bilderrahmen/Dekoration abstauben','Lichtschalter außen reinigen','Türklinken reinigen','Türrahmen reinigen','Sockelleisten reinigen','Spinnweben entfernen','Ecken absaugen','Boden saugen','Boden wischen']],
['Flur KG','Keller',['Lichtschalter außen reinigen','Türklinken reinigen','Türrahmen reinigen','Sockelleisten reinigen','Spinnweben entfernen','Ecken absaugen','Boden saugen','Boden wischen']],
['Büro','EG',['Schreibtisch komplett leeren','Schreibtischfläche reinigen','Monitor außen reinigen','Tastatur reinigen','Maus reinigen','Kabel grob ordnen','Papierstapel sortieren','Papierkorb leeren','Regale abstauben','Bücheroberseiten entstauben','Fensterbank reinigen','Boden saugen','Boden wischen']],
['Abstellraum','EG',['Vorräte prüfen','Reinigungsmittelbestand prüfen','Regale abstauben','Regalböden auswischen','Schubladen auswischen','Besen/Staubsaugerbereich reinigen','Mülltrennung ordnen','Boden gründlich saugen','Boden wischen']],
['Speis','EG',['Vorräte nach Kategorien ordnen','Mindesthaltbarkeit prüfen','Angebrochene Packungen prüfen','Regale abstauben','Regalböden auswischen','Schubladen auswischen','Behälter außen reinigen','Boden unter Regalen reinigen','Boden saugen','Boden wischen']],
['Gäste-WC','EG',['Waschbecken gründlich reinigen','Armatur entkalken','Spiegel reinigen','Toilette innen gründlich reinigen','Toilettenrand reinigen','Toilette außen reinigen','WC-Bürste reinigen','WC-Bürstenhalter innen reinigen','Papierhalter abwischen','Türklinke reinigen','Lichtschalter außen reinigen','Sockelleisten reinigen','Fugen kontrollieren','Boden saugen','Boden wischen']],
['Kinderbad','OG',['Waschbecken gründlich reinigen','Armatur entkalken','Spiegel reinigen','Dusche reinigen','Duschrinne kontrollieren','Badewanne reinigen','Toilette reinigen','WC-Bürste reinigen','WC-Bürstenhalter reinigen','Türklinke reinigen','Lichtschalter außen reinigen','Sockelleisten reinigen','Fugen kontrollieren','Silikon kontrollieren','Boden saugen','Boden wischen']],
['Bad','OG',['Waschbecken gründlich reinigen','Armatur entkalken','Spiegel reinigen','Dusche entkalken','Duschglas reinigen','Duschrinne reinigen','Badewanne reinigen','Badewannenarmatur entkalken','Toilette innen gründlich reinigen','Toilette außen reinigen','WC-Bürste reinigen','WC-Bürstenhalter reinigen','Türklinke reinigen','Lichtschalter außen reinigen','Sockelleisten reinigen','Fugen kontrollieren','Silikon kontrollieren','Boden saugen','Boden wischen']],
['Eltern-WC','OG',['Waschbecken reinigen','Armatur entkalken','Spiegel reinigen','Toilette innen reinigen','Toilettenrand reinigen','Toilette außen reinigen','WC-Bürste reinigen','WC-Bürstenhalter reinigen','Türklinke reinigen','Lichtschalter außen reinigen','Sockelleisten reinigen','Fugen kontrollieren','Boden saugen','Boden wischen']],
['Schlafzimmer','OG',['Bettwäsche wechseln','Matratze absaugen','Matratze nach Hersteller pflegen','Unter Bett saugen','Nachttische komplett reinigen','Lampen außen abstauben','Kopfteil abstauben','Fensterbank reinigen','Spiegel reinigen','Kleidung aussortieren','Boden gründlich saugen','Boden wischen']],
['Ankleidezimmer','OG',['Kleidung nach Saison ordnen','Kleiderbügel vereinheitlichen','Schubladen ordnen','Schubladen auswischen','Regalböden reinigen','Spiegel reinigen','Schrankfronten abwischen','Schrankgriffe reinigen','Boden unter Schränken reinigen','Boden saugen','Boden wischen']],
['Kinderzimmer 1','OG',['Spielzeug grob sortieren','Bücher ordnen','Kleidung ordnen','Schubladen ordnen','Schrankfronten abwischen','Regale abstauben','Fensterbank reinigen','Türklinke reinigen','Boden unter Möbeln saugen','Boden saugen','Boden wischen']],
['Kinderzimmer 2','OG',['Spielzeug grob sortieren','Bücher ordnen','Kleidung ordnen','Schubladen ordnen','Schrankfronten abwischen','Regale abstauben','Fensterbank reinigen','Türklinke reinigen','Boden unter Möbeln saugen','Boden saugen','Boden wischen']],
['Waschküche','Keller',['Waschmaschine außen reinigen','Waschmittelschublade reinigen','Türdichtung reinigen','Waschmaschinenpflegeprogramm nach Hersteller','Trockner außen reinigen','Flusensieb nach Herstellerangabe reinigen','Arbeitsflächen reinigen','Wäschekörbe auswischen','Vorräte an Waschmittel prüfen','Sockelleisten reinigen','Boden saugen','Boden wischen','Bereich hinter/zwischen Geräten nur wenn sicher zugänglich']],
['Musikzimmer','Keller',['Instrumente materialgerecht entstauben','Noten ordnen','Regale abstauben','Oberflächen reinigen','Kabel grob ordnen','Fensterbank reinigen','Sockelleisten reinigen','Boden saugen','Boden wischen']],
['Trainingsraum','Keller',['Trainingsgeräte abwischen','Matten reinigen','Gewichte/Griffe abwischen','Handtücher einsammeln','Ablageflächen ordnen','Spiegel reinigen','Boden saugen','Boden wischen']],
['Technikraum','Keller',['Sichtbaren Staub entfernen','Zugänge freihalten','Boden bei Bedarf reinigen','Keine technischen Komponenten öffnen']],
['Lagerraum','Keller',['Kartons ordnen','Vorräte prüfen','Regale abstauben','Boden saugen','Boden wischen']],
['Saunaraum','OG',['Nach Nutzung lüften','Holzflächen nach Hersteller reinigen','Bänke reinigen','Glasflächen reinigen','Boden saugen','Boden wischen','Saunaofen nur nach Herstellerangabe reinigen']],
['Stiegenhaus','EG/OG',['Stufen saugen','Stufen wischen','Handlauf abwischen','Geländer abstauben','Ecken absaugen','Sockelleisten reinigen','Spinnweben entfernen']],
];
// V269 – umfassende Ergänzung: konkrete Einzelaufgaben, jeweils einem Raum zugeordnet.
// Keine Sammelaufgaben wie „ganzes Haus“, „alle Räume“ oder „alle Türklinken“.

const EXTRA_ROOM_TASKS=[
 ["Wohnzimmer","EG",[
  "Sofa: Polsterbezüge nach Pflegeetikett prüfen/reinigen","Sofa: unter und zwischen den Polstern saugen",
  "Sofa: Armlehnen und Kanten reinigen","Couchtisch: Oberseite und Kanten reinigen","Fernbedienungen abwischen",
  "Elektronikflächen außen abstauben","Lautsprecher außen abstauben","Kabel hinter TV-/Medienmöbeln ordnen",
  "TV-/Medienmöbel: sichtbare Oberflächen reinigen",
"Unter dem Sofa reinigen","Unter dem Couchtisch reinigen","Dekorationsgegenstände einzeln abstauben",
  "Fensterrahmen innen dieses Raumes prüfen","Vorhangstoff nach Pflegeetikett prüfen","Vorhangschiene von Staub befreien"
 ]],
 ["Essbereich","EG",[
  "Stühle: Sitzflächen gründlich reinigen","Stühle: Unterseiten und Kanten reinigen","Stuhlbeine abwischen",
  "Tischunterseite reinigen","Tischfuß / Gestell reinigen","Sideboard: Innenfächer kontrollieren",
  "Sideboard: Griffe reinigen","Sideboard: Schubladen innen auswischen",
"Unter Sideboard reinigen","Unter Stühlen gründlich saugen"
 ]],
 ["Küche","EG",[
  "Küchenschrankgriffe gründlich reinigen","Besteckschublade komplett ausräumen und auswischen","Gewürzschublade ausräumen und auswischen",
  "Schubladenmatten prüfen und reinigen, falls vorhanden","Mülleimer: Innenbehälter gründlich reinigen","Mülleimer: Deckel und Sensor außen reinigen, falls vorhanden",
  "Spülenablauf und Sieb reinigen","Spülenüberlauf reinigen","Wasserhahn-Auslauf prüfen und reinigen","Wasserhahn-Sieb / Perlator entkalken",
  "Wasserfilter der Küchenarmatur wechseln, falls vorhanden","Kaffeemaschine Außenflächen reinigen","Kaffeemaschine Brühgruppe nach Herstellerangabe pflegen, falls zugänglich",
  "Wasserkocher entkalken, falls vorhanden","Toaster Krümelwanne reinigen, falls vorhanden","Mixer / Küchenmaschine außen reinigen, falls vorhanden",
  "Küchenwaage reinigen","Schneidebretter materialgerecht gründlich reinigen","Spülmaschinensalz prüfen, falls vorhanden","Klarspüler prüfen, falls vorhanden",
  "Kühlschrank: Türfächer reinigen","Kühlschrank: Gemüsefächer reinigen","Kühlschrank: Ablauföffnung prüfen/reinigen, falls vorhanden",
  "Gefrierfach: Vorräte kontrollieren","Gefrierfach: Schubladen auswischen","Backofen: Dichtung außen prüfen und reinigen",
  "Backofen: Einschubgitter reinigen","Backofen: Fettfilter / Geruchsfilter nach Herstellerangabe prüfen, falls vorhanden",
  "Dunstabzug: Bedienknöpfe reinigen","Dunstabzug: Unterseite gründlich entfetten","Küchenfronten: Griffe und Kanten einzeln reinigen",
  "Sockelleisten hinter/unter Küchenmöbeln reinigen, soweit zugänglich"
 ]],
 ["Garderobe","EG",[
  "Spiegel komplett streifenfrei reinigen","Garderobenbank reinigen","Garderobenbank unterhalb reinigen","Schuhschrank: Fächer auswischen",
  "Schuhschrank: Schuhmatten reinigen","Schirmständer leeren und auswischen","Schlüsselablage reinigen","Taschenablage reinigen",
  "Garderobenhaken gründlich reinigen",
  "Boden unter Schuhschrank reinigen","Saisonale Kleidung vollständig umsortieren"
 ]],
 ["Eingangsbereich","EG",[
  "Haustür innen gründlich reinigen","Haustür außen gründlich reinigen, wenn sicher möglich","Haustürgriff innen reinigen","Haustürgriff außen reinigen",
  "Türdichtung der Haustür sichtbar prüfen","Türspion reinigen, falls vorhanden","Briefkasten außen reinigen, falls vorhanden",
  "Briefkasten innen reinigen, falls vorhanden","Hausnummer reinigen, falls vorhanden","Türklingel außen reinigen, falls vorhanden",
  "Außenleuchte am Eingang außen abstauben, falls sicher erreichbar","Fußmatte tiefenreinigen"
 ]],
 ["Flur","EG",[
  "Konsole / Ablageflächen reinigen","Dekoration abstauben","Spiegel reinigen, falls vorhanden","Boden unter Möbeln reinigen"
 ]],
 ["Flur OG","OG",[
  "Konsole / Ablageflächen reinigen","Dekoration abstauben","Spiegel reinigen, falls vorhanden","Boden unter Möbeln reinigen"
 ]],
 ["Flur KG","Keller",[
  "Lager-/Ablageflächen reinigen","Boden unter Regalen reinigen"
 ]],
 ["Büro","EG",[
  "Bürostuhl Sitzfläche reinigen","Bürostuhl Rollen und Standfuß reinigen","Schreibtischschubladen innen auswischen",
  "Drucker außen reinigen, falls vorhanden","Drucker Papierfach reinigen, falls vorhanden","Scannerfläche reinigen, falls vorhanden",
  "Aktenablage ordnen","Altpapier prüfen und aussortieren","Aktenvernichter außen reinigen, falls vorhanden","Aktenvernichter Behälter leeren, falls vorhanden",
  "Kabel unter dem Schreibtisch ordnen",
  "Boden unter dem Schreibtisch reinigen"
 ]],
 ["Abstellraum","EG",[
  "Staubsauger: Staubbehälter leeren / Beutel prüfen","Staubsauger: Filter nach Herstellerangabe reinigen","Staubsauger: Bürstenrolle reinigen, falls vorhanden",
  "Staubsauger: Düsen und Aufsätze reinigen","Dampfreiniger: Wassertank leeren und reinigen, falls vorhanden","Dampfreiniger: Tücher waschen, falls vorhanden",
  "Wischeimer reinigen und trocknen","Wischmopp / Mopkopf nach Pflegehinweis waschen","Reinigungstücher nach Pflegehinweis waschen",
  "Reinigungstücher auf Verschleiß prüfen","Reinigungsbürsten reinigen","Schwämme auf Verschleiß prüfen und ersetzen",
  "Batterien / Akkus im Haushaltsvorrat prüfen","Ersatz-Leuchtmittelbestand prüfen","Klebeband / Haken / Haushaltskleinteile ordnen"
 ]],
 ["Speis","EG",[
  "Vorratsbehälter außen reinigen","Vorratsbehälter innen reinigen, wenn leer","Gewürze auf Haltbarkeit prüfen","Konserven auf Haltbarkeit prüfen",
  "Getränkevorräte prüfen","Backvorräte prüfen","Tierfutter / sonstige Vorräte prüfen, falls vorhanden","Vorratskisten unter Regalen reinigen",
  "Regaloberseiten reinigen","Boden unter Regalen reinigen"
 ]],
 ["Gäste-WC","EG",[
  "Seifenspender reinigen","Seifenspender nachfüllen","Handtuchhalter reinigen","Mülleimer innen reinigen","Mülleimer außen reinigen",
  "Toilettenspülknopf reinigen","Toilettendeckel gründlich reinigen","Toilettensitz-Scharniere reinigen","Toilettenrand von außen reinigen",
  "Lüftungsgitter reinigen, falls vorhanden",
  "Badematte nach Pflegeetikett waschen, falls vorhanden"
 ]],
 ["Kinderbad","OG",[
  "Seifenspender reinigen","Seifenspender nachfüllen","Handtuchhalter reinigen","Mülleimer innen reinigen","Mülleimer außen reinigen",
  "Toilettenspülknopf reinigen","Toilettensitz-Scharniere reinigen","Duschkopf entkalken","Duschschlauch außen reinigen",
  "Duschschienen / Führungsschienen reinigen","Duschablauf-Haarsieb reinigen","Lüftungsgitter reinigen, falls vorhanden",
"Badematte nach Pflegeetikett waschen, falls vorhanden","Handtücher nach Pflegeetikett waschen"
 ]],
 ["Bad","OG",[
  "Seifenspender reinigen","Seifenspender nachfüllen","Handtuchhalter reinigen","Mülleimer innen reinigen","Mülleimer außen reinigen",
  "Toilettenspülknopf reinigen","Toilettensitz-Scharniere reinigen","Duschkopf entkalken","Duschschlauch außen reinigen",
  "Duschschienen / Führungsschienen reinigen","Duschablauf-Haarsieb reinigen","Lüftungsgitter reinigen, falls vorhanden",
"Badematte nach Pflegeetikett waschen, falls vorhanden","Handtücher nach Pflegeetikett waschen"
 ]],
 ["Eltern-WC","OG",[
  "Seifenspender reinigen","Seifenspender nachfüllen","Handtuchhalter reinigen","Mülleimer innen reinigen","Mülleimer außen reinigen",
  "Toilettenspülknopf reinigen","Toilettensitz-Scharniere reinigen","Lüftungsgitter reinigen, falls vorhanden",
"Badematte nach Pflegeetikett waschen, falls vorhanden"
 ]],
 ["Schlafzimmer","OG",[
  "Kopfkissen nach Pflegeetikett reinigen / waschen","Bettdecke nach Pflegeetikett reinigen / waschen","Matratzenschoner nach Pflegeetikett waschen",
  "Lattenrost / Bettunterbau absaugen, soweit zugänglich","Nachttischschubladen innen auswischen","Nachttischlampen außen reinigen",
  "Ladegeräte / Kabel am Nachttisch ordnen",
  "Unter dem Bett bis in die Ecken saugen","Vorhangstoff nach Pflegeetikett prüfen"
 ]],
 ["Ankleidezimmer","OG",[
  "Kleiderschrank: Griffe reinigen","Kleiderschrank: Schrankoberseiten reinigen","Kleiderschrank: Innenboden eines Abteils reinigen",
  "Schuhablage reinigen","Taschenablage reinigen","Spiegel streifenfrei reinigen",
  "Boden unter Schränken reinigen"
 ]],
 ["Kinderzimmer 1","OG",[
  "Spielzeugkisten innen auswischen","Spielzeugkisten außen reinigen","Stofftiere nach Pflegehinweis reinigen","Bücherregal innen auswischen",
  "Schreibtisch / Bastelfläche reinigen, falls vorhanden","Matratzenschoner waschen","Kissen nach Pflegeetikett reinigen",
"Unter dem Bett saugen","Vorhänge / Rollos nach Pflegehinweis prüfen"
 ]],
 ["Kinderzimmer 2","OG",[
  "Spielzeugkisten innen auswischen","Spielzeugkisten außen reinigen","Stofftiere nach Pflegehinweis reinigen","Bücherregal innen auswischen",
  "Schreibtisch / Bastelfläche reinigen, falls vorhanden","Matratzenschoner waschen","Kissen nach Pflegeetikett reinigen",
"Unter dem Bett saugen","Vorhänge / Rollos nach Pflegehinweis prüfen"
 ]],
 ["Waschküche","Keller",[
  "Waschmaschine: Flusensieb / Fremdkörperfalle nach Herstellerangabe prüfen","Waschmaschine: Einspülkammer vollständig reinigen","Waschmaschine: Türglas reinigen",
  "Trockner: Flusensiebaufnahme reinigen","Trockner: Kondensator / Wärmetauscher nach Herstellerangabe pflegen, falls vorhanden",
  "Trockner: Wasserbehälter leeren/reinigen, falls vorhanden","Ablaufschlauch / sichtbare Anschlüsse auf Auffälligkeiten prüfen",
  "Bodenablauf reinigen, falls vorhanden","Bügelbrettbezug prüfen / waschen","Bügeleisen Sohle reinigen","Wäscheständer reinigen",
  "Wäscheklammern reinigen / aussortieren","Wäschevorräte (Waschmittel, Fleckentferner) prüfen"
 ]],
 ["Musikzimmer","Keller",[
  "Instrumentenständer abstauben","Notenständer reinigen","Notenablage ordnen","Kabel und Netzteile ordnen","Steckdosenleisten außen reinigen",
  "Schutzhüllen nach Pflegehinweis reinigen",
  "Boden unter Möbeln reinigen"
 ]],
 ["Trainingsraum","Keller",[
  "Trainingsgeräte auf sichtbare Verschmutzung und sicheren Zustand prüfen","Griffe und Kontaktflächen gründlich reinigen","Trainingsmatten Unterseite reinigen",
  "Spiegel streifenfrei reinigen","Handtuchvorrat prüfen","Ablagen reinigen",
  "Boden unter Geräten reinigen"
 ]],
 ["Technikraum","Keller",[
  "Heizungsanlage nur äußerlich auf sichtbare Auffälligkeiten prüfen","Lüftungs-/Technikgitter außen reinigen, falls vorhanden","Lüftungsfilter nach Herstellerangabe prüfen/wechseln, falls vorhanden",
  "Wasserfilter / Hauswasserfilter nach Herstellerangabe prüfen, falls vorhanden","Wasserenthärtung: Salzvorrat prüfen, falls vorhanden","Bodenablauf reinigen, falls vorhanden",
  "Absperrventile und Zugänge frei halten","Feuerlöscher äußerlich und Prüftermin kontrollieren, falls vorhanden","Rauchmelder-Test nach Herstellerangabe vorbereiten/prüfen, falls im Raum",
  "CO-Melder-Test nach Herstellerangabe, falls vorhanden","Technikraum auf sichtbare Feuchtigkeit / Leckspuren prüfen"
 ]],
 ["Lagerraum","Keller",[
  "Kartons auf Beschädigung / Feuchtigkeit prüfen","Aufbewahrungsboxen außen reinigen","Regaloberseiten reinigen","Regalfußbereiche reinigen",
  "Nicht mehr benötigte Gegenstände für Ausmisten markieren","Saisonartikel prüfen","Weihnachts-/Dekoartikel ordnen, falls vorhanden","Boden unter Regalen reinigen"
 ]],
 ["Saunaraum","OG",[
  "Sauna-Holzflächen auf sichtbare Verschmutzung prüfen","Saunabänke Unterseiten / Kanten reinigen","Sauna-Kopfstützen nach Pflegehinweis reinigen",
  "Sauna-Eimer reinigen","Saunakelle reinigen","Hygrometer / Thermometer außen reinigen","Saunatürglas reinigen","Saunatürdichtung sichtbar prüfen",
  "Sauna-Lüftungsgitter reinigen, falls vorhanden","Bodenablauf reinigen, falls vorhanden","Saunasteine nach Herstellerangabe prüfen, falls vorgesehen"
 ]],
 ["Stiegenhaus","EG/OG",[
  "Handlauf gründlich reinigen","Geländerstäbe einzeln reinigen","Geländeroberseite abwischen","Treppenstufen Kanten reinigen",
  "Treppenpodest reinigen","Wandleuchten außen reinigen","Bilder / Dekoration abstauben"
 ]]
];

// Keine pauschalen Keller-Aufgaben: Jeder Raum erhält nur konkrete Tätigkeiten.

// Türrahmen/Zargen werden bewusst raumweise geführt – nie als „ganzes Haus“-Aufgabe.
// Dadurch kann der Planer das Pensum pro Raum sinnvoll portionieren.

const WINDOW_INVENTORY = [
 ["KG","Waschküche",2],["KG","Musikzimmer",2],["KG","Technikraum",2],["KG","Trainingsraum",2],["KG","Flur KG",2],["KG","Stiegenhaus",1],
 ["EG","Garderobe",1],["EG","Büro",3],["EG","Wohnzimmer",1],["EG","Essbereich",2],["EG","Küche",2],["EG","Speis",1],["EG","Abstellraum",1],["EG","Gäste-WC",1],
 ["OG","Kinderzimmer 1",2],["OG","Kinderzimmer 2",3],["OG","Kinderbad",1],["OG","Schlafzimmer",1],["OG","Ankleide",1],["OG","Eltern-WC",1],["OG","Saunaraum",1],["OG","Bad",2]
];

const EFFORTS={mini:{label:'Mini',minutes:10,score:1},klein:{label:'Klein',minutes:20,score:2},mittel:{label:'Mittel',minutes:30,score:3},gross:{label:'Groß',minutes:55,score:5},sehrgross:{label:'Sehr groß',minutes:80,score:7},maechtig:{label:'Mächtig',minutes:105,score:9}};
const EFFORT_ORDER=['mini','klein','mittel','gross','sehrgross','maechtig'];
const FIRST_PASS_DEADLINE='2027-04-01';
const PLAN_DAYS=180;
const MAX_ROOMS=2;

function uid(){return 't_'+Math.random().toString(36).slice(2,10)+'_'+Date.now().toString(36)}
function pad(n){return String(n).padStart(2,'0')}
function iso(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())}
function fromKey(k){return new Date(k+'T12:00:00')}
function addDays(d,n){const x=new Date(d);x.setHours(12,0,0,0);x.setDate(x.getDate()+n);return x}
function dateDiff(a,b){return Math.round((fromKey(a)-fromKey(b))/86400000)}
function dayKey(){return iso(new Date())}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function fmt(k){if(!k)return '—';return fromKey(k).toLocaleDateString('de-AT',{day:'2-digit',month:'2-digit',year:'numeric'})}
function shortFmt(k){if(!k)return '—';return fromKey(k).toLocaleDateString('de-AT',{day:'2-digit',month:'2-digit'})}
function isSunday(k){return fromKey(k).getDay()===0}
function isFree(k){return isSunday(k) || !!(appState?.freeDays?.[k])}
function effortScore(x){return EFFORTS[x.effort||'mittel']?.score||3}
function effortLabel(x){return EFFORTS[x.effort||'mittel']?.label||'Mittel'}
function effortMinutes(x){return EFFORTS[x.effort||'mittel']?.minutes||30}
function clamp(n,a,b){return Math.max(a,Math.min(b,n))}
function stableId(text,room){return 'seed_'+btoa(unescape(encodeURIComponent(room+'|'+text))).replace(/[^a-zA-Z0-9]/g,'').slice(0,34)}
function getStorage(){try{return JSON.parse(localStorage.getItem(STORAGE)||'null')}catch{return null}}

let selectedTab='today';
let catalogQuery='';
let catalogRoom='';
let calendarDate=new Date();
let plannerTimer=0;
let persistTimer=0;
let planBusy=false;
let swipeQueue=[];
let state=null; let appState=null;
state=loadState(); appState=state;

function defaultState(){return {version:400,tasks:[],plan:{},history:{},completedDays:{},freeDays:{},settings:{lightMode:false,energy:0},catalogOpen:{},todayCollapsed:{done:false,later:false},customDeleted:{},calendarYear:new Date().getFullYear(),planRevision:0}}

function normalizeTask(t){
  const x={...t};
  x.id=String(x.id||uid()); x.text=String(x.text||'Aufgabe'); x.room=String(x.room||''); x.area=String(x.area||'');
  x.place=String(x.place||x.room); x.description=String(x.description||''); x.effort=EFFORTS[x.effort]?x.effort:'mittel';
  x.interval=Math.max(1,Number(x.interval||30)); x.firstDate=x.firstDate||x.nextDate||dayKey(); x.nextDate=x.nextDate||x.firstDate;
  x.weekday=x.weekday==null?'':Number(x.weekday); x.exact=!!x.exact; x.active=x.active!==false; x.daily=!!x.daily; x.season=x.season||null; x.package=x.package||''; x.source=x.source||'seed';
  return x;
}

function loadState(){
  let s=getStorage();
  if(s&&s.tasks){s=mergeDefaults(s);return s}
  // migrate only useful user data; planning itself is rebuilt cleanly
  for(const key of LEGACY_KEYS){
    try{
      const old=JSON.parse(localStorage.getItem(key)||'null');
      if(old){s=mergeDefaults({custom:old.custom||[],catalogEdits:old.catalogEdits||{},catalogDeleted:old.catalogDeleted||{},effortOverrides:old.effortOverrides||{},history:old.completionHistory||{},freeDays:old.householdFreeDays||{},settings:{lightMode:!!old.chaos}});break}
    }catch{}
  }
  s=s||defaultState();
  s.tasks=buildSeedTasks(s);
  const migratedCustom=(s.custom||[]).map(x=>normalizeTask({...x,id:x.id||uid(),source:'custom',active:true}));
  for(const t of migratedCustom) if(!s.tasks.some(x=>x.id===t.id)) s.tasks.push(t);
  delete s.custom; s.plan={};
  ensureInitialPlan(s);
  try{localStorage.setItem(STORAGE,JSON.stringify(s))}catch{}
  return s;
}
function mergeDefaults(s){const d=defaultState();return {...d,...s,settings:{...d.settings,...(s.settings||{})},freeDays:{...(s.freeDays||{})},history:{...(s.history||{})},plan:{...(s.plan||{})},tasks:(s.tasks||[]).map(normalizeTask)}}

function inferEffort(text,room){
  const t=text.toLowerCase();
  if(/fenster\s+(?:kg|eg|og)|fensteretappe|raffstore/.test(t)) return 'maechtig';
  if(/backofen|dunstabzug|matratze|vorhang|teppich|kamin|gründlich|grundlich|schubladen komplett|schrankoberseiten|unter dem/.test(t)) return 'mittel';
  if(/boden|dusche|wanne|fugen|sockelleisten|bettwäsche|handtücher|filter|dichtung|kühlschrank|waschmaschine/.test(t)) return 'klein';
  if(/griffe|lichtschalter|steckdosen|spiegel|ablage|deko|abwischen|prüfen|kontrollieren|ordnen/.test(t)) return 'klein';
  return 'klein';
}
function inferInterval(text){
  const t=text.toLowerCase();
  if(/wöchentlich|jede woche|wc|waschbecken/.test(t)) return 7;
  if(/bettwäsche|handtücher/.test(t)) return 14;
  if(/monat|kühlschrank|geschirrspüler|waschmaschine/.test(t)) return 30;
  if(/kaminholz|kaminbereich|ablage/.test(t)) return 30;
  if(/viertel|90|backofen|dunstabzug/.test(t)) return 90;
  if(/halb|180|sockelleisten|matratze|lichtschalter/.test(t)) return 180;
  if(/jähr|365|türblätter|steckdosen|vorhang|teppich/.test(t)) return 365;
  return 60;
}
function pkgFor(text){
  const t=text.toLowerCase();
  if(/fenster|raffstore/.test(t)) return 'Fenster & Sonnenschutz';
  if(/wc|toilette|waschbecken|seif|handtuch|lüftungsgitter|badematte/.test(t)) return 'Hygiene';
  if(/dusche|wanne|fugen|silikon|duschkopf|ablauf/.test(t)) return 'Dusche & Wanne';
  if(/boden|sockelleisten|stufen|ecken/.test(t)) return 'Boden & Sockelleisten';
  if(/front|spüle|herd|kochfeld|backofen|dunstabzug|küchen|kaffee|kühlschrank/.test(t)) return 'Küche';
  if(/schublade|schrank|regal|ordnung|sortieren|vorrat|ablage/.test(t)) return 'Ordnung & Organisation';
  if(/bett|matratze|vorhang|teppich|decke|textil/.test(t)) return 'Textilien';
  if(/waschmaschine|trockner|bügeleisen|sauna|kamin|gerät|filter/.test(t)) return 'Pflege & Geräte';
  return 'Oberflächen & Details';
}

function buildSeedTasks(existing){
  const out=[]; const seen=new Set();
  const add=(o)=>{const t=normalizeTask(o);if(seen.has(t.id))return;seen.add(t.id);out.push(t)};
  for(const [room,area,tasks] of (typeof catalogSeed!=='undefined'?catalogSeed:[])){
    for(const text of tasks){
      const id=stableId(text,room); const old=(existing.tasks||[]).find(t=>t.id===id);
      add({id,text:text.trim(),room,area,place:room,description:'Sinnvolle Teilaufgabe dieses Raumes.',effort:old?.effort||inferEffort(text,room),interval:old?.interval||inferInterval(text),firstDate:old?.firstDate||dayKey(),nextDate:old?.nextDate||dayKey(),weekday:WEEKDAY_BY_ROOM[room]||'',exact:false,package:pkgFor(text),source:'seed'});
    }
  }
  for(const [room,area,tasks] of (typeof EXTRA_ROOM_TASKS!=='undefined'?EXTRA_ROOM_TASKS:[])){
    for(const text of tasks){const id=stableId(text,room);const old=(existing.tasks||[]).find(t=>t.id===id);add({id,text:text.trim(),room,area,place:room,description:'Konkrete, abgegrenzte Aufgabe.',effort:old?.effort||inferEffort(text,room),interval:old?.interval||inferInterval(text),firstDate:old?.firstDate||dayKey(),nextDate:old?.nextDate||dayKey(),weekday:WEEKDAY_BY_ROOM[room]||'',exact:false,package:pkgFor(text),source:'seed'});}
  }
  // Fixed Tuesday sanitary packages: alternating A/B, one coherent package per Tuesday.
  for(const roomPair of [['Gäste-WC','Kinderbad'],['Bad','Eltern-WC']]){
    const text='Dienstag · WC & Waschbecken gründlich reinigen';
    const id='fixed_'+roomPair.join('_');
    add({id,text,room:roomPair.join(' + '),area:'Sanitärräume',place:roomPair.join(' + '),description:'Festes Dienstagspaket. Termin darf nicht verschoben werden.',effort:'gross',interval:14,firstDate:nextTuesday(dayKey()),nextDate:nextTuesday(dayKey()),weekday:2,exact:true,package:'Hygiene',source:'fixed'});
  }
  // Windows: each room section is an independent seasonal task. No whole-house window task.
  if(typeof WINDOW_INVENTORY!=='undefined'){
    for(const [area,room,count] of WINDOW_INVENTORY){
      const text=`Fenster ${area} · ${room} – innen, außen, Rahmen & Falze`;
      const id='window_'+stableId(text,room);
      add({id,text,room,area,place:room,description:`Fensteretappe für ${count} Fensterelemente. Nicht mit weiteren großen Aufgaben kombinieren.`,effort:count>=3||room==='Stiegenhaus'?'maechtig':'gross',interval:180,firstDate:dayKey(),nextDate:dayKey(),weekday:'',exact:false,season:{from:'04-01',to:'05-31'},package:'Fenster & Sonnenschutz',source:'window'});
      // autumn is represented by the same task; season resolver allows Sep-Oct as well.
    }
  }
  return out;
}
function nextTuesday(k){let d=fromKey(k);const add=(2-d.getDay()+7)%7||7;return iso(addDays(d,add))}

function seasonAllowed(task,k){
  if(task.source!=='window' && !task.season)return true;
  if(task.source==='window'){
    const md=k.slice(5);
    return (md>='04-01'&&md<='05-31')||(md>='09-01'&&md<='10-31');
  }
  const s=task.season;if(!s?.from||!s?.to)return true;const md=k.slice(5);return md>=s.from&&md<=s.to;
}
function taskRooms(t){return String(t.room||'').split(' + ').filter(Boolean)}
function packageKey(t){return `${t.area}|${t.package||pkgFor(t.text)}`}
function compatible(t,dayTasks){
  const rooms=new Set(dayTasks.flatMap(taskRooms));
  const addRooms=taskRooms(t); addRooms.forEach(r=>rooms.add(r));
  if(rooms.size>MAX_ROOMS)return false;
  const current=dayTasks.reduce((s,x)=>s+effortScore(x),0);const w=effortScore(t);
  if(w>=9)return dayTasks.length===0 || (dayTasks.length===1 && effortScore(dayTasks[0])===1);
  if(w>=5 && current+w>7)return false;
  if(current+w>7)return false;
  if(dayTasks.some(x=>x.source==='window')||t.source==='window')return dayTasks.length===0;
  const same=dayTasks.filter(x=>packageKey(x)===packageKey(t)).length;
  if(same>=4 && w<3)return false;
  return true;
}
function preferredDay(task,start,dir=1){
  let d=fromKey(start);
  for(let i=0;i<45;i++){
    const k=iso(d); if(!isFree(k)&&seasonAllowed(task,k)){
      if(!task.weekday || Number(task.weekday)===d.getDay())return k;
    }
    d=addDays(d,dir);
  }
  return null;
}
function idealDate(task,base){
  if(task.nextDate)return task.nextDate;
  return task.firstDate||base;
}
function candidatesForDay(k, remaining){
  const dayTasks=[];
  const day=new Date(k+'T12:00:00');
  const dow=day.getDay();
  const pool=remaining.filter(t=>t.active&&!t.daily&&seasonAllowed(t,k));
  pool.sort((a,b)=>scoreCandidate(b,k)-scoreCandidate(a,k));
  for(const t of pool){
    if(!compatible(t,dayTasks))continue;
    // weekly room theme: prefer matching room; exceptions can still fill the day when overdue.
    const theme=roomThemeMatch(t,dow);
    if(theme<0 && daysUntil(t,k)<-10) continue;
    dayTasks.push(t);
    if(dayTasks.length>=8)break;
    if(dayTasks.some(x=>effortScore(x)>=9))break;
  }
  return dayTasks;
}
function roomThemeMatch(t,dow){
  const rooms=taskRooms(t); if(!rooms.length)return 0;
  if(t.source==='fixed')return 5;
  if(dow===5)return rooms.some(r=>BASEMENT.includes(r))?5:-1;
  if(dow===6)return 1;
  const target=rooms.map(r=>WEEKDAY_BY_ROOM[r]).filter(Boolean);if(!target.length)return 0;return target.includes(dow)?3:-1;
}
function daysUntil(t,k){return dateDiff(k,idealDate(t,k))}
function scoreCandidate(t,k){
  const due=daysUntil(t,k);let s=0;
  s+=clamp(30-due,0,60); // due/overdue
  s+=Math.max(0,Math.round(14/t.interval));
  s+=t.exact?80:0;
  s+=t.source==='fixed'?100:0;
  s+=t.source==='window'?(k.slice(5)>='10-20'?20:5):0;
  s+=roomThemeMatch(t,fromKey(k).getDay())*3;
  return s;
}
function planDayAllowed(k){const d=fromKey(k);return !isFree(k)&&d.getDay()!==3}
function extraWeekdayFree(k){const d=fromKey(k);if(d.getDay()!==4)return false;const jan=new Date(d.getFullYear(),0,1,12);return Math.floor((d-jan)/604800000)%2===1}
function canPlaceInitial(t,k,stats){
  if(!seasonAllowed(t,k)||isSunday(k))return false;
  if(t.exact)return fromKey(k).getDay()===Number(t.weekday);
  const dow=fromKey(k).getDay();
  if(dow===2)return false;
  if(t.source==='window')return (stats[k]?.load||0)===0;
  if(extraWeekdayFree(k))return false;
  const st=stats[k]||{load:0,rooms:new Set(),tasks:[]};
  const rooms=new Set(st.rooms); taskRooms(t).forEach(r=>rooms.add(r));
  if(rooms.size>MAX_ROOMS)return false;
  const w=effortScore(t); if(w>=9)return st.load===0; if(st.load+w>12)return false;
  if(st.tasks.some(x=>x.source==='window'))return false;
  if(st.tasks.filter(x=>packageKey(x)===packageKey(t)).length>=8)return false;
  return true;
}
function ensureInitialPlan(s){
  const today=dayKey(); s.plan={}; const stats={};
  const completedIds=new Set(Object.keys(s.history||{}).filter(k=>Array.isArray(s.history[k])&&s.history[k].some(e=>e.type==='done')));
  const never=s.tasks.filter(t=>t.active&&!t.daily&&!completedIds.has(t.id));
  const ordered=never.slice().sort((a,b)=>{
    const aw=effortScore(a),bw=effortScore(b); if(a.source==='window'&&b.source!=='window')return -1;if(b.source==='window'&&a.source!=='window')return 1;return bw-aw||a.room.localeCompare(b.room,'de');
  });
  for(const t of ordered){
    let placed=false;
    for(let off=0;off<=180&&!placed;off++){
      const k=iso(addDays(fromKey(today),off));
      if(k>FIRST_PASS_DEADLINE&&t.source!=='window')break;
      if(t.source==='window'&&k>'2026-10-31')continue;
      if(canPlaceInitial(t,k,stats)){
        s.plan[t.id]=k; const st=stats[k]??{load:0,rooms:new Set(),tasks:[]}; st.load+=effortScore(t); taskRooms(t).forEach(r=>st.rooms.add(r)); st.tasks.push(t); stats[k]=st; placed=true;
      }
    }
    if(!placed){
      // Never dump leftovers onto one day. Search a legal low-load day first; only seasonal windows may begin again in spring.
      let best=null,bestLoad=Infinity;
      for(let off=0;off<=240;off++){
        const k=iso(addDays(fromKey(today),off));
        if(!seasonAllowed(t,k)||isSunday(k))continue;
        if(t.source!=='window' && extraWeekdayFree(k))continue;
        if(t.source!=='window' && fromKey(k).getDay()===2)continue;
        if(t.source==='window' && fromKey(k).getDay()===2)continue;
        const st=stats[k]||{load:0,rooms:new Set(),tasks:[]};
        if(canPlaceInitial(t,k,stats)){best=k;break}
        if(st.load<bestLoad && st.load<12){best=k;bestLoad=st.load}
      }
      const k=best||preferredDay(t,today,1)||today;
      s.plan[t.id]=k;
      const st=stats[k]??{load:0,rooms:new Set(),tasks:[]}; st.load+=effortScore(t); taskRooms(t).forEach(r=>st.rooms.add(r)); st.tasks.push(t); stats[k]=st;
    }
  }
  // Tuesday sanitary packages alternate: A this Tuesday, B next Tuesday, then every 14 days.
  const fixed=s.tasks.filter(t=>t.exact&&t.source==='fixed');
  fixed.forEach((t,i)=>s.plan[t.id]=iso(addDays(fromKey(nextTuesday(today)),i*7)));
  repairConcreteDates(s);
}
function buildForwardPlan(s,start,horizon){
  const tasks=s.tasks.filter(t=>t.active&&!t.daily);
  const occupied={};
  for(const [id,k] of Object.entries(s.plan)){if(k) (occupied[k]??=[]).push(id)}
  // We only assign if missing; this preserves manually moved/custom dates.
  for(const t of tasks){
    if(s.plan[t.id])continue;
    let k=preferredDay(t,t.firstDate||start,1); if(!k)continue;
    s.plan[t.id]=k;
  }
  // Resolve collisions and ensure overdue tasks are not stranded.
  const sorted=tasks.slice().sort((a,b)=>scoreCandidate(b,start)-scoreCandidate(a,start));
  for(const t of sorted){
    let k=s.plan[t.id]; if(!k)continue;
    if(isFree(k)||!seasonAllowed(t,k)||dateDiff(k,start)>horizon){
      k=preferredDay(t,start,1)||k;s.plan[t.id]=k;
    }
  }
}
function repairConcreteDates(s){
  for(const t of s.tasks){
    if(!t.active||t.daily)continue;
    let k=s.plan[t.id];
    if(!k || !/^\d{4}-\d{2}-\d{2}$/.test(k) || isFree(k) || !seasonAllowed(t,k)){
      k=preferredDay(t,t.firstDate||dayKey(),1)||preferredDay(t,dayKey(),1)||FIRST_PASS_DEADLINE;
      if(isFree(k))k=preferredDay(t,addDays(fromKey(k),1).toISOString().slice(0,10),1)||k;
      s.plan[t.id]=k;
    }
  }
}
function replanAll(){
  if(planBusy)return;planBusy=true;
  // Preserve explicit dates, rebuild only missing/invalid dates.
  for(const t of state.tasks){if(!t.active||t.daily)continue; if(t.exact){const p=state.plan[t.id];if(p&&!isSunday(p))continue;} }
  const plan={...state.plan};
  const now=dayKey();
  const used={};
  const active=state.tasks.filter(t=>t.active&&!t.daily);
  // Keep user-set / exact dates where valid.
  for(const t of active){let k=plan[t.id];if(k&&seasonAllowed(t,k)&&!isSunday(k)){(used[k]??=[]).push(t.id)}else delete plan[t.id]}
  // Schedule missing by priority, with max 2 rooms and sensible daily load.
  const missing=active.filter(t=>!plan[t.id]);
  missing.sort((a,b)=>{
    const da=dateDiff(a.firstDate||now,now), db=dateDiff(b.firstDate||now,now); return da-db || effortScore(b)-effortScore(a);
  });
  for(const t of missing){
    let placed=false;
    for(let off=0;off<=PLAN_DAYS&&!placed;off++){
      const k=iso(addDays(fromKey(now),off)); if(isFree(k)||!seasonAllowed(t,k))continue;
      if(t.exact&&fromKey(k).getDay()!==Number(t.weekday))continue;
      const dayTasks=(used[k]||[]).map(id=>state.tasks.find(x=>x.id===id)).filter(Boolean);
      if(compatible(t,dayTasks)){plan[t.id]=k;(used[k]??=[]).push(t.id);placed=true}
    }
    if(!placed){
      const k=preferredDay(t,now,1)||FIRST_PASS_DEADLINE;plan[t.id]=k;(used[k]??=[]).push(t.id)
    }
  }
  state.plan=plan;state.planRevision++;planBusy=false;persistSoon();
}
function planTasksForDate(k){return state.tasks.filter(t=>t.active&&!t.daily&&state.plan[t.id]===k)}
function dailyTasksForDate(k){return DAILY.flatMap((g,gi)=>g[1].map((text,i)=>({id:`daily_${gi}_${i}`,text,room:g[0],area:'Routine',place:g[0],description:'Teil der täglichen Basisroutine.',effort:'mini',interval:1,daily:true,exact:true,package:'Routine'})))}
function todayTasks(){
  const k=dayKey();
  let list=planTasksForDate(k);
  // hard cap selected Today workload; plan itself remains complete.
  list=list.slice().sort((a,b)=>effortScore(b)-effortScore(a));
  const light=state.settings.lightMode;
  const cap=light?4:7;
  let sum=0;const selected=[];
  for(const t of list){const w=effortScore(t);if(selected.length&&w>=9)continue;if(sum+w>cap)continue;selected.push(t);sum+=w;if(w>=9)break}
  // Exact fixed task must be visible.
  for(const t of list.filter(t=>t.exact))if(!selected.includes(t))selected.unshift(t);
  return selected;
}
function historyFor(id){return state.history[id]||[]}
function isDoneToday(id){return historyFor(id).some(e=>e.type==='done'&&e.date===dayKey())}
function record(id,type,date=dayKey(),meta={}){(state.history[id]??=[]).push({type,date,ts:Date.now(),...meta});}
function nextAfterCompletion(t,date){return iso(addDays(fromKey(date),t.interval));}
function markDoneFast(id,row){
  if(!row||row.dataset.swiped)return;row.dataset.swiped='1';
  row.classList.add('swipe-complete');
  setTimeout(()=>row.remove(),80);
  // No state calculation, render, localStorage or planner work on the touch frame.
  setTimeout(()=>{
    const t=state.tasks.find(x=>x.id===id); if(!t)return;
    record(id,'done'); t.nextDate=nextAfterCompletion(t,dayKey()); state.plan[id]=nextAfterCompletion(t,dayKey());
    state.completedDays[dayKey()]=true;
    swipeQueue.push({id,type:'done'});
    queuePersist();
  },0);
}
function postponeFast(id,row){
  if(!row||row.dataset.swiped)return;row.dataset.swiped='1';row.classList.add('swipe-later');
  setTimeout(()=>row.remove(),80);
  setTimeout(()=>{
    const t=state.tasks.find(x=>x.id===id);if(!t)return;
    const from=fromKey(state.plan[id]||dayKey()); let k=iso(addDays(from,1));
    for(let i=0;i<10;i++){if(!isFree(k)&&seasonAllowed(t,k)&&(!t.weekday||fromKey(k).getDay()===Number(t.weekday)))break;k=iso(addDays(fromKey(k),1))}
    state.plan[id]=k; t.nextDate=k; record(id,'postponed',dayKey(),{to:k}); swipeQueue.push({id,type:'postponed',to:k}); queuePersist();
  },0);
}
function queuePersist(){clearTimeout(persistTimer);persistTimer=setTimeout(()=>{
  try{localStorage.setItem(STORAGE,JSON.stringify(state));}catch{}
  swipeQueue=[];
},2200)}
function persistSoon(){clearTimeout(persistTimer);persistTimer=setTimeout(()=>{try{localStorage.setItem(STORAGE,JSON.stringify(state))}catch{}},300)}

function taskById(id){return state.tasks.find(t=>t.id===id)}
function taskRow(t){
  const e=effortScore(t);return `<article class="task" data-id="${esc(t.id)}"><div class="swipeHint left">Später</div><div class="swipeHint right">Erledigt</div><div class="taskContent"><div class="taskMain"><div class="taskTitle">${esc(t.text)}</div><div class="taskMeta">${esc(t.room)} · ${esc(effortLabel(t))} · ${effortMinutes(t)} Min.</div></div><button class="small info" data-action="info" aria-label="Details">i</button></div></article>`;
}
function renderToday(){
  const root=document.getElementById('view');const k=dayKey();const tasks=todayTasks();const doneCount=state.history?Object.values(state.history).filter(a=>a.some(e=>e.type==='done'&&e.date===k)).length:0;
  root.innerHTML=`<section class="hero"><div><div class="eyebrow">HEUTE</div><h1>${fromKey(k).toLocaleDateString('de-AT',{weekday:'long',day:'2-digit',month:'long'})}</h1><p>${DAY_THEME[fromKey(k).getDay()]}</p></div><button id="lightToggle" class="mode ${state.settings.lightMode?'on':''}">${state.settings.lightMode?'Leichtmodus':'Normal'}</button></section>
  <section class="loadCard"><div><strong>${tasks.length}</strong> Aufgaben ausgewählt</div><span>${state.settings.lightMode?'leichter Tag':'realistische Tagesportion'}</span></section>
  <div class="sectionHead"><h2>Heute</h2><span>${tasks.reduce((s,t)=>s+effortMinutes(t),0)} Min. geplant</span></div>
  <div id="todayList" class="taskList">${tasks.length?tasks.map(taskRow).join(''):`<div class="empty"><strong>Für heute ist das genug.</strong><span>Kein Haushaltstag muss perfekt sein.</span></div>`}</div>
  <div class="todayActions"><button id="energy" class="primary">Ich habe Energie</button><button id="meTime" class="secondary">Me-Time einplanen</button></div>
  <details class="fold"><summary>Erledigt</summary><div class="foldBody">${doneCount?doneCount+' Aufgabe(n) heute erledigt.':'Noch nichts abgehakt.'}</div></details>`;
  document.getElementById('lightToggle').onclick=()=>{state.settings.lightMode=!state.settings.lightMode;persistSoon();renderToday()};
  document.getElementById('energy').onclick=energySuggestions;
  document.getElementById('meTime').onclick=()=>toast('Me-Time ist geschützt: 20–60 Minuten für dich einplanen.');
  bindTodayGestures();
}
function bindTodayGestures(){
  document.querySelectorAll('#todayList .task').forEach(el=>attachSwipe(el));
  document.querySelectorAll('[data-action="info"]').forEach(btn=>btn.onclick=e=>{const t=taskById(e.currentTarget.closest('.task').dataset.id);showInfo(t)});
}
function attachSwipe(el){
  const c=el.querySelector('.taskContent');let sx=0,sy=0,dx=0,active=false,done=false;
  const start=e=>{if(e.pointerType==='mouse'&&e.button!==0)return;sx=e.clientX;sy=e.clientY;dx=0;active=true;done=false;c.style.transition='none'};
  const move=e=>{if(!active||done)return;const rx=e.clientX-sx,ry=e.clientY-sy;if(Math.abs(ry)>Math.abs(rx)+10){active=false;return}dx=clamp(rx,-110,110);if(Math.abs(dx)>8){if(e.cancelable)e.preventDefault();c.style.transform=`translate3d(${dx}px,0,0)`;if(dx>76){done=true;active=false;markDoneFast(el.dataset.id,el)}else if(dx<-76){done=true;active=false;postponeFast(el.dataset.id,el)}}};
  const end=()=>{if(!active||done)return;active=false;c.style.transition='transform .08s ease';c.style.transform='translate3d(0,0,0)'};
  el.addEventListener('pointerdown',start,{passive:true});el.addEventListener('pointermove',move,{passive:false});el.addEventListener('pointerup',end,{passive:true});el.addEventListener('pointercancel',end,{passive:true});
}
function energySuggestions(){
  const k=dayKey();const candidates=state.tasks.filter(t=>t.active&&!t.daily&&state.plan[t.id]===k&&!isDoneToday(t.id));
  const extra=state.tasks.filter(t=>t.active&&!t.daily&&!candidates.includes(t)&&!isSunday(k)).sort((a,b)=>scoreCandidate(b,k)-scoreCandidate(a,k)).slice(0,3);
  const box=document.createElement('div');box.className='modal open';box.innerHTML=`<div class="dialog"><button class="close">×</button><h2>Zusätzliche Kandidaten</h2><p>Maximal drei sinnvolle Aufgaben – du entscheidest.</p>${extra.map(t=>`<button class="choice" data-id="${esc(t.id)}"><strong>${esc(t.text)}</strong><span>${esc(t.room)} · ${effortLabel(t)}</span></button>`).join('')||'<div class="empty">Heute gibt es nichts Sinnvolles zusätzlich.</div>'}</div>`;document.body.appendChild(box);box.querySelector('.close').onclick=()=>box.remove();box.addEventListener('click',e=>{if(e.target===box)box.remove()});box.querySelectorAll('.choice').forEach(b=>b.onclick=()=>{state.plan[b.dataset.id]=k;persistSoon();box.remove();renderToday()});
}
function renderCalendar(){
  const y=calendarDate.getFullYear(),m=calendarDate.getMonth();const first=new Date(y,m,1,12);const start=addDays(first,-first.getDay()+1);let html='';
  for(let i=0;i<42;i++){const d=addDays(start,i),k=iso(d),tasks=planTasksForDate(k),isOther=d.getMonth()!==m,free=isFree(k);const mins=tasks.reduce((s,t)=>s+effortMinutes(t),0);html+=`<button class="calDay ${isOther?'muted':''} ${free?'free':''} ${tasks.length?'busy':''}" data-date="${k}"><span>${d.getDate()}</span><small>${tasks.length?tasks.length+' · '+mins+'m':'frei'}</small></button>`}
  document.getElementById('view').innerHTML=`<section class="hero compact"><div><div class="eyebrow">KALENDER</div><h1>${fromKey(`${y}-${pad(m+1)}-01`).toLocaleDateString('de-AT',{month:'long',year:'numeric'})}</h1><p>Zentrale Planung · Sonntag frei</p></div><div class="navBtns"><button id="prev">‹</button><button id="next">›</button></div></section><div class="calendarGrid labels">${['Mo','Di','Mi','Do','Fr','Sa','So'].map(x=>`<span>${x}</span>`).join('')}</div><div class="calendarGrid">${html}</div><div id="dayDetail" class="calendarDetail">Tag auswählen.</div>`;
  document.getElementById('prev').onclick=()=>{calendarDate=new Date(y,m-1,1,12);renderCalendar()};document.getElementById('next').onclick=()=>{calendarDate=new Date(y,m+1,1,12);renderCalendar()};document.querySelectorAll('.calDay').forEach(b=>b.onclick=()=>showCalendarDay(b.dataset.date));
}
function showCalendarDay(k){const tasks=planTasksForDate(k);const box=document.getElementById('dayDetail');box.innerHTML=`<div class="sectionHead"><h2>${fmt(k)}</h2><span>${isFree(k)?'haushaltsfrei':tasks.length+' Aufgaben'}</span></div>${tasks.length?tasks.map(t=>`<div class="detailRow"><strong>${esc(t.text)}</strong><span>${esc(t.room)} · ${effortLabel(t)}</span></div>`).join(''):'<p class="mutedText">Keine geplanten Turnusaufgaben.</p>'}`}
function renderCatalog(){
  const filtered=state.tasks.filter(t=>t.active&&!t.daily&&(!catalogRoom||taskRooms(t).includes(catalogRoom)||t.room===catalogRoom)&&(!catalogQuery||[t.text,t.room,t.area,t.place,t.package].join(' ').toLowerCase().includes(catalogQuery.toLowerCase())));
  const groups={};for(const t of filtered)(groups[t.room]??=[]).push(t);
  document.getElementById('view').innerHTML=`<section class="hero compact"><div><div class="eyebrow">AUFGABENKATALOG</div><h1>Alle Aufgaben</h1><p>${filtered.length} aktive Aufgaben · zentraler Plan</p></div><button id="addTask" class="primary">+ Aufgabe</button></section><div class="filters"><input id="search" placeholder="Aufgabe, Raum, Etage …" value="${esc(catalogQuery)}"><select id="roomFilter"><option value="">Alle Räume</option>${ROOM_ORDER.map(r=>`<option ${catalogRoom===r?'selected':''}>${esc(r)}</option>`).join('')}</select></div><div class="catalogGroups">${Object.entries(groups).sort((a,b)=>a[0].localeCompare(b[0],'de')).map(([room,items])=>`<section class="roomGroup"><div class="roomHead"><h2>${esc(room)}</h2><span>${items.length}</span></div>${items.sort((a,b)=>(state.plan[a.id]||'').localeCompare(state.plan[b.id]||'')).map(t=>catalogRow(t)).join('')}</section>`).join('')}</div>`;
  document.getElementById('addTask').onclick=()=>openTaskForm();document.getElementById('search').oninput=e=>{catalogQuery=e.target.value;renderCatalog()};document.getElementById('roomFilter').onchange=e=>{catalogRoom=e.target.value;renderCatalog()};document.querySelectorAll('.catalogRow').forEach(r=>{r.querySelector('[data-a="edit"]').onclick=()=>openTaskForm(taskById(r.dataset.id));r.querySelector('[data-a="del"]').onclick=()=>deleteTask(r.dataset.id);r.querySelector('[data-a="info"]').onclick=()=>showInfo(taskById(r.dataset.id))});
}
function catalogRow(t){return `<div class="catalogRow" data-id="${esc(t.id)}"><div><strong>${esc(t.text)}</strong><span>${esc(t.place)} · ${effortLabel(t)} · alle ${t.interval} Tage</span><small>Geplant: ${fmt(state.plan[t.id])}${t.exact?' · fix':''}</small></div><div class="rowActions"><button data-a="info">i</button><button data-a="edit">Bearbeiten</button><button data-a="del">Löschen</button></div></div>`}
function openTaskForm(task=null){
  const edit=!!task;const t=task||{text:'',area:'EG',room:'Küche',place:'Küche',description:'',effort:'klein',interval:30,firstDate:dayKey(),nextDate:dayKey(),weekday:'',exact:false,package:'',source:'custom',active:true};
  const box=document.createElement('div');box.className='modal open';box.innerHTML=`<div class="dialog form"><button class="close">×</button><h2>${edit?'Aufgabe bearbeiten':'Aufgabe hinzufügen'}</h2><div class="formGrid"><label>Aufgabenname<input id="fText" value="${esc(t.text)}"></label><label>Etage/Bereich<input id="fArea" value="${esc(t.area)}"></label><label>Raum<input id="fRoom" value="${esc(t.room)}"></label><label>Genauer Ort<input id="fPlace" value="${esc(t.place)}"></label><label>Kategorie<input id="fPkg" value="${esc(t.package)}"></label><label>Aufwand<select id="fEff">${EFFORT_ORDER.map(e=>`<option value="${e}" ${t.effort===e?'selected':''}>${EFFORTS[e].label} · ${EFFORTS[e].minutes} Min.</option>`).join('')}</select></label><label>Erster Termin<input id="fFirst" type="date" value="${esc(t.firstDate)}"></label><label>Nächster Termin<input id="fNext" type="date" value="${esc(state.plan[t.id]||t.nextDate)}"></label><label>Intervall (Tage)<input id="fInt" type="number" min="1" value="${t.interval}"></label><label>Wochentag<select id="fWeek"><option value="">kein fixer Wochentag</option>${['So','Mo','Di','Mi','Do','Fr','Sa'].map((x,i)=>`<option value="${i}" ${Number(t.weekday)===i?'selected':''}>${x}</option>`).join('')}</select></label><label class="check"><input id="fExact" type="checkbox" ${t.exact?'checked':''}> Termin exakt einhalten</label><label class="full">Beschreibung<textarea id="fDesc">${esc(t.description)}</textarea></label></div><button id="saveTask" class="primary wide">Speichern</button></div>`;
  document.body.appendChild(box);box.querySelector('.close').onclick=()=>box.remove();box.addEventListener('click',e=>{if(e.target===box)box.remove()});box.querySelector('#saveTask').onclick=()=>{const nt=normalizeTask({...t,id:t.id||uid(),text:box.querySelector('#fText').value.trim()||'Neue Aufgabe',area:box.querySelector('#fArea').value.trim(),room:box.querySelector('#fRoom').value.trim(),place:box.querySelector('#fPlace').value.trim(),package:box.querySelector('#fPkg').value.trim()||pkgFor(box.querySelector('#fText').value),effort:box.querySelector('#fEff').value,firstDate:box.querySelector('#fFirst').value,nextDate:box.querySelector('#fNext').value,interval:Number(box.querySelector('#fInt').value||30),weekday:box.querySelector('#fWeek').value,exact:box.querySelector('#fExact').checked,description:box.querySelector('#fDesc').value,source:'custom',active:true});const ix=state.tasks.findIndex(x=>x.id===nt.id);if(ix>=0)state.tasks[ix]=nt;else state.tasks.push(nt);state.plan[nt.id]=nt.nextDate||nt.firstDate;persistSoon();box.remove();renderCatalog()};
}
function deleteTask(id){if(!confirm('Aufgabe wirklich löschen?'))return;const t=taskById(id);if(!t)return;t.active=false;state.customDeleted[id]=true;delete state.plan[id];record(id,'deleted');persistSoon();renderCatalog()}
function showInfo(t){if(!t)return;const box=document.createElement('div');box.className='modal open';box.innerHTML=`<div class="dialog"><button class="close">×</button><div class="eyebrow">DETAILS</div><h2>${esc(t.text)}</h2><div class="infoGrid"><span>Raum</span><strong>${esc(t.room)}</strong><span>Aufwand</span><strong>${effortLabel(t)} · ${effortMinutes(t)} Min.</strong><span>Intervall</span><strong>${t.interval} Tage</strong><span>Geplant</span><strong>${fmt(state.plan[t.id])}</strong><span>Termin</span><strong>${t.exact?'fix':'flexibel'}</strong><span>Beschreibung</span><strong>${esc(t.description||'—')}</strong></div><div class="history"><h3>Historie</h3>${historyFor(t.id).slice(-8).reverse().map(e=>`<div>${esc(e.type)} · ${fmt(e.date)}</div>`).join('')||'Noch keine Historie.'}</div></div>`;document.body.appendChild(box);box.querySelector('.close').onclick=()=>box.remove();box.addEventListener('click',e=>{if(e.target===box)box.remove()})}
function toast(t){const e=document.getElementById('toast');e.textContent=t;e.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>e.classList.remove('show'),1800)}
function render(){document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===selectedTab));if(selectedTab==='today')renderToday();else if(selectedTab==='calendar')renderCalendar();else renderCatalog()}

document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{selectedTab=b.dataset.tab;render()});
window.addEventListener('beforeunload',()=>{try{localStorage.setItem(STORAGE,JSON.stringify(state))}catch{}});
setInterval(()=>{const now=dayKey();if(!window.__dayKey)window.__dayKey=now;if(window.__dayKey!==now){window.__dayKey=now;replanAll();render()}},60000);
render();

// Optional native iOS bridge; harmless in normal PWA.
window.syncWidgetSnapshot=function(){try{window.webkit?.messageHandlers?.widgetBridge?.postMessage({type:'todaySnapshot',date:dayKey(),tasks:todayTasks().map(t=>({id:t.id,text:t.text,room:t.room,effort:effortScore(t)}))})}catch{}};
