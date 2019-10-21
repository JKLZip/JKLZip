from flask import Flask
from flask import render_template
from flask import request
import json
import os
import urllib.request
app = Flask(__name__)

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
    if os.path.isfile('data-sorted.json'):
        with open('data-sorted.json') as json_file:
            data = json.load(json_file)
        return data
    else:
        if os.path.isfile('data.json'):
            with open('data.json') as json_file:
                data = json.load(json_file)
            return sort_data(data)
        else:
            data = query_api()
            with open('data.json', 'w') as outfile:
                json.dump(data, outfile)
            return sort_data(data)

def sort_data(data):
    alueet = data['dataset']['dimension']['Postinumeroalue']['category']['label']
    tiedot = data['dataset']['dimension']['Tiedot']['category']['index']
    arvot = data['dataset']['value']

    alueet_taulu = [x for x in alueet]
    tiedot_taulu = [x for x in tiedot]
    alue_arvot = [arvot[x:x+len(tiedot)] for x in range(0, len(arvot), len(tiedot))]

    data_sorted = []
    for i in range(0, len(alueet_taulu)):
        data_alue = {}
        data_alue['id'] = alueet_taulu[i]
        data_alue['nimi'] = alueet[alueet_taulu[i]][6:-15]
        for j in range(0, len(tiedot_taulu)):
            data_alue[tiedot_taulu[j]] = alue_arvot[i][j]
        data_sorted.append(data_alue)

    with open('data-sorted.json', 'w') as outfile:
        json.dump(data_sorted, outfile)

    return data_sorted

def get_alueet():
    data = get_data()
    alueet = []
    for i in range(0, len(data)):
        alue = {}
        alue['id'] = data[i]['id']
        alue['nimi'] = data[i]['nimi']
        alueet.append(alue)
    return alueet

@app.route('/')
def index():
    data = get_data()
    alueet = get_alueet()
    return render_template('index.html', alueet=alueet)

@app.route('/alue')
def alue():
    data = get_data()
    pnro = request.args.get('pnro', default = '40100', type = str)
    index = 0
    for i in range(0, len(data)):
        if data[i]['id'] == pnro:
            index = i
            break
    return render_template('charts.html', data=data[index])

@app.route('/about')
def about():
    alueet = get_alueet()
    return render_template('about.html', alueet=alueet)
