

from branca.element import MacroElement
from jinja2 import Template
import geopandas as gpd, folium,json, pandas as pd
from branca.colormap import linear
import apidata
import os

def luodata():
    jklgeo = gpd.read_file('data/jklgeo.geojson')
    apid = apidata.get_data()
    # poista linkit, data ei voi sisältää taulukoita
    for alue in apid:
        del alue['linkit']
    data = pd.read_json(json.dumps(apid))
    data['id'] = data['id'].astype(str)
    newdata=jklgeo.merge(data)
    newdata.to_file('data/jkldata.geojson', driver="GeoJSON",encoding="utf-8")

if not os.path.isfile('data/jkldata.geojson'):
    luodata()

dataa = gpd.read_file('data/jkldata.geojson')
with open('data/jkldata.geojson', encoding='utf-8') as ff:
    geodata = json.load(ff)
selite = apidata.get_selitteet()
dataa['id'] = dataa['id'].astype(str)
m_1 = folium.Map(location=[62.24147, 25.72088], tiles='openstreetmap', zoom_start=10) #RANKING KARTTA
m_2 = folium.Map(location=[62.24147,25.72088], tiles='openstreetmap', zoom_start=10,max_bounds=True) #ETUSIVI KARTTA
m_3 = folium.Map(location=[62.24147, 25.72088], tiles='openstreetmap', zoom_start=10, max_bounds=True) #ALUE KARTTA

#VÄRIEN YHDISTYS RANKING KARTTAAN
class BindColormap(MacroElement):

    def __init__(self, layer, colormap):
        super(BindColormap, self).__init__()
        self.layer = layer
        self.colormap = colormap
        self._template = Template(u"""
        {% macro script(this, kwargs) %}
            {{this.colormap.get_name()}}.svg[0][0].style.display = 'block';
            {{this._parent.get_name()}}.on('overlayadd', function (eventLayer) {
                if (eventLayer.layer == {{this.layer.get_name()}}) {
                    {{this.colormap.get_name()}}.svg[0][0].style.display = 'block';
                }});
            {{this._parent.get_name()}}.on('overlayremove', function (eventLayer) {
                if (eventLayer.layer == {{this.layer.get_name()}}) {
                    {{this.colormap.get_name()}}.svg[0][0].style.display = 'none';
                }});
        {% endmacro %}
        """)

#RANKING KARTTA
def luomap(ominaisuus):

    colormap = linear.YlGnBu_09.scale(dataa[ominaisuus].min(), dataa[ominaisuus].max())
    colormap.caption = "{}".format(selite[ominaisuus])
    style = {'weight': 1, 'color': 'Black', "opacity": 0.6}
    dic = dataa.set_index('id')[ominaisuus]
    jklmap = folium.GeoJson(geodata,
                            name="{}".format(selite[ominaisuus]),
                            tooltip=folium.features.GeoJsonTooltip(fields=[ominaisuus, 'nimi', "id"],
                                                                   aliases=["{}".format(selite[ominaisuus]),
                                                                   "Alue", "Postinumero"]),
                            style_function=lambda feature: {'fillColor': colormap(dic[feature["properties"]["id"]]),
                                                            'color': 'black',
                                                            'fillOpacity': 0.6,
                                                            'weight': 0.1},
                            highlight_function=lambda x: style,
                            smooth_factor=2.0,
                            show=False
                            ).add_to(m_1)

    m_1.add_child(colormap)
    m_1.add_child(BindColormap(jklmap, colormap))


def embed_map(m, file_name):
    from IPython.display import IFrame
    m_1.add_child(folium.map.LayerControl(position="bottomright", collapsed=True, autoZIndex=True))
    m.save(file_name)

    return IFrame(file_name, width='100%', height='500px')
#LUO RANK MAP, VAIN OSA NYT
def luo_kartta():
    layers = ["He_vakiy", "He_as_tiheys", "He_naiset_pros", "He_miehet_pros", "He_kika", "Hr_ktu", "Hr_pi_tul_pros", "Hr_ke_tul_pros",
              "Hr_hy_tul_pros", "Pt_opisk_pros", "Pt_tyott_pros", "Pt_tyoll_pros", "Pt_elakel_pros", "Pt_0_14_pros", "Ko_perus_pros",
              "Ko_yliop_pros", "Ko_ammat_pros", "Ko_al_kork_pros", "Ko_yl_kork_pros", "Ra_pt_as_pros", "Ra_kt_as_pros", "Ra_as_kpa",
              "Ra_ke", "Te_takk", "Te_omis_as_pros", "Te_vuok_as_pros", "Tp_alku_a_pros", "Tp_jalo_bf_pros", "Tp_palv_gu_pros",
              "yritykset_lkm"]

    for layer in layers:
        luomap(layer)

    embed_map(m_1, 'templates/m_1.html')

#ETUSIVUN MAP TYYLIT
def luo_pntyyli(i):

    style = {'weight': 3, 'color': 'Green', "opacity": 0.6, 'fillColor': '#006400'}
    style2 = {'fillColor': '#32CD32', "opacity": 0.6, 'weight': 1, 'color': 'Black', "opacity": 0.6}
    folium.GeoJson(geodata["features"][i],
                   name=geodata["features"][i]["properties"]["nimi"],
                   highlight_function=lambda x: style,
                   style_function=lambda x: style2,
                   tooltip=folium.features.GeoJsonTooltip(fields=['nimi', "id"], aliases=["Alue", "Postinumero"])

                   ).add_to(m_2)
#ALUE KARTTA TYYLIT
def luo_ykstyyli(i):

    style = {'weight': 3, 'color': 'Green', "opacity": 0.6, 'fillColor': '#006400'}
    style2 = {'fillColor': '#32CD32', "opacity": 0.6, 'weight': 1, 'color': 'Black', "opacity": 0.6}
    folium.GeoJson(geodata["features"][i],
                   name=geodata["features"][i]["properties"]["nimi"],
                   highlight_function=lambda x: style,
                   style_function=lambda x: style2,
                   tooltip=folium.features.GeoJsonTooltip(fields=['nimi', "id"], aliases=["Alue", "Postinumero"])

                   ).add_to(m_3)

#LUO YHDEN ALUEEN KARTAN
def luo_yksalue(pk):
    global m_3
    for i in range(len(geodata["features"])):
        if geodata["features"][i]["properties"]["id"] == pk:
            m_3 = folium.Map(location=geodata["features"][i]["geometry"]["coordinates"][0][3][::-1], tiles='openstreetmap', zoom_start=12, max_bounds=True)
            luo_ykstyyli(i)
            break
    return m_3

#LUO ETUSIVUN KARTAN=
def luo_jokaalue():
    for i in range(len(geodata["features"])):
        luo_pntyyli(i)
    m_2.save('templates/m_2.html')
    return m_2





