from flask import Flask
from flask import render_template
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


@app.route('/')
def index():
    return render_template('index.html', alueet=postinumerotnimet)


@app.route("/40700")
def dummyAlue():
    return render_template("placeholderText.html", postinumero=40700, postinumeroNimi="jyväskylä")

@app.route("/about")
def aboutPage():
    return render_template("about.html", alueet=postinumerotnimet)