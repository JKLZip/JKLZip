from flask import Flask
from flask import render_template
from flask import request
import apidata
import kartta
app = Flask(__name__)

@app.route('/')
def index():
    alueet = apidata.get_alueet()
    return render_template('index.html', alueet = alueet)

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
    return render_template('ranking.html', alueet = alueet)
@app.route('/map')
def jklmap():
    jklkartta=kartta.luo_kartta()
    return  jklkartta._repr_html_()
