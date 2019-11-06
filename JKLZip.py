from flask import Flask
from flask import render_template
from flask import request
import apidata
import kartta
import os
app = Flask(__name__)

@app.route('/')
def index():
    if os.path.isfile('templates/m_1.html'):
        alueet = apidata.get_alueet()
        return render_template('index.html', alueet=alueet)
    else:
        kartta.luo_kartta()
        alueet = apidata.get_alueet()
        return render_template('index.html', alueet=alueet)


@app.route('/alue')
def alue():
    data = apidata.get_data()
    pnro = request.args.get('pnro', default = '40100', type = str)

    index = 0
    for i in range(0, len(data)):
        if data[i]['id'] == pnro:
            index = i
            break
    alueet = apidata.get_alueet()
    selitteet = apidata.get_selitteet()

    return render_template('charts.html', alueet = alueet, selitteet = selitteet, data = data[index])

@app.route('/about')
def about():
    alueet = apidata.get_alueet()
    return render_template('about.html', alueet = alueet)

@app.route('/ranking')
def ranking():
    alueet = apidata.get_alueet()
    data = apidata.get_data()
    selitteet = apidata.get_selitteet()
    return render_template('ranking.html', alueet = alueet,data=data, selitteet = selitteet)

@app.route('/map')
def jklmap():
    return render_template('m_1.html')

@app.route('/aluemap')
def aluemap():
    alue = kartta.luo_jokaalue()
    return alue._repr_html_()

@app.route('/pnmap')
def pnmap():
    pnro = request.args.get('pnro', default = '40100', type = str)
    yksalue = kartta.luo_yksalue(pnro)
    return yksalue._repr_html_()





