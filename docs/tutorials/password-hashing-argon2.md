Argon2 ist laut **Password Hashing Competition (PHC)** 2015 als sicherster Algorithmus zum hashen von Passwörtern empfohlen worden.

> Es existierten zunächst zwei Varianten von Argon2: die Variante Argon2i zielt auf Sicherheit gegenüber [Seitenkanalangriffen](https://de.wikipedia.org/wiki/Seitenkanalattacke) ab, während die Variante Argon2d vorwiegend vor GPU-[Brute-Force-Angriffen](https://de.wikipedia.org/wiki/Brute-Force-Methode) schützen soll. Argon2d wurde für Kryptowährungen und Backend-Server-Authentifizierungen empfohlen, während Argon2i für Frontend-Server-Authentifizierungen und Festplatten-Verschlüsselungen empfohlen wurde. Im Zweifel empfahlen die Entwickler, Argon2i zu verwenden. Beide Varianten verfügen über drei Parameter, mit denen sich die CPU-Rechenzeit, der Speicherverbrauch und die Parallelisierbarkeit einstellen lassen.
>
> Im März 2017 wurde ein Dokument der IETF der Version 1.3 veröffentlicht, das die Variante Argon2id als primäre Variante vorstellt und Argon2i und Argon2d nur noch als zusätzliche Varianten aufführt. Argon2id ist eine hybride Funktion, deren erster Teil resistent gegen cache timing attacks ist, während der zweite Teil einen [Time-Memory Tradeoff](https://de.wikipedia.org/wiki/Time-Memory_Tradeoff) verhindern soll.
> ###### *Quelle: [Wikipedia](https://de.wikipedia.org/wiki/Password_Hashing_Competition#Argon2)*

### Sicher, dennoch deaktiviert
Auch wenn an Argon2 als Vorteil erstmal die Sicherheit genannt werden kann, so bringt es doch einige Nachteile, die uns dazu gezwungen haben, Argon2 als Hashing-Algorithmus standardmäßig zu deaktivieren.
Der Grund für diese Entscheidung liegt auf der Hand: Die Installation von Argon2 stellt sich als eher umfangreich und schwierig heraus.

Da Argon2 als C++-Binding nativ in die Software eingearbeitet ist (siehe [npm](https://www.npmjs.com/package/argon2)) müssen verschiedene Programme und Libraries installiert sein, um diese Klassen zu kompilieren. Da diese nicht mittels npm mitinstalliert werden können (u.A. Visual Studio 2015), muss die Installation von argon2 manuell durchgeführt werden.

Somit wird standardmäßig bcrypt zum Hashen der Passwörter verwendet. Sofern die Nutzung von Argon2 gewünscht ist, so kann dieses mittels der folgenden Anleitung installiert werden.

**Information:** Ein Umstieg von bcrypt auf Argon2 ist auch noch später möglich, da mittels bcrypt gehashte und gespeicherte Passwörter auch nach Aktivierung von Argon2 noch verifiziert werden können. Dabei wird der mittels bcrypt gespeicherte Hash dann mit dem neuen durch Argon2 generierte Hash getauscht. Ein Wechsel in die andere Richtung (also von Argon2 zu bcrypt) wird aktuell nicht unterstützt.

### Installation: Linux