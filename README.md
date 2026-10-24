# Unser Zuhause – V355

## Änderungen
- Die Aufgabenplanung verteilt ungelöste Aufgaben nicht mehr durch unbegrenztes Anhängen auf bereits volle Tage.
- Auch die Notfallpfade beachten die Tagesgrenze und den Arbeitsaufwand; große Aufgaben und Fensterarbeiten bleiben als Fokusblöcke isoliert.
- Der Planungshorizont wurde erweitert, damit für umfangreiche Bestandskataloge genug legale Termine für die Verteilung vorhanden sind. Aufgaben, die nicht innerhalb des normalen Fälligkeitsfensters untergebracht werden können, werden nach geringer Tageslast, Raum und Arbeitspaket über spätere freie Termine verteilt.
- Die Speicherkennung und Datenstruktur der App bleiben unverändert; vorhandene Erledigungen und Einstellungen werden weiterverwendet.
- App- und Service-Worker-Version auf V355 aktualisiert.

## Update
1. Vor dem Update in der App ein aktuelles Backup exportieren.
2. Alle Dateien aus diesem ZIP in das bestehende Hosting-Verzeichnis kopieren und überschreiben.
3. App/PWA vollständig schließen und neu öffnen. Falls noch die alte Version erscheint, Cache/Service Worker neu laden.

## Prüfung
JavaScript-Syntax geprüft. Ein vollständiger Live-Laufzeittest mit dem lokal gespeicherten iPhone-Datenbestand war nicht möglich. Nach dem Update bitte den Kalender mit dem Aufgabenkatalog vergleichen; feste exakte Termine und manuell gesperrte Tage können Sonderregeln auslösen.
