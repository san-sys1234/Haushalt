# Unser Zuhause – V358

## Änderungen
- Die WC-Reinigung ist pro Raum zu einer einzelnen Aufgabe „Toilette gründlich reinigen“ gebündelt. WC-Becken, Rand, Sitz/Deckel, Außenseite, Spülknopf, WC-Bürste und Bürstenhalter gehören in allen betroffenen Räumen zu diesem einen Paket.
- Im Gäste-WC umfasst dasselbe Paket zusätzlich das vorhandene Pissoir einschließlich der zugänglichen Kontaktflächen. Für WC und Pissoir getrennte Reinigungsutensilien verwenden.
- Waschbecken, Armaturen, Spiegel, Dusche/Badewanne, Papierhalter und Boden bleiben eigene Aufgaben.
- „Bett machen“ bleibt eine eigene tägliche Aufgabe innerhalb der Morgenroutine.
- Die bestehende Zehn-Aufgaben-Grenze, Raumrotation, Planungslogik und Speicherkennung bleiben unverändert.
- App- und Service-Worker-Version auf V358 aktualisiert. Die Speicherkennung und Datenstruktur bleiben unverändert, damit vorhandene Erledigungen und Einstellungen weiterverwendet werden.

## Update
1. Vor dem Update in der App ein aktuelles Backup exportieren.
2. Alle Dateien aus diesem ZIP in das bestehende Hosting-Verzeichnis kopieren und überschreiben.
3. App/PWA vollständig schließen und neu öffnen. Falls noch die alte Version erscheint, Cache/Service Worker neu laden.

## Prüfung
JavaScript-Syntax von `app.js` und `sw.js` prüfen. Ein vollständiger Live-Laufzeittest mit dem lokalen iPhone-Datenbestand ist nicht durchgeführt. Nach dem Update kontrollieren, dass in jedem Toilettenraum genau eine Aufgabe „Toilette gründlich reinigen“ vorkommt und das Gäste-WC-Paket auch das Pissoir erwähnt.
