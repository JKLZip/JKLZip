from flask import Flask
from flask import render_template
from flask import request
import apidata
import kartta
import os
app = Flask(__name__)

@app.route('/')
def index():
    alueet = apidata.get_alueet()
    return render_template('index.html', alueet=alueet)

@app.route('/alue')
def alue():
    alueet = apidata.get_alueet()
    data = apidata.get_data()
    selitteet = apidata.get_selitteet()
    pnro = request.args.get('pnro', default = '40100', type = str)
    index = apidata.get_index(data, pnro)
    return render_template('charts.html', alueet = alueet, data = data[index], selitteet = selitteet)

@app.route('/about')
def about():
    alueet = apidata.get_alueet()
    return render_template('about.html', alueet = alueet)

@app.route('/ranking')
def ranking():
    if not os.path.isfile('templates/m_1.html'):
        kartta.luo_kartta()
    alueet = apidata.get_alueet()
    data = apidata.get_data()
    selitteet = apidata.get_selitteet()
    return render_template('ranking.html', alueet = alueet, data = data, selitteet = selitteet)

@app.route('/map')
def jklmap():
    return render_template('m_1.html')

@app.route('/aluemap')
def aluemap():
    if os.path.isfile('templates/m_2.html'):
        return render_template('m_2.html')
    else:
        alue = kartta.luo_jokaalue()
        return alue._repr_html_()

@app.route('/pnmap')
def pnmap():
    pnro = request.args.get('pnro', default = '40100', type = str)
    yksalue = kartta.luo_yksalue(pnro)
    return yksalue._repr_html_()
