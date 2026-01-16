import time
from firebase import setData

categorias = ["phonk","Musica_EDM_electronica", "Musica_techno", "Regueton_Musica_latina", "Musica_Pop", "Hip_Hop_Rap", "K_pop", "Rock", "Rock_latino"]
limites = ["10", "25", "50", "75", "100"]
fechas = ["1_semana", "1_mes", "6_meses", "1_año"]

for categoria in categorias:
    for limite in limites:
        for fecha in fechas:
            setData(categoria, limite, fecha)
            time.sleep(100)
            print("Listo")