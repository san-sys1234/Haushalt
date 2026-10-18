# Unser Zuhause – optimierte Version V326

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
