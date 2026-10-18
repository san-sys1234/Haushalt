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
