# Unser Zuhause – optimierte Version V346

## Enthalten
- Einheitliche Build-/Cache-Version V326 für HTML, App-JavaScript und Service Worker.
- Neuer Bereich „Datensicherung & Planungsprüfung“ im Aufgabenkatalog.
- JSON-Backup-Export inklusive Aufgaben, Terminen, Intervallen, individuellen Einstellungen und Historie.
- Validierte Backup-Wiederherstellung mit Bestätigung und vorherigem Backup-Download.
- Manuelle Planungsprüfung auf aktive Aufgaben ohne gültigen Termin, vergangene Termine und doppelte Tageszuordnungen.
- Sichtbarer Hinweis, wenn das Speichern des App-Zustands fehlschlägt.
- Service Worker mit einheitlicher Cache-Version und sauberem Cache-Aufbau.

## Installation / GitHub Pages
Alle Dateien aus diesem Ordner gemeinsam in den bestehenden App-Ordner hochladen und die vorhandenen Dateien ersetzen. Die Namen müssen exakt `index.html`, `app.js`, `sw.js`, `manifest.json`, `icon-192.png`, `icon-512.png` und `apple-touch-icon.png` lauten.

## Wichtig
Vor dem Update in der bisherigen App möglichst über den Aufgabenkatalog ein Backup exportieren. Die Wiederherstellungsfunktion ersetzt den gespeicherten App-Stand nach ausdrücklicher Bestätigung. Browserdaten bleiben lokal auf dem jeweiligen Gerät; ein JSON-Backup sollte zusätzlich sicher aufbewahrt werden.

## Prüfumfang
JavaScript-Syntax von `app.js` und `sw.js` wurde geprüft. Die App wurde hier nicht in einem echten iPhone-/Safari-Browser mit deinem aktuellen lokalen Speicher durchgeklickt. Bitte nach dem Deployment zuerst Backup-Export und anschließend „Planung prüfen“ ausführen.


## V327 – visuelle Überarbeitung
- Ruhigere, klarere Typografie und wärmere Neoclassical-Farbpalette
- Bessere visuelle Hierarchie für Tageskopf, Fortschritt und Abschnittsüberschriften
- Konsistentere Karten, Raumgruppen, Kalender und Raumkarte
- Größere Touch-Ziele, sichtbare Tastaturfokusse und Unterstützung für reduzierte Bewegung
- Sticky, horizontal scrollbare Hauptnavigation auf kleinen Bildschirmen
- Keine absichtliche Änderung der Planungsregeln oder des Datenformats

## V329 – kürzerer Planungshorizont
- Verbindliche Planungstoleranz: maximal 14 Tage vor oder nach dem jeweiligen Fälligkeitstermin.
- Keine automatische Verteilung normaler Aufgaben über einen künstlichen Sechs-Monats-Zeitraum.
- Ersttermine werden deterministisch auf eine kurze 15-Tage-Spanne verteilt; bestehende individuelle Termine bleiben maßgeblich.
- Fehlende explizite Intervalle werden nach Aufgabentyp differenzierter abgeleitet; gespeicherte oder individuell konfigurierte Intervalle haben immer Vorrang.
- Die letzte Garantie-Stufe darf Arbeitslast-/Paketgrenzen lockern, aber nicht die +/-14-Tage-Grenze, die Raumgrenze oder die Fenster-Isolation.


## V329 – Soft Neoclassical & realistische Planung
- Deutlich überarbeitete Farbwelt, Typografie, Karten, Kalender und Navigation.
- Neues App-Symbol im Stil Hauslinie, Salbeigrün und warmem Gold.
- Große Aufgaben ab Aufwand 4 sowie Fenster-/Sonnenschutzarbeiten werden als isolierte Schwerpunktaufgaben geplant; die finale Vollständigkeitsprüfung darf diese Isolation nicht aufheben.
- Planungsfenster bleibt auf maximal ±14 Tage rund um die Fälligkeit begrenzt.


## V330 – Fixaufgaben
- Eigener Tab „Fixaufgaben“ zum Anlegen und Verwalten verbindlicher Aufgaben.
- Fixes Startdatum und Intervall werden nach Erstellung gesperrt; Text und Ort bleiben bearbeitbar.
- Fällige/überfällige Fixaufgaben erscheinen zusätzlich in „Heute“, auch bei vollem Tagesplan und am Sonntag.
- Erledigung wird pro ursprünglichem Fälligkeitstermin gespeichert; verpasste Fixaufgaben bleiben sichtbar, bis sie erledigt werden.
- Fixaufgaben werden an das Widget übergeben. Bestehende lokale Datenstruktur wird erweitert, nicht ersetzt.


## V331 – Planner-Reparatur
- Zusätzlicher letzter Reparaturlauf für aktive Aufgaben ohne geplantes Datum.
- Der Lauf hält die ±14-Tage-Grenze, sperrt Sonntage/haushaltsfreie Tage und bewahrt die Isolation großer bzw. fensterbezogener Aufgaben. Nur wenn nötig darf die Zwei-Raum-Grenze als Notfallregel übergangen werden, damit Aufgaben nicht ohne Datum bleiben.


## V333 – Erstplanung über den verfügbaren Zeitraum verteilen
- Behebt den konkreten Bootstrap-Fehler, bei dem automatisch erzeugte Erstfälligkeiten über nur 15 Tage verteilt wurden.
- Noch nie erledigte, nicht manuell datierte Aufgaben werden einmalig über die verfügbaren Arbeitstage bis 14 Tage vor dem Erstplanungs-Stichtag verteilt.
- Manuelle Termine, Intervalle, Erledigungshistorien, gelöschte Aufgaben und bestehende Fixaufgaben bleiben erhalten.
- Die automatische Neuverteilung wird durch ein Migrationskennzeichen nur einmal ausgeführt.
- Wichtig: Die App kann nicht automatisch auf eine bereits im Browser vorhandene Exportdatei zugreifen; die Migration erfolgt in dem Browser, in dem die App gestartet wird.


## V334 – harte Termin-Garantie
- Zusätzlicher abschließender Reparaturlauf für aktive Aufgaben ohne Plantermin.
- Versucht zuerst einen Termin innerhalb von ±14 Tagen mit gelockerten Raum-/Kapazitätsgrenzen.
- Wenn kein zulässiger Fokus-Tag verfügbar ist, wird ein späterer freier Wochentag gesucht, statt die Aufgabe ohne Datum zu lassen.
- Bestehende Datenstruktur und Erledigungshistorien bleiben erhalten.


## V335 – Vollständigkeitsgarantie
- Letzter Reparaturlauf versucht, für jede aktive Nicht-Tagesroutine einen konkreten Termin zu erzeugen.
- Wenn alle regulären Termine blockiert sind, darf die Notfallplatzierung Raum-/Kapazitäts-/Sperrtagregeln lockern, damit eine Aufgabe nicht ohne Termin bleibt; Sonntage werden weiterhin vermieden, soweit ein späterer Tag verfügbar ist.
- „Planung prüfen“ kontrolliert nun auch auf Termine an gesperrten/haushaltsfreien Tagen und zählt aufgeschobene aktive Aufgaben mit.
- Planungs-Cache und Service-Worker-Version auf V335 aktualisiert.
- Laufzeittest mit echten lokalen Browserdaten bleibt erforderlich.


## V336 – Sichtbarkeit verschobener Aufgaben

- Verschobene aktive Aufgaben zeigen ihr konkretes Rückkehrdatum im Aufgabenkatalog statt „Geplant: —“.
- Die Planungsprüfung zählt verschobene Aufgaben mit und prüft ihr Rückkehrdatum.
- Bestehende Aufgaben- und Erledigungsdaten bleiben im bestehenden lokalen Speicherformat.

## V337 – Schutz vor übermäßig weit verschobenen Aufgaben
- Ergänzt eine einmalige, datenbewahrende Reparatur beim Start: automatisch markierte Planungsverschiebungen, deren Rückkehrtermin mehr als 45 Tage nach dem damaligen Aktionsdatum liegt, werden aus der Sperrliste genommen und wieder nach den normalen Planungsregeln eingeplant.
- Kürzere bzw. aktuelle Verschiebungen bleiben erhalten.
- Die reparierten Alttermine werden samt Aufgabe, Raum, altem Termin und Verschiebungsdauer im lokalen Prüfprotokoll gespeichert.
- Erledigungshistorie, Intervalle, benutzerdefinierte Aufgaben und manuelle Termine werden durch diese Reparatur nicht gelöscht.
- Die Prüfung „Planung prüfen“ meldet, wenn solche Altverschiebungen repariert wurden; zusätzliche Details stehen in der Browser-Konsole.
- Build-/Cache-Kennung auf V337 aktualisiert.

**Wichtig:** Die App-Syntax wurde geprüft und die Reparaturlogik anhand des bereitgestellten Backups auf die betroffenen Datensätze abgestimmt. Ein echter Durchklicktest in iOS/Safari ist in dieser Umgebung nicht möglich. Vor dem Update bitte in der bestehenden App ein frisches Backup exportieren; nach dem Update „Planung prüfen“ ausführen und das neue Backup aufbewahren.


## V345 – kleine Fenster-Nebenaufgaben sinnvoll bündeln
- Insektenschutz prüfen/reinigen, Fensterdichtungen prüfen, Fensterentwässerung prüfen und Fensterbänke sind keine automatisch isolierten Fenster-Großarbeiten mehr. Sie können innerhalb der normalen Raum- und Aufwandsregeln mit passenden kleinen Aufgaben gebündelt werden.
- Die strikte Isolation bleibt für die eigentliche Glasreinigung einzelner Fenster sowie große Raffstore-/Sonnenschutzarbeiten bestehen.
- Kein Backup wird beim Update automatisch importiert oder ersetzt.
- Syntaxprüfung durchgeführt; kein vollständiger End-to-End-Test in iPhone-Safari mit dem lokalen Nutzerdatenbestand.


## V345 – Reinigungsschritte bündeln und maximal zwei Räume pro Tag
- Die Planungsbewertung bevorzugt Aufgaben aus demselben Raum, Reinigungsschritt und Aufgabenpaket.
- Die Notfall- und letzte Datumszuweisung dürfen bei normalen Aufgaben keine dritte Raumgruppe mehr hinzufügen.
- Explizit fixierte Aufgaben behalten ihre priorisierte Behandlung; Fenster-/Raffstore-Arbeiten bleiben isoliert.
- Versionsschlüssel und Tagesplan-Abgleich wurden aktualisiert, damit die neue Planung nicht unbemerkt aus einem alten Cache kommt.
- Hinweis: Der Tagesplan wird in dieser Version weiterhin aus den bestehenden Einzelaufgaben gebildet; eine separate, vom Nutzer editierbare Paketverwaltung wurde nicht eingeführt.


## V345 – harte Obergrenze von zwei Räumen

Die Grenze von maximal zwei Räumen pro Tag wird nun vor jeder regulären Platzierung geprüft, einschließlich fixer Aufgaben und Notfallpfaden. Wenn eine fixe Aufgabe mit anderen Aufgaben zu einem dritten Raum führen würde, wird sie nicht in diesen Tagesplan gedrückt; sie muss stattdessen an einem anderen zulässigen Datum liegen. Der Planungs-Cache wurde invalidiert.


## V345 – Priorität wichtiger Alltagsräume

Automatisch erzeugte erste Termine priorisieren Küche, Schlafzimmer, beide Kinderzimmer, WCs, Bäder, Wohnzimmer und Essbereich innerhalb der ersten 45 Tage ab App-Start. Die Waschküche folgt innerhalb der ersten 75 Tage. Manuelle Termine und Erledigungshistorien bleiben maßgeblich.


## V345 – Haushaltsorientierte Erstplanung

- Zentrale Alltagsräume werden bei automatisch erzeugten Erstterminen priorisiert und innerhalb eines kürzeren Zeitfensters berücksichtigt.
- Die Waschküche folgt in einem eigenen frühen Zeitfenster; Nebenräume werden danach verteilt.
- Ersttermine werden nach Raum und Aufgabenreihenfolge gestaffelt, nicht ausschließlich über einen Hash-Wert zufällig über das Fenster verteilt.
- Die harte Grenze von maximal zwei Räumen pro Tag bleibt bestehen.
- Service-Worker-Cache und App-Buster sind auf V345 abgestimmt.

Hinweis: Die Planung muss nach Deployment anhand des tatsächlichen gespeicherten Backups geprüft werden; ein vollständiger Safari-Lauf wurde nicht durchgeführt.


## V345 – Haushaltsrhythmus und wöchentliche Hygiene

- Wöchentliche WC- und Waschbeckenpflege ist auf zwei feste Routinetage verteilt: Dienstag (Gäste-WC und Bad) sowie Freitag (Kinderbad und Eltern-WC). Handtücher folgen demselben Raumrhythmus.
- Die vorhandene Aufgabenliste, benutzerdefinierte Intervalle, manuelle Termine und Erledigungshistorien werden nicht absichtlich gelöscht oder überschrieben.
- Die neu erzeugten Ersttermine zentraler Alltagsräume bleiben priorisiert; die Planungsgrenze von maximal zwei physischen Räumen pro Tag bleibt hart.
- Vor Installation bitte ein frisches In-App-Backup exportieren. Diese Version wurde auf Syntax und Paketintegrität geprüft; ein vollständiger Lauf in Safari mit dem echten lokalen Bestand ist nicht erfolgt.


## V345 – Tagesplan bleibt eingefroren

„Heute“ wird beim ersten Öffnen des Tages als feste Aufgabenliste gespeichert. Erledigen entfernt nur den Status der erledigten Aufgabe aus der sichtbaren Restliste; es werden während desselben Tages keine neuen Aufgaben nachgezogen. Eine bestehende Tagesliste wird nicht nachträglich mit neu berechneten Planner-Kandidaten aufgefüllt.


## V346 – keine jahrelangen Ersatztermine
- Entfernt die Notfallplatzierung, die Aufgaben bis zu 10 Jahre später einplanen konnte.
- Sucht bei ausgebuchtem Plan nur bis maximal 30 Tage nach dem bevorzugten Termin und wahrt dabei harte Raum-/Fokus-/Sperrtagregeln.
- Wenn kein zulässiger Platz gefunden wird, wird ein konkreter Planungskonflikt protokolliert statt ein irreführender Termin in ferner Zukunft erzeugt.
- Das ist eine konservative Reparatur der Termin-Fallback-Logik; ein echter iPhone/Safari-Laufzeittest ist hier nicht möglich.
