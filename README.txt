Om de gameserver werkend te krijgen moeten er een aantal dingen gedaan worden:
1. Node.js moet geïnstalleerd staan op het systeem. Dit doe je door middel van deze link: https://nodejs.org/en/download/
2. De poort 2017 moet vrij zijn.

Mocht poortnummer 2017 al in gebruik zijn, dan kun je deze aanpassen op de volgende manier:
1. Open server.js
2. Navigeer naar regel 16
3. verander 2017 in de regel naar een ander getal:
server.listen(process.env.PORT || 2017,function(){
server.listen(process.env.PORT || XXXX,function(){
4. Sla het bestand op

Wanneer aan al deze voorwaarden voldaan is kun je de server starten met het openen van run.bat.
De console schrijft "Listening on 2017" (of andere poort)

Open daarna meerdere tabs in een browser en navigeer naar "localhost:2017" (of andere poort)