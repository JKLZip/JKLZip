import csv
import json
import os
import urllib.request

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

def get_api_data():
    if os.path.isfile('data.json'):
        with open('data.json') as json_file:
            data = json.load(json_file)
        return data
    else:
        data = query_api()
        with open('data.json', 'w') as outfile:
            json.dump(data, outfile)
        return data

def get_data():
    if os.path.isfile('data-sorted.json'):
        with open('data-sorted.json') as json_file:
            data = json.load(json_file)
        return data
    else:
        data = sort_data(get_api_data())
        data = laske_prosentit(data)
        data = lisaa_koulut(data)
        data = lisaa_yritykset(data)
        with open('data-sorted.json', 'w') as outfile:
            json.dump(data, outfile)
        return data

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

def get_index(data, pnro):
    index = 0
    for i in range(0, len(data)):
        if data[i]['id'] == pnro:
            index = i
            break
    return index

def get_selitteet():
    data = get_api_data()
    selitteet = data['dataset']['dimension']['Tiedot']['category']['label']
    selitteet['He_as_tiheys'] = "Asukastiheys, asukas/km^2"
    selitteet['He_naiset_pros'] = selitteet['He_naiset'] + " %"
    selitteet['He_miehet_pros'] = selitteet['He_miehet'] + " %"
    selitteet['Hr_pi_tul_pros'] = selitteet['Hr_pi_tul'] + " %"
    selitteet['Hr_ke_tul_pros'] = selitteet['Hr_ke_tul'] + " %"
    selitteet['Hr_hy_tul_pros'] = selitteet['Hr_hy_tul'] + " %"
    selitteet['Ko_perus_pros'] = selitteet['Ko_perus'] + " %"
    selitteet['Ko_koul_pros'] = selitteet['Ko_koul'] + " %"
    selitteet['Ko_yliop_pros'] = selitteet['Ko_yliop'] + " %"
    selitteet['Ko_ammat_pros'] = selitteet['Ko_ammat'] + " %"
    selitteet['Ko_al_kork_pros'] = selitteet['Ko_al_kork'] + " %"
    selitteet['Ko_yl_kork_pros'] = selitteet['Ko_yl_kork'] + " %"
    selitteet['Pt_tyoll_pros'] = selitteet['Pt_tyoll'] + " %"
    selitteet['Pt_tyott_pros'] = selitteet['Pt_tyott'] + " %"
    selitteet['Pt_0_14_pros'] = selitteet['Pt_0_14'] + " %"
    selitteet['Pt_opisk_pros'] = selitteet['Pt_opisk'] + " %"
    selitteet['Pt_elakel_pros'] = selitteet['Pt_elakel'] + " %"
    selitteet['Pt_muut_pros'] = selitteet['Pt_muut'] + " %"
    selitteet['Ra_pt_as_pros'] = selitteet['Ra_pt_as'] + " %"
    selitteet['Ra_kt_as_pros'] = selitteet['Ra_kt_as'] + " %"
    selitteet['Te_omis_as_pros'] = selitteet['Te_omis_as'] + " %"
    selitteet['Te_vuok_as_pros'] = selitteet['Te_vuok_as'] + " %"
    selitteet['Te_muu_as_pros'] = selitteet['Te_muu_as'] + " %"
    selitteet['Tp_alku_a_pros'] = selitteet['Tp_alku_a'] + " %"
    selitteet['Tp_jalo_bf_pros'] = selitteet['Tp_jalo_bf'] + " %"
    selitteet['Tp_palv_gu_pros'] = selitteet['Tp_palv_gu'] + " %"
    selitteet['koulut_ak_lkm'] = "Alakoulujen lukumäärä"
    selitteet['koulut_ak_oppilaat'] = "Alakoulujen oppilasmäärä yhteensä"
    selitteet['koulut_ak_ryhmat'] = "Alakoulujen opetusryhmien lukumäärä yhteensä"
    selitteet['koulut_ak_ryhmakoko'] = "Alakoulujen keskimääräinen ryhmäkoko"
    selitteet['koulut_yk_lkm'] = "Yläkoulujen lukumäärä"
    selitteet['koulut_yk_oppilaat'] = "Yläkoulujen oppilasmäärä yhteensä"
    selitteet['koulut_yk_ryhmat'] = "Yläkoulujen opetusryhmien lukumäärä yhteensä"
    selitteet['koulut_yk_ryhmakoko'] = "Yläkoulujen keskimääräinen ryhmäkoko"
    selitteet['yritykset_lkm'] = "Yritysten lukumäärä"
    return selitteet

def laske_prosentit(data):
    tarkkuus = 2
    for i in range(0, len(data)):
        # asukastieheys = asukasmäärä / pinta-ala km^2
        data[i]['He_as_tiheys'] = round(data[i]['He_vakiy'] / (data[i]['Pinta_ala'] / 1000000), tarkkuus)

        # He_naiset + He_miehet = He_vakiy
        data[i]['He_naiset_pros'] = round(data[i]['He_naiset'] / data[i]['He_vakiy'] * 100, tarkkuus)
        data[i]['He_miehet_pros'] = round(data[i]['He_miehet'] / data[i]['He_vakiy'] * 100, tarkkuus)

        # Hr_pi_tul + Hr_ke_tul + Hr_hy_tul = Hr_tuy
        data[i]['Hr_pi_tul_pros'] = round(data[i]['Hr_pi_tul'] / data[i]['Hr_tuy'] * 100, tarkkuus)
        data[i]['Hr_ke_tul_pros'] = round(data[i]['Hr_ke_tul'] / data[i]['Hr_tuy'] * 100, tarkkuus)
        data[i]['Hr_hy_tul_pros'] = round(data[i]['Hr_hy_tul'] / data[i]['Hr_tuy'] * 100, tarkkuus)

        # Ko_perus + Ko_yliop + Ko_ammat + Ko_al_kork + Ko_yl_kork = Ko_ika18y
        # Ko_yliop + Ko_ammat + Ko_al_kork + Ko_yl_kork = Ko_koul
        # Ko_perus + Ko_koul = Ko_ika18y
        data[i]['Ko_perus_pros'] = round(data[i]['Ko_perus'] / data[i]['Ko_ika18y'] * 100, tarkkuus)
        data[i]['Ko_koul_pros'] = round(data[i]['Ko_koul'] / data[i]['Ko_ika18y'] * 100, tarkkuus)
        data[i]['Ko_yliop_pros'] = round(data[i]['Ko_yliop'] / data[i]['Ko_ika18y'] * 100, tarkkuus)
        data[i]['Ko_ammat_pros'] = round(data[i]['Ko_ammat'] / data[i]['Ko_ika18y'] * 100, tarkkuus)
        data[i]['Ko_al_kork_pros'] = round(data[i]['Ko_al_kork'] / data[i]['Ko_ika18y'] * 100, tarkkuus)
        data[i]['Ko_yl_kork_pros'] = round(data[i]['Ko_yl_kork'] / data[i]['Ko_ika18y'] * 100, tarkkuus)

        # Pt_tyoll + Pt_tyott + Pt_0_14 + Pt_opisk + Pt_elakel + Pt_muut = Pt_vakiy
        data[i]['Pt_tyoll_pros'] = round(data[i]['Pt_tyoll'] / data[i]['Pt_vakiy'] * 100, tarkkuus)
        data[i]['Pt_tyott_pros'] = round(data[i]['Pt_tyott'] / data[i]['Pt_vakiy'] * 100, tarkkuus)
        data[i]['Pt_0_14_pros'] = round(data[i]['Pt_0_14'] / data[i]['Pt_vakiy'] * 100, tarkkuus)
        data[i]['Pt_opisk_pros'] = round(data[i]['Pt_opisk'] / data[i]['Pt_vakiy'] * 100, tarkkuus)
        data[i]['Pt_elakel_pros'] = round(data[i]['Pt_elakel'] / data[i]['Pt_vakiy'] * 100, tarkkuus)
        data[i]['Pt_muut_pros'] = round(data[i]['Pt_muut'] / data[i]['Pt_vakiy'] * 100, tarkkuus)

        # Ra_pt_as + Ra_kt_as = Ra_asunn
        data[i]['Ra_pt_as_pros'] = round(data[i]['Ra_pt_as'] / data[i]['Ra_asunn'] * 100, tarkkuus)
        data[i]['Ra_kt_as_pros'] = round(data[i]['Ra_kt_as'] / data[i]['Ra_asunn'] * 100, tarkkuus)

        # Te_omis_as + Te_vuok_as + Te_muu_as = Te_taly
        data[i]['Te_omis_as_pros'] = round(data[i]['Te_omis_as'] / data[i]['Te_taly'] * 100, tarkkuus)
        data[i]['Te_vuok_as_pros'] = round(data[i]['Te_vuok_as'] / data[i]['Te_taly'] * 100, tarkkuus)
        data[i]['Te_muu_as_pros'] = round(data[i]['Te_muu_as'] / data[i]['Te_taly'] * 100, tarkkuus)

        # Tp_alku_a + Tp_jalo_bf + Tp_palv_gu + Tp_x_tunt = Tp_tyopy
        if data[i]['Tp_palv_gu'] is not None: # TODO: korjaa Moksi 41840
            data[i]['Tp_alku_a_pros'] = round(data[i]['Tp_alku_a'] / data[i]['Tp_tyopy'] * 100, tarkkuus)
            data[i]['Tp_jalo_bf_pros'] = round(data[i]['Tp_jalo_bf'] / data[i]['Tp_tyopy'] * 100, tarkkuus)
            data[i]['Tp_palv_gu_pros'] = round(data[i]['Tp_palv_gu'] / data[i]['Tp_tyopy'] * 100, tarkkuus)

    return data

def lisaa_koulut(data):
    with open('koulut.csv') as csv_file:
        csv_reader = csv.DictReader(csv_file, delimiter=',')
        koulut = []
        for row in csv_reader:
            koulu = {
                "nimi": row['nimi'],
                "oppilaat": int(row['oppilaat']),
                "opetusryhmat": int(row['opetusryhmat']),
                "postinumero": row['postinumero'],
                "tyyppi": row['tyyppi']
            }
            koulut.append(koulu)

    for i in range(0, len(data)):
        data[i]['koulut_ak_lkm'] = 0
        data[i]['koulut_ak_oppilaat'] = 0
        data[i]['koulut_ak_ryhmat'] = 0
        data[i]['koulut_ak_ryhmakoko'] = 0
        data[i]['koulut_yk_lkm'] = 0
        data[i]['koulut_yk_oppilaat'] = 0
        data[i]['koulut_yk_ryhmat'] = 0
        data[i]['koulut_yk_ryhmakoko'] = 0
        for j in range(0, len(koulut)):
            if data[i]['id'] == koulut[j]['postinumero']:
                if koulut[j]['tyyppi'] == 'alakoulu':
                    data[i]['koulut_ak_lkm'] += 1
                    data[i]['koulut_ak_oppilaat'] += koulut[j]['oppilaat']
                    data[i]['koulut_ak_ryhmat'] += koulut[j]['opetusryhmat']
                if koulut[j]['tyyppi'] == 'ylakoulu':
                    data[i]['koulut_yk_lkm'] += 1
                    data[i]['koulut_yk_oppilaat'] += koulut[j]['oppilaat']
                    data[i]['koulut_yk_ryhmat'] += koulut[j]['opetusryhmat']

        if data[i]['koulut_ak_ryhmat'] != 0:
            data[i]['koulut_ak_ryhmakoko'] = round(data[i]['koulut_ak_oppilaat'] / data[i]['koulut_ak_ryhmat'], 2)
        if data[i]['koulut_yk_ryhmat'] != 0:
            data[i]['koulut_yk_ryhmakoko'] = round(data[i]['koulut_yk_oppilaat'] / data[i]['koulut_yk_ryhmat'], 2)

    return data

def lisaa_yritykset(data):
    with open('fullprhdata.csv') as csv_file:
        csv_reader = csv.DictReader(csv_file, delimiter=';')
        yritykset = []
        for row in csv_reader:
            yritys = {
                "company_name": row['company_name'],
                "business_id": row['business_id'],
                "company_form": row['company_form'],
                "business_line_code": row['business_line_code'],
                "business_line_name": row['business_line_name'],
                "registration_date": row['registration_date'],
                "postal_address": row['postal_address'],
                "postal_post_code": row['postal_post_code'],
                "postal_city": row['postal_city'],
                "street_address": row['street_address'],
                "street_post_code": row['street_post_code'],
                "street_city": row['street_city'],
                "liquidation": row['liquidation'],
                "registered_office": row['registered office']
            }
            yritykset.append(yritys)

    for i in range(0, len(data)):
        data[i]['yritykset_lkm'] = 0
        for j in range(0, len(yritykset)):
            if (data[i]['id'] == yritykset[j]['postal_post_code'] or data[i]['id'] == yritykset[j]['street_post_code']) and not yritykset[j]['company_form'] == "AOY":
                data[i]['yritykset_lkm'] += 1

    return data
