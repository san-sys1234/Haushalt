# Unser Zuhause 🏡

Eine iPhone-first Haushaltsmanagement-PWA nach dem Master-Prompt.

## Enthalten

- **Heute**: zentrale, realistische Tagesplanung
- **Kalender**: 12-Monats-Ansicht mit derselben Planungslogik
- **Aufgabenkatalog**: Suche, Hinzufügen und Bearbeiten
- **Haus**: Räume, Wochenstruktur und Modus
- **Baby-/Leichtmodus**
- **„Ich habe Energie“**
- **Swipe**: rechts = erledigt, links = später
- **Me-Time**
- lokale Speicherung über `localStorage`
- PWA-Manifest, Service Worker und iPhone-Icon
- keine externen Bibliotheken

## GitHub Pages

1. Alle Dateien dieses Ordners in ein neues GitHub-Repository hochladen.
2. Repository → **Settings → Pages**.
3. Als Quelle **Deploy from a branch** wählen.
4. Branch `main`, Ordner `/ (root)` wählen.
5. Nach der Veröffentlichung die GitHub-Pages-Adresse auf dem iPhone in Safari öffnen.
6. **Teilen → Zum Home-Bildschirm**.

## Architektur

Die App besitzt eine zentrale `state`-Datenbasis. `planFor(date)` erzeugt den Tagesplan. Katalog, Kalender und Heute greifen auf dieselben Aufgaben und dieselbe Terminquelle zu.

Wichtig: Diese erste Version ist bewusst als stabile, dependency-freie PWA gebaut. Die Planungslogik kann anschließend weiter verfeinert werden, ohne die drei Ansichten mit unterschiedlichen Terminberechnungen zu versehen.

## Hinweis

Die Demo-Daten bilden die im Master beschriebenen Räume, Routinen, Intervalle und Aufwandsklassen ab. Die Daten können direkt im Aufgabenkatalog weiter ergänzt und geändert werden.
