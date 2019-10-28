
import geopandas as gpd, folium
from branca.colormap import linear
from branca.element import MacroElement
from jinja2 import Template

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
def luo_kartta():


    dataa = gpd.read_file("jkldata.geojson")

    m_1 = folium.Map(location=[62.24147, 25.72088], tiles='openstreetmap', zoom_start=11.6)

    colormap = linear.YlOrRd_09.scale(
    dataa.Hr_ktu.min(),
    dataa.Hr_ktu.max())
    colormap.caption = 'Keskitulo'

    colormap2 = linear.YlOrRd_09.scale(
    dataa.He_vakiy.min(),
    dataa.He_vakiy.max())
    colormap2.caption = 'Asukkaita'

    colormap3 = linear.YlOrRd_09.scale(
    dataa.Pt_opisk.min(),
    dataa.Pt_opisk.max())
    colormap3.caption = 'Opiskelijat'

    style2 = {'weight': 1, 'color': 'Black', "opacity": 0.6}

    dic1 = dataa.set_index('id')['Hr_ktu']
    dic2 = dataa.set_index('id')['He_vakiy']
    dic3 = dataa.set_index('id')['Pt_opisk']

    k1 = folium.GeoJson(open("jkldata.geojson",encoding = "utf-8").read(),
         name='Keskitulot',
         tooltip=folium.features.GeoJsonTooltip(fields=['Hr_ktu', 'nimi', "id"],
                                                aliases=["Keskitulo", "Alue", "Postinumero"]),
         style_function=lambda feature: {'fillColor': colormap(dic1[feature["properties"]["id"]]),
                                         'color': 'black',
                                         'fillOpacity': 0.7,
                                         'weight': 0.1},
         highlight_function=lambda x: style2,
         smooth_factor=2.0
         ).add_to(m_1)

    k2 = folium.GeoJson(open("jkldata.geojson",encoding = "utf-8").read(),
         name='asukkaat',
         tooltip=folium.features.GeoJsonTooltip(fields=['He_vakiy', 'nimi', "id"],
                                                aliases=["Asukkaita", "Alue", "Postinumero"]),
         style_function=lambda feature: {'fillColor': colormap2(dic2[feature["properties"]["id"]]),
                                         'color': 'black',
                                         'fillOpacity': 0.7,
                                         'weight': 0.1},
         highlight_function=lambda x: style2,
         smooth_factor=2.0,
         show=False
         ).add_to(m_1)
    k3 = folium.GeoJson(open("jkldata.geojson",encoding = "utf-8").read(),

        name='Opiskelijat',
        tooltip=folium.features.GeoJsonTooltip(fields=['Pt_opisk', 'nimi', "id"],
                                               aliases=["Opiskelijoita", "Alue", "Postinumero"]),
        style_function=lambda feature: {'fillColor': colormap3(dic3[feature["properties"]["id"]]),
                                        'color': 'black',
                                        'fillOpacity': 0.7,
                                        'weight': 0.1},
        highlight_function=lambda x: style2,
        smooth_factor=2.0,
        show=False
        ).add_to(m_1)

    htmlkp = """ 
    <iframe width="333" height="222" src="https://www.kortepohja.fi/fi/" 
    frameborder="0" 
    allowfullscreen></iframe>"""

    marker = folium.Marker([62.2489058, 25.708509], popup=htmlkp,
           icon=folium.Icon(color='red',
                            icon='home')
           )

    marker.add_to(m_1)

    m_1.add_child(colormap).add_child(colormap2).add_child(colormap3)
    m_1.add_child(BindColormap(k1, colormap)).add_child(BindColormap(k2, colormap2)).add_child(
    BindColormap(k3, colormap3))
    m_1.add_child(folium.map.LayerControl())

    return m_1
