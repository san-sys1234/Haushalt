# Unser Zuhause – V354

## Änderungen
- Kalender und Tagesplanung lesen nun denselben kanonischen Aufgabenplan, damit die angezeigten Tageszahlen und die Aufgabenlisten nicht auseinanderlaufen.
- Die heutige eingefrorene Aufgabenliste wird im Kalender ebenfalls exakt übernommen.
- Die Planungsbewertung berücksichtigt die Nutzungspriorität der Räume: Küche, Wohn-/Essbereich, Schlaf- und Kinderzimmer sowie Bäder werden bei gleichwertigen Terminen bevorzugt; Waschküche folgt danach, Neben-/Lagerräume haben niedrigere Priorität.
- Notfall-Fallbacks dürfen normale Tage nicht mehr durch unbegrenztes Anhängen von Aufgaben überladen. Die Kapazität wird nach Anzahl und Aufwand begrenzt; nicht lösbare Fälle werden als Planungskonflikt protokolliert statt stillschweigend auf einen übervollen Tag gelegt.
- App- und Service-Worker-Version auf V354 aktualisiert. Bestehender Speichername und Datenstruktur bleiben unverändert.

## Update
1. Vor dem Update in der App ein aktuelles Backup exportieren.
2. Alle Dateien aus diesem ZIP in das bestehende Hosting-Verzeichnis kopieren und überschreiben.
3. App/PWA vollständig neu laden. Falls noch die alte Version erscheint, die PWA schließen und erneut öffnen.

## Prüfung
JavaScript-Syntax geprüft. Kein vollständiger Live-Laufzeittest auf dem konkreten iPhone mit den dort gespeicherten Daten durchgeführt. Nach dem Update bitte Kalender mit Heute und Katalog vergleichen; besonders benutzerdefinierte Aufgaben mit „Fester Termin – exakt einhalten“ können bewusst von normalen Tagesgrenzen ausgenommen sein.
