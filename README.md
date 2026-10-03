# Unser Zuhause – V3

Diese Version führt **jede tägliche Routine und jede wiederkehrende Haushaltsarbeit als eigene Aufgabe**.

Beispiele:
- Bett machen
- Schlafzimmer lüften
- Geschirrspüler ausräumen
- Frühstücksgeschirr in den Geschirrspüler geben
- Küchenarbeitsflächen abwischen
- Esstisch abwischen
- Baby-Hochstuhl / Essbereich reinigen
- Wege freihalten
- Wäsche in den Wäschekorb
- Geschirr wegräumen
- Spielzeug grob zurücksetzen
- Geschirrspüler beladen/starten
- Herd abwischen
- Spüle und Armatur reinigen
- Müll kontrollieren

Auch Sanitärarbeiten sind getrennt: Toilette, Waschbecken und Toilettenbürste werden nicht zu „Bad reinigen“ zusammengefasst.

Die tägliche Basisroutine erscheint jeden Tag. Das Belastungsbudget steuert nur die **zusätzlichen Turnusaufgaben**, damit die tägliche Routine nicht gegen Fensteretappen oder andere Großaufgaben ausgespielt wird.


## Strikte Raumregel V4

Für **zusätzliche Turnus-/Haushaltsaufgaben** gilt:
- maximal **2 konkrete Räume pro Tag**
- niemals „alle Türklinken im Haus“
- niemals „alle Lichtschalter im Haus“
- niemals „alle Sockelleisten im Haus“
- niemals Sammelaufgaben mit `Alle Räume` oder `Mehrere Räume`
- Detailarbeiten wie Türklinken, Lichtschalter, Steckdosen, Zargen, Türblätter, Sockelleisten und erreichbare Lampen sind pro Raum eigene Aufgaben.
- Die tägliche Basisroutine bleibt separat sichtbar, weil sie laut Master jeden Tag erscheinen soll; sie wird nicht als Turnus-Raumpaket gezählt.


## V5 Startstabilität
- Fehler in der Dienstagstermin-Berechnung (`nextWeekday`) behoben.
- Neuer LocalStorage-Key verhindert alte Demo-/Fehlerdaten.
- Service Worker wird vor der App-Initialisierung registriert.
- Sichtbarer Start-Fehler statt leerer Seite bei einem künftigen Laufzeitfehler.
