import os
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import requests

ruta_main = os.path.dirname(os.path.abspath(__file__))
ruta_json = os.path.join(ruta_main, 'secrets', 'ranquality.json')

cred = credentials.Certificate(ruta_json)

firebase_admin.initialize_app(cred)

def setData(categoria, limite, fecha):
    ref = db.reference(f'{categoria}/{limite}/{fecha}')
    
    url = f'https://Xavih830.pythonanywhere.com/api/search?query=${categoria}&limit=${limite}&date=${fecha}'
    response = []
    status = 404

    while (len(response) == 0 or status != 200):
        response = requests.get(url, timeout=300) 
        status = response.status_code

    ref.set(response)

def readData(categoria, limite, fecha):
    ref = db.reference(f'{categoria}/{limite}/{fecha}')

    data = ref.get()

    if (data):
        data = "La lista está vacía."
    
    return data
    
