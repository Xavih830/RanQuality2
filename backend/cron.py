import time
from firebase import setData

categorias = ["phonk", "Música EDM | electronica", "Música techno", "Regueton | Música latina", "Música Pop", "Hip Hop | Rap", "K-pop", "Rock", "Rock latino"]
limites = ["10", "25", "50", "75", "100"]
fechas = ["1_semana", "1_mes", "6_meses", "1_año"]

for categoria in categorias:
    for limite in limites:
        for fecha in fechas:
            setData(categoria, limite, fecha)
            time.sleep( )