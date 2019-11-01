

from branca.element import MacroElement
from jinja2 import Template
import geopandas as gpd, folium,json
from branca.colormap import linear



dataa = gpd.read_file("jkldata.geojson")
with open('data.json') as json_file:
            selite = json.load(json_file)
dataa['id'] = dataa['id'].astype(str)
m_1 = folium.Map(location=[62.24147, 25.72088], tiles='openstreetmap', zoom_start=10)
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


def luomap(ominaisuus):

    colormap = linear.YlOrRd_09.scale(dataa[ominaisuus].min(), dataa[ominaisuus].max())
    colormap.caption = "{}".format(selite['dataset']['dimension']['Tiedot']['category']['label'][ominaisuus])
    style = {'weight': 1, 'color': 'Black', "opacity": 0.6}
    dic = dataa.set_index('id')[ominaisuus]
    jklmap = folium.GeoJson(open("jkldata.geojson",encoding = "utf-8").read(),
                            name="{}".format(selite['dataset']['dimension']['Tiedot']['category']['label'][ominaisuus]),
                            tooltip=folium.features.GeoJsonTooltip(fields=[ominaisuus, 'nimi', "id"],
                                                                   aliases=["{}".format(
                                                                       selite['dataset']['dimension']['Tiedot'][
                                                                           'category']['label'][ominaisuus]), "Alue",
                                                                            "Postinumero"]),
                            style_function=lambda feature: {'fillColor': colormap(dic[feature["properties"]["id"]]),
                                                            'color': 'black',
                                                            'fillOpacity': 0.7,
                                                            'weight': 0.1},
                            highlight_function=lambda x: style,
                            smooth_factor=2.0,
                            show=False
                            ).add_to(m_1)
    m_1.add_child(colormap)
    m_1.add_child(BindColormap(jklmap, colormap))
def embed_map(m, file_name):
    from IPython.display import IFrame
    m.save(file_name)
    return IFrame(file_name, width='100%', height='500px')
def luo_kartta():
    #luo kaikista kentistä kartat
    for i in dataa.columns[5:75]:
        luomap(i)
    for i in dataa.columns[100:107]:
        luomap(i)



    m_1.add_child(folium.map.LayerControl(position="topright", collapsed=True, autoZIndex=False))
    embed_map(m_1, 'templates/m_1.html')
