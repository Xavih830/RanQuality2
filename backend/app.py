from flask import Flask, jsonify, request
from flask_cors import CORS
import scrapetube
from datetime import datetime
from functions import listaVideos, calcOperDias, tradDiasFecha, duracionSegundos
from firebase import readData, setData

dictMeses = {'01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'}
acumMeses = [ range(1, 31), range(32, 59), range(60, 90), range(91, 120), range(121, 151), range(152, 181), range(182, 212), range(213, 243), range(244,273), range(274, 304), range(305, 334), range(335, 365)]
fechasDic = {'Jan': 31, 'Feb': 28, 'Mar': 31, 'Apr': 30, 'May': 31, 'Jun': 30, 'Jul': 31, 'Aug': 31, 'Sep': 30, 'Oct': 31, 'Nov': 30, 'Dec': 31}
diasDic = {'1_semana': 7, '1_mes': 30, '6_meses': 180, '1_año': 365}

fechaActual = datetime.now()
fechaHoy = str(fechaActual).split(' ')
fechaHoy = fechaHoy[0].split('-')
mesHoy = dictMeses[fechaHoy[1]]
diaHoy = int(fechaHoy[2])
yearHoy = fechaHoy[0]

app = Flask(__name__)
CORS(app)

@app.route('/api/search')
def search():

    query = request.args.get('query')
    num = int(request.args.get('limit'))
    fecha = request.args.get('date')
    searchWay = 'upload_date'
    searches = 100

    query = query.replace('_', " ")

    if (fecha == '6_meses' or fecha == '1_año'):
        searchWay = 'relevance'
    
    if (num == 25):
        searches = 150
    elif (num == 50):
        searches = 200
    elif (num == 75):
        searches = 250
    elif (num == 100):
        searches = 300

    searching = scrapetube.get_search(query, searches, sort_by = searchWay)

    videosTop = []

    dateSince = calcOperDias(diasDic[fecha])
    dateSince = tradDiasFecha(dateSince, fecha)

    fechasValidas = listaVideos(diasDic[fecha], fecha)
    videosValidos = []

    for srch in searching:
        #videosTop.append(scrapetube.get_video(srch['videoId']))
        videoId = srch['videoId']
        video = scrapetube.get_video(videoId)
        titulo = video['title']['runs'][0]['text']
        fechaEval = video['dateText']['simpleText']
        
        try:
            duracionVideo = srch['lengthText']['simpleText']
            vistas = srch['viewCountText']['simpleText']
        except:
            duracionVideo = '0:00'
            vistas = '0 views'
        
        duracion = duracionSegundos(duracionVideo)
        url = f'https://www.youtube.com/watch?v={videoId}'
        miniatura = f'https://i.ytimg.com/vi/{videoId}/maxresdefault.jpg'

        #Filtro de busqueda para videos mayores a 1 minuto (evitando Shorts)
        # y para videos menores a 8 minutos, para evitar videos de mayor duracion (recopliaciones de canciones)
        if (duracion > 61 and duracion < 480) and (fechaEval in fechasValidas) and (titulo not in videosValidos):
            videosValidos.append(titulo) 
            videosTop.append({
                "duration": duracionVideo, 
                "date": fechaEval, 
                "title": titulo, 
                "url": url, 
                "image": miniatura,
            })

    return jsonify(videosTop)

@app.route('/api/read')
def read():
    categoria = request.args.get('category')
    limite = request.args.get('limit')
    fecha = request.args.get('date')

    categoria = categoria.replace('_', ' ')

    lista = readData(categoria, limite, fecha)

    return jsonify(lista)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000, threaded=True)

