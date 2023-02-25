# Sähkön spot-hinta
Reactilla ja Typescriptillä toteutettu web-sovellus, joka näyttää sähkön spot-hinnan annetun vuorokauden ajalta.
Kaavio luotu Chart.js- ja react-chartjs-2 -kirjastoja käyttäen.

[Kuvakaappaus sovelluksesta](./sovellus_screenshot.png)

## Ongelmakohtia ja ratkaisuja
- En ollut aiemmin käyttänyt Chart.js-kirjastoa, joten aloitin tutustumalla sen dokumentaatioon.
- Otin kellonajat aluksi suoraan aikaleimoista. Myöhemmin huomasin aikaleimojen viittaavan UTC-aikaan ja muunsin kellonajat Suomen aikaan Date-olion toLocaleTimeString()-metodia käyttäen. 
- Pystymallinen palkkikaavio vaikutti mobiilinäkymässä turhan tiiviiltä, joten päätin luoda myös vaakamallisen palkkikaavion, joka näkyy alle 600px leveillä näytöillä. 

## Jatkokehitysideoita
- Listanäkymä, jonka saisi avattua kaavion alle
- Puuttuvan datan huomioiminen.
    - Tällä hetkellä sovellus näyttää "ei saatavilla" -tekstin jos koko vuorokauden data puuttuu tai sitä ei saada ladattua, mutta sellaista tilannetta, jossa data vaikka yhden tunnin kohdalta puuttuu, ei ole käsitelty. Puuttuva data voisi näkyä aukkona kaaviossa, ja kaavion alle voisi tulla ilmoitus asiasta.
- Arvonlisäveroprosentin määritys päivämäärän perusteella (10% vai 24%)
- Dark mode, koska pitäähän se nyt olla :)

## Arvio käytetystä ajasta
4-5 tuntia