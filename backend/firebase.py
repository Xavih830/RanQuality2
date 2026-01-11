import os
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import json
import requests

firebase_key = os.environ.get('FIREBASE_CONFIG')
json_load = json.loads(firebase_key)
cred = credentials.Certificate(json_load)

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
    
