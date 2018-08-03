[![Codacy Badge](https://api.codacy.com/project/badge/Grade/05dfdb44e89241e58d7c7f4a779c6eef)](https://www.codacy.com/app/ilouHD/WebSuite-Core?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=NodeLabIT/WebSuite-Core&amp;utm_campaign=Badge_Grade) [![Build Status](https://travis-ci.org/NodeLabIT/WebSuite-Core.svg?branch=development)](https://travis-ci.org/NodeLabIT/WebSuite-Core)

# WebSuite
Die WebSuite ist ein Content-Management-System mit neuester Technik. Die Verbindung von Node.js, socket.io und Vue.js sorgt dabei für ein modernes System, das eine unvergleichbare Einzigartigkeit und Interaktion bietet, wie sie bisher kein CMS erreichen konnte. Inhalte können somit schnell und Live aktualisiert werden und auch erreichen wir mit Vue.js die Möglichkeit auf eine Single-Page-Application.

Allgemein bietet die WebSuite einen Core, über den sich vielerlei Plugins umsetzen lassen, wodurch die WebSuite auch mit vielen Plugins erweiterbar ist.

# WebSuite Core

Der Core ist das Heiligtum der gesamten Software und stellt somit den Kern der gesamten Anwendung dar. Der Core beinhaltet alle wichtigen Funktionen und dient als Schnittstelle für Entwickler. Er stellt dabei alle für Entwickler relevanten Funktionen wie z.B. die Anbindung an Datenbanken, Anbindung an den Mailserver, Socketserver, sowie verschiedene andere Nützlichkeiten (Utils) bereit.

Neben den genannten Funktionen für Entwickler, verfügt der Core über Funktionen zur einfachen Bedienbarkeit der Anwendung. Dazu gehört insbesondere das Control Panel, das die einfache Bedienbarkeit der gesamten Anwendung unterstützt und viele Einstellungsmöglichkeiten bietet.

Der Core generell wird im Clusterbetrieb laufen. So ist es einfach im laufenden Betrieb das System neuzustarten, ohne, dass der Nutzer davon etwas mitbekommt. Ebenfalls kann so garantiert werden, dass im Falle eines Fehlers, ein "Subsystem" vernünftig den Fehler loggen und sich neustarten kann.

# Discord

Du möchtest über alles informiert werden? Dann trete noch heute unserem Discord-Server bei: https://discord.gg/AmBnFbA

# Milestones

Alle Milestones des Projektes sind hier einsehbar: https://github.com/NodeLabIT/WebSuite-Core/milestones

# JSDocs

JSDocs können mit ```jsdoc -c jsdoc.json``` generiert werden. Dazu muss ```jsdoc``` global als depencdency installiert sein.
Weiterhin muss das [NodeLab-Theme für JSDoc](https://github.com/NodeLabIT/JSDoc-Theme) relativ zur ```jsdoc.json``` gesehen im Ordner ```../JSDoc-Theme/``` liegen.