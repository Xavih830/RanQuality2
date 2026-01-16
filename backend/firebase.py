import os
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import json
import requests

ruta_inicial = os.path.dirname(os.path.abspath(__file__))
#no subo datos sensibles por razones de seguridad, pero esa seria la base para poder
#desarrollar el servidor
ruta_clave = os.path.join(ruta_inicial, "secrets", "ranquality.json")
cred = credentials.Certificate(ruta_clave)

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://ranquality-284f6-default-rtdb.firebaseio.com'
})

def setData(categoria, limite, fecha):
    categoria = categoria.replace("_", " ")

    ref = db.reference(f'{categoria}/{limite}/{fecha}')
    
    url = f'http://192.168.100.76:5000/api/search?query={categoria}&limit={limite}&date={fecha}'
    response = []
    status = 404

    if (len(response) == 0):
        response = requests.get(url, timeout=600)
        response = response.json()

    ref.set(response)

def readData(categoria, limite, fecha):
    categoria = categoria.replace("_", " ")

    ref = db.reference(f'{categoria}/{limite}/{fecha}')

    data = ref.get()

    if (len(data) == 0):
        data = "La lista está vacía."
    
    return data
    
