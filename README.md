# JKLZip
License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.


Jyväskylän yliopiston kurssin harjoitustyö. Tekijät: Tuomas Kontio, Jari Lindroos, Miikka Ruohoniemi ja Ossi Vanhala.

Datan lähteenä käytetty Tilastokeskuksen postinumeroalueittainen avoin tieto -tietokantaa (PAAVO) vuodelta 2019. Lisenssi Creative Commons Nimeä 4.0.

Jyväskylän koulujen oppilasmäärien lähteenä on Jyväskylän kaupungin tarjoama data. Koulujen osoitteiden lähde on Jyväskylän kaupunki.

Alueiden yritysten datan lähde Suomen Yritys- ja yhteisötietojärjestelmän (YTJ) avoimet tiedot CSV-tiedostona. Lisenssi Creative Commons Nimeä 4.0. Alueiden yritysten lukumäärään on laskettu vuoden 2017 lopussa toiminnassa olleet osakeyhtiöt, osuuskunnat ja vakuutusyhtiöt, joilla on osoite kyseisellä postinumeroalueella.

Postinumeroalueiden rajat eivät vastaa täysin kuntarajoja, sillä sama postinumero voi jakaantua useamman kunnan alueelle. Sivustolla on listattu postinumeroalueet, jotka ovat ainakin osittain ovat Jyväskylän kaupungin alueella.

## Asennusohjeet:
Ohjeet ovat tehty linuxille, mutta peruspiirteittäin toimivat myös Windows -ympäristöissä.
Ohjelma on tehty käyttämällä Pythonin Flask -kirjastoa. Vaaditty Pythonin versio on vähintään Python 3.6.9. 

Asenna riippuvuudet:

```
pip install -r requirements.txt
```
Aseta ympäristömuuttujat Flaskin vaatimalla tavalla(ks. Flaskin dokumentaatio) tai muuta JKLZip.py -> app.py
Käynnistä Kehityspalvelin ``` flask run```

Julkaisukäytössä ja muussa tehoa vaativammassa käytössä on suositeltavaa käyttää jotain muuta WSGI-palvelinta esimerkiksi Gunicornia. Sen ohjeet löytyvät flaskin dokumentaatiosta https://flask.palletsprojects.com/en/1.1.x/deploying/wsgi-standalone/#gunicorn

Lyhyesti asenna gunicorn ja käynnistä WSGI -palvelin ```gunicorn -w 4 JKLZip:app``` jolloin palvelin käynnistyy localhostin porttiin 8000. 
Tämän jälkeen voit käyttää esimerkiksi Nginx:ää ohjaamaan liikenteen portista 80 porttiin 8000. 
Yksinkertainen esimerkki Nginx:n config -tiedostosta sijainnissa /etc/nginx/sites-enabled. Aseta oman palvelimen nimi kohtaan ```PALVELIMEN_NIMI```
```
   server {
  2        listen 80;
  3        server_name PALVELIMEN_NIMI;
  4        access_log  /var/log/nginx/example.log;
  5 
  6        location / {
  7            proxy_pass http://127.0.0.1:8000;
  8            proxy_set_header Host $host;
  9            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
 10       }
 11     }
```
Seuraavaksi käynnistä nginx uudelleen komennolla : ```sudo service nginx restart```
