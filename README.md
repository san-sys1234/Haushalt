# Unser Zuhause – V357

## Änderungen
- „Bett machen“ ist jetzt eine eigene tägliche Aufgabe innerhalb der Morgenroutine und kann separat abgehakt werden.
- Die täglichen Routinen bleiben in vier übersichtlichen Gruppen gebündelt.
- Die harte Tagesgrenze bleibt bei höchstens zehn Aufgaben insgesamt; tägliche Routinen zählen mit.
- Die bestehende Raumrotation, Arbeitspaket-Bündelung und Speicherkennung bleiben erhalten.
- App- und Service-Worker-Version auf V357 aktualisiert. Die Speicherkennung und Datenstruktur bleiben unverändert, damit vorhandene Erledigungen und Einstellungen weiterverwendet werden.

## Update
1. Vor dem Update in der App ein aktuelles Backup exportieren.
2. Alle Dateien aus diesem ZIP in das bestehende Hosting-Verzeichnis kopieren und überschreiben.
3. App/PWA vollständig schließen und neu öffnen. Falls noch die alte Version erscheint, Cache/Service Worker neu laden.

## Prüfung
JavaScript-Syntax von `app.js` und `sw.js` prüfen. Ein vollständiger Live-Laufzeittest mit dem lokalen iPhone-Datenbestand ist nicht durchgeführt. Nach dem Update bitte in „Heute“ kontrollieren, dass „Bett machen“ täglich erscheint und höchstens zehn Aufgaben insgesamt angezeigt werden.
