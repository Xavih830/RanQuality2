import os
import json
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import requests

load_dotenv()
llave_json = os.getenv('FIREBASE_KEY')
dict_json = json.loads(llave_json)
cred = credentials.Certificate(dict_json)

firebase_admin.initialize_app(cred)

def setData(categoria, limite, fecha):
    ref = db.reference(f'{categoria}/{limite}/{fecha}')
    
    url = f'http://localhost:5000/api/search?query=${categoria}&limit=${limite}&date=${fecha}'
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
    
