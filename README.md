# WebSuite
Die WebSuite ist ein Content-Management-System mit neuester Technik. Die Verbindung von Node.js, socket.io und Vue.js sorgt dabei für ein modernes System, das eine unvergleichbare Einzigartigkeit und Interaktion bietet, wie sie bisher kein CMS erreichen konnte. Inhalte können somit schnell und Live aktualisiert werden und auch erreichen wir mit Vue.js die Möglichkeit auf eine Single-Page-Application.

Allgemein bietet die WebSuite einen Core, über den sich vielerlei Plugins umsetzen lassen, wodurch die WebSuite auch mit vielen Plugins erweiterbar ist.

# WebSuite Core

Der Core ist das Heiligtum der gesamten Software und stellt somit den Kern der gesamten Anwendung dar. Der Core beinhaltet alle wichtigen Funktionen und dient als Schnittstelle für Entwickler. Er stellt dabei alle für Entwickler relevanten Funktionen wie z.B. die Anbindung an Datenbanken, Anbindung an den Mailserver, Socketserver, sowie verschiedene andere Nützlichkeiten (Utils) bereit.

Neben den genannten Funktionen für Entwickler, verfügt der Core auch über Funktionen zur einfachen Bedienbarkeit der Anwendung. Dazu gehört insbesondere ein Control Panel, ein Installer, ein Updater für Module.

Der Core generell wird im Clusterbetrieb laufen. So ist es einfach im laufenden Betrieb das System neuzustarten, ohne, dass der Nutzer davon etwas mitbekommt. Ebenfalls kann so garantiert werden, dass im Falle eines Fehlers, ein "Subsystem" vernünftig den Fehler loggen und sich neustarten kann.
