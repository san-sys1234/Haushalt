# Unser Zuhause – V363

## Änderungen in V363
- Überfällige wiederkehrende Aufgaben werden ab sofort als heute fällig behandelt, statt dass verpasste Intervalle übersprungen und erst der nächste zukünftige Zyklus angezeigt wird.
- Kurzzyklische Erstaufgaben (bis einschließlich 14 Tage), insbesondere Bettwäsche und Hygieneaufgaben, starten bereits jetzt und werden nicht künstlich 30–120 Tage in die Zukunft verteilt.
- Aufgaben mit einem Intervall von höchstens 14 Tagen dürfen bei der Planung nur noch um maximal drei Tage verschoben werden.
- Manuelle Fälligkeitstermine in der Vergangenheit werden ebenfalls als jetzt fällig behandelt.
- Der normale Planungshorizont wurde von einem Jahr auf sechs Monate begrenzt. Nur echte saisonale/Fenster- und Fixtermine dürfen ihn erweitern. Damit kann die normale Haushaltsplanung Aufgaben nicht mehr durch einen Jahres-Overflow bis 2028 verschieben.
- Der automatisch erzeugte heutige Tagesplan wird einmalig neu berechnet, damit die korrigierte Fälligkeitslogik sofort sichtbar wird. Explizit gesperrte Tagespläne bleiben erhalten.
- Der bestehende Speicher-Schlüssel bleibt unverändert; Aufgaben, Erledigungshistorie und Einstellungen werden nicht zurückgesetzt.

## Installation
1. Vor dem Update ein aktuelles Backup in der App exportieren.
2. Alle Dateien aus dem ZIP in das bestehende Hosting-Verzeichnis kopieren und überschreiben.
3. App/PWA vollständig schließen und neu öffnen. Der Service Worker verwendet einen neuen Cache.

## Hinweis
Die Zwei-Räume-Regel und die bisherigen Tageskapazitätsgrenzen bleiben unverändert. Saisonale Fenstertermine dürfen weiterhin in der Zukunft liegen, wenn sie tatsächlich saisonal vorgesehen sind.
