# Unser Zuhause 🏡

GitHub-Pages-fertige, dependency-freie PWA.

## Wichtig
Diese Version verwendet ausschließlich relative Pfade (`./...`), damit sie auch in einem GitHub-Pages-Repository unter einem Unterpfad korrekt funktioniert. Die App hat außerdem einen sichtbaren Fehler-Fallback statt einer komplett leeren Seite.

## GitHub Pages
1. Inhalt dieses Ordners ins Repository hochladen.
2. Settings → Pages → Deploy from branch → `main` → `/ (root)`.
3. Die erzeugte Pages-Adresse auf dem iPhone in Safari öffnen.
4. Teilen → Zum Home-Bildschirm.

## Architektur
Katalog, Kalender und Heute lesen dieselbe lokale Aufgaben-Datenbasis. Terminänderungen werden auf derselben Aufgabe gespeichert. Die Daten liegen lokal auf dem Gerät.
