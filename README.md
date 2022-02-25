# Tarjouspohja
Selaimessa toimiva interaktiivinen HTML5/CSS/Javascript/Typescript -työkalu tarjousviestien generointia varten.

## Osoite
[tarjous.raiha.rocks](https://tarjous.raiha.rocks/)

## Kuinka työstän?

Tärkeimmät osat ovat [index.html](src/index.html) - ja [index.ts](src/index.ts) -tiedostot. Jos haluat kääntää index.ts-tiedostosta tarvittavan **index.js**-tiedoston, täytyy sinun ajaa Typescript kääntäjä (`tsc` tai `deno`) src-kansiossa, jolloin index.js generoituu valittuun kansioon.

Koko paketin saa denon kanssa tehtyä ajamalla seuraavan skriptin
```bash
kokokaannos.sh
```

## Docker

Jos haluat kääntää koodin ja jaella sitä dockerin kautta omalle selaimellesi, voit käyttää seuraavia komentoja
```bash
docker build -t tarjouspohja .
```
ja
```bash
docker run -p 8088:80 tarjouspohja
```
jonka jälkeen voit avata selaimessasi osoitteen [http://localhost:8088](http://localhost:8088)

## Lisenssi

Koodin lisenssi (*.ts-, *.js- ja *.bash-tiedostot) on **The Unlicense**, katso [LICENSE](https://github.com/mcraiha/Tarjouspohja/blob/master/LICENSE)

CSS-tyylitiedoston ([mvp.css](src/mvp.css)) lisenssi on [MIT-lisenssi](https://fi.wikipedia.org/wiki/MIT-lisenssi)

Ikonitiedostot ([big_icon.png](big_icon.png) ja [favicon.ico](src/favicon.ico)) kuuluvat [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) -lisenssin alle, koska ikoni koostuu 💻 - ja 💶 -emojeista, joiden kuvat ovat osa [Twitter Emoji (Twemoji)](https://github.com/twitter/twemoji) -projektia.

Ikonitiedosto ([clipboard-line.svg](src/clipboard-line.svg)) kuuluu [Remix Icon](https://github.com/Remix-Design/remixicon) -pakettiin ja se on [Apache License Version 2.0](https://github.com/Remix-Design/remixicon/blob/master/License) -lisenssin alla.
