from flask import Flask
from flask import render_template
from flask import request
import json
import os
import urllib.request
app = Flask(__name__)

# lista vain kehityskäyttöön
postinumerotnimet = ["40100 Jyväskylä Keskus",
                     "40200 Mannila-Taulumäki",
                     "40250 Ritoniemi-Lohikoski",
                     "40270 Pappilanrinne-Pappilanvuori",
                     "40320 Seppälän Teollisuusalue",
                     "40340 Huhtasuo",
                     "40400 Halssila",
                     "40420 Jyskä",
                     "40500 Keljo-Ristonmaa",
                     "40520 Kuokkala-Ristikivi",
                     "40530 Keljonkangas",
                     "40600 Mattilanpelto",
                     "40620 Keskussairaala-alue-Kukkumäki",
                     "40630 Kypärämäki",
                     "40640 Keltinmäki",
                     "40660 Länsi-Palokka",
                     "40700 Mäki-Matti",
                     "40720 Nisula",
                     "40740 Kortepohja",
                     "40800 Vaajakoski",
                     "40820 Vuoritsalo",
                     "40900 Säynätsalo",
                     "41120 Puuppola",
                     "41140 Kuikka",
                     "41160 Tikkakoski",
                     "41450 Leppälahti",
                     "41630 Oravasaari",
                     "41710 Rutalahti-Kivisuo",
                     "41800 Korpilahti Keskus",
                     "41820 Saakoski",
                     "41840 Moksi,",
                     "41860 Rannila,",
                     "41870 Putkilahti",
                     "41880 Oittila",
                     "41930 Kuohu",
                     "41940 Vesanka"]

def query_api():
    api = "http://pxnet2.stat.fi/PXWeb/api/v1/fi/Postinumeroalueittainen_avoin_tieto/2019/paavo_9_koko_2019.px"

    query = {
        "query": [
            {
                "code": "Postinumeroalue",
                "selection": {
                    "filter": "item",
                    "values": [
                        "40100",
                        "40200",
                        "40250",
                        "40270",
                        "40320",
                        "40340",
                        "40400",
                        "40420",
                        "40500",
                        "40520",
                        "40530",
                        "40600",
                        "40620",
                        "40630",
                        "40640",
                        "40660",
                        "40700",
                        "40720",
                        "40740",
                        "40800",
                        "40820",
                        "40900",
                        "41120",
                        "41140",
                        "41160",
                        "41450",
                        "41630",
                        "41710",
                        "41800",
                        "41820",
                        "41840",
                        "41860",
                        "41870",
                        "41880",
                        "41930",
                        "41940"
                    ]
                }
            }
        ],
        "response": {
            "format": "json-stat"
        }
    }

    params = json.dumps(query).encode('utf8')
    req = urllib.request.Request(api, data=params, headers={'Content-Type': 'application/json'})
    response = urllib.request.urlopen(req)
    return json.loads(response.read())

def get_data():
    if os.path.isfile('data.json'):
        with open('data.json') as json_file:
            data = json.load(json_file)
        return data
    else:
        data = query_api()
        with open('data.json', 'w') as outfile:
            json.dump(data, outfile)
        return data

@app.route('/')
def index():
    return render_template('index.html', alueet=postinumerotnimet)

@app.route("/40700")
def dummyAlue():
    return render_template("placeholderText.html", postinumero=40700, postinumeroNimi="jyväskylä")

@app.route('/alue')
def alue():
    data = get_data()
    pnro = request.args.get('pnro', default = '40100', type = str)
    return render_template('charts.html', postinumero=pnro, postinumeroNimi="jyväskylä", data=data)

@app.route("/about")
def aboutPage():
    return render_template("about.html", alueet=postinumerotnimet)
