# Unser Zuhause V2

Eigenständige, offlinefähige Haushalts-PWA für iPhone und GitHub Pages. Die App wurde neu aufgebaut und übernimmt die V363-Daten als Migrationsgrundlage, nicht aber die alte Termin- und Planungslogik.

## Dateien

- `index.html` – App-Einstieg und Navigation
- `styles.css` – responsives iPhone-Design
- `app.js` – Aufgabenmodell, Tagesansicht, Kalender, Räume, Erledigungen, Bearbeitung und Backup
- `unser-zuhause-v2-migrationsdaten.json` – Migrationsgrundlage aus V363
- `manifest.json`, `sw.js` – PWA-Installation und Offline-Cache
- `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` – App-Symbole

## GitHub Pages veröffentlichen

1. Ein neues GitHub-Repository anlegen, z. B. `unser-zuhause-v2`.
2. **Alle Dateien aus diesem Ordner** direkt in das Stammverzeichnis des Repositorys hochladen (nicht nur die HTML-Datei).
3. Unter **Settings → Pages** als Quelle `Deploy from a branch`, Branch `main`, Ordner `/ (root)` auswählen und speichern.
4. Nach dem Deployment die angezeigte GitHub-Pages-Adresse in Safari am iPhone öffnen.
5. In Safari auf **Teilen → Zum Home-Bildschirm** tippen.

## Datenhaltung und Backup

- Der V2-Zustand wird lokal im Browser (`localStorage`) gespeichert.
- Über „Mehr → Backup exportieren“ regelmäßig eine JSON-Datensicherung erstellen.
- Ein V2-Backup kann über „Mehr → Backup importieren“ wiederhergestellt werden.
- Die ursprüngliche Migrationsdatei bleibt Bestandteil des Repositories. Bei einem leeren Browser wird daraus der Anfangsbestand erzeugt.
- Die App synchronisiert Daten nicht automatisch zwischen mehreren Geräten. Dafür wäre später ein Backend erforderlich.

## Planungsregeln V2

- Ein aktiver Vorgang hat genau ein maßgebliches Datum: `nextDate`.
- Der nächste Termin nach Erledigung ergibt sich aus Erledigungsdatum plus Intervall.
- Normale Haushaltstage: höchstens 45 Minuten und maximal zwei Räume.
- Hygieneaufgaben dürfen das Zeitlimit ausnahmsweise überschreiten, nicht aber die Zwei-Räume-Grenze.
- Haushaltsfreie Tage zeigen nur kleine tägliche Routinen.
- Überfällige Aufgaben werden nicht stillschweigend in die Zukunft verschoben. Kapazitätsprobleme werden als Planungshinweise angezeigt.
- Manuelle Terminänderungen sind direkt an der Aufgabe möglich.

## Hinweis zum aktuellen Planer

Dies ist eine funktionsfähige V2-Grundversion mit neuem Datenmodell und transparenten Kapazitätshinweisen. Die automatische mehrwöchige Optimierung der Raumrotation und eine geräteübergreifende Synchronisierung sind noch nicht enthalten. Die Ersttermine für Aufgaben ohne Erledigungshistorie werden initial gestaffelt, damit nicht der gesamte Katalog am selben Tag fällig wird.
