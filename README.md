# Unser Zuhause V2

Elegante, mobile-first Haushaltsorganisations-PWA für iPhone und GitHub Pages.

## Dateien

- `index.html` – App-Einstieg und Navigation
- `app.js` – Aufgabenverwaltung, Migration, Tagesplanung und Interaktionen
- `styles.css` – elegantes Elfenbein-/Salbeigrün-Design und responsive Oberflächen
- `manifest.json`, `sw.js` – PWA- und Offline-Konfiguration
- `unser-zuhause-v2-migrationsdaten.json` – Migrationsgrundlage aus V363 und dem Backup vom 02.11.2026
- `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` – App-Symbole

## GitHub Pages

1. Alle Dateien aus diesem Ordner in das Stammverzeichnis eines GitHub-Repositories hochladen.
2. In **Settings → Pages** `Deploy from a branch`, Branch `main`, Ordner `/ (root)` auswählen.
3. Die veröffentlichte URL in Safari am iPhone öffnen und über **Teilen → Zum Home-Bildschirm** installieren.
4. Die App beim ersten Öffnen online laden lassen. Danach werden die App-Dateien über den Service Worker offline bereitgestellt.

## Bedienkonzept

- **Heute:** Tagesüberblick mit Gesamtminuten, Räumen, Aufgaben und Fortschritt.
- Tägliche Routinen sind nach **Morgens**, **Nach Mahlzeiten**, **Abends** und **Tagescheck** gruppiert.
- Geplante Reinigungsaufgaben sind nach **Räumen** gebündelt. Beide Gruppierungsebenen sind einklappbar.
- **Kalender:** Monatsansicht, Tagesdetails und manuell markierbare haushaltsfreie Tage.
- **Aufgaben:** durchsuchbarer und filterbarer Gesamtkatalog.
- **Räume:** Räume nach Stockwerk sowie der Fensterbestand.
- **Mehr:** Regeln, Backups, Import/Export und Migrationsinformationen.

## Verbindliche Planungsregeln

- Normale Haushaltstage: höchstens 45 Minuten geplante Raumaufgaben.
- Höchstens zwei Räume pro Haushaltstag, auch bei Hygiene-Ausnahmen.
- Hygieneaufgaben dürfen ausnahmsweise das Zeitlimit überschreiten.
- Haushaltsfreie Tage zeigen nur kleine tägliche Routinen; die Raumrotation pausiert.
- Jede aktive Aufgabe hat genau ein maßgebliches Datum (`nextDate`).
- Planungskonflikte werden sichtbar ausgewiesen und nicht stillschweigend in die Zukunft verschoben.

## Datensicherheit

Der V2-Zustand wird lokal im Browser gespeichert. Über **Mehr → Backup exportieren** regelmäßig eine JSON-Sicherung herunterladen. Vor dem ersten produktiven Einsatz und nach größeren Änderungen eine Sicherung erstellen. Das alte V363-Backup bleibt separat aufzubewahren.

## Technischer Status

Dies ist die überarbeitete V2-Grundversion mit neu strukturierter Heute-Ansicht und eleganter visueller Hierarchie. Vor dem endgültigen Ersatz von V363 sind insbesondere die vollständige dynamische Raumrotation, umfangreiche Migrationstests und iPhone-Installations-/Offline-Tests mit echten Nutzungsdaten weiter zu validieren. Die PWA speichert lokal und synchronisiert nicht automatisch zwischen mehreren Geräten.

## Neue Funktionen – Energie & Erledigungshistorie
- In der Aufgabenbearbeitung können einzelne Raumaufgaben über „Ich habe Energie – heute vorziehen“ in den fixierten Tagesplan aufgenommen werden. Die Aktion respektiert maximal zwei Räume und 45 Minuten (Hygieneaufgaben ausgenommen); bei ausgeschöpfter Kapazität wird nichts verändert.
- Im Aufgabenkatalog werden Aufgaben, die mindestens einmal erledigt wurden (Erledigungsdatum, Historie oder Erledigungsprotokoll), dezent grün markiert.
