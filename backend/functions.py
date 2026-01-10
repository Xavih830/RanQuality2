from datetime import datetime

dictMeses = {'01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'}
acumMeses = [ range(1, 32), range(32, 60), range(60, 91), range(91, 121), range(121, 152), range(152, 182), range(182, 213), range(213, 244), range(244,274), range(274, 305), range(305, 335), range(335, 366)]
fechasDic = {'Jan': 31, 'Feb': 28, 'Mar': 31, 'Apr': 30, 'May': 31, 'Jun': 30, 'Jul': 31, 'Aug': 31, 'Sep': 30, 'Oct': 31, 'Nov': 30, 'Dec': 31}
diasDic = {'1_semana': 7, '1_mes': 30, '6_meses': 180, '1_año': 365}

fechaActual = datetime.now()
fechaHoy = str(fechaActual).split(' ')
fechaHoy = fechaHoy[0].split('-')
mesHoy = fechaHoy[1]
diaHoy = fechaHoy[2]

def calcDias(dia, mes):
    
    i = int(mes)
    dias = 0
    while (i > 1):
        if (i >= 10):
            mesCadena = str(i)
            dias += fechasDic[dictMeses[mesCadena]]
        else:
            mesCadena = '0' + str(i)
            dias += fechasDic[dictMeses[mesCadena]]

        i = i - 1

    dias = dias + int(dia)
    return dias

def calcOperDias(cantidadDias):
    fechaActual = datetime.now()
    valFecha = str(fechaActual).split(' ')
    valFecha = valFecha[0].split('-')
    dia = valFecha[2]
    mes = valFecha[1]
    year = valFecha[0]

    diasActuales = calcDias(dia, mes)
    diasNum = diasActuales - cantidadDias

    return diasNum, year, dia, mes

def tradDiasFecha(dias, fecha):
    days, year, day, month = dias

    if (days < 0):
        oper = 366 + days
        acumValor = 0
        for acum in acumMeses:
            if oper in acum:
                acumValor = acum

        indiceAcum = acumMeses.index(acumValor) + 1
        mes = ''

        if ((indiceAcum) >= 10):
            mes = dictMeses[str(indiceAcum)]
        else: 
            mes = dictMeses['0' + str(indiceAcum)]

        dia = oper - (list(acumValor)[0] - 1)

        return f'{mes} {dia}, {int(year) - 1}'
    elif (days == 0 and fecha == '1_año'):
        return f'{month} {day}, {int(year) - 1}'
    else:
        acumValor = 0

        for acum in acumMeses:
            if days in acum:
                acumValor = acum
        
        indiceAcum = acumMeses.index(acumValor) + 1
        mes = ''

        if ((indiceAcum) >= 10):
            mes = dictMeses[str(indiceAcum)]
        else: 
            mes = dictMeses['0' + str(indiceAcum)]

        dia = days - (list(acumValor)[0] - 1)
        
        return f'{mes} {dia}, {int(year)}'

def duracionSegundos(dur):
    listaDur = dur.split(':')

    if len(listaDur) != 2:
        return 0

    minutosSec = int(listaDur[0])*60
    segundos = int(listaDur[1])
    duracion = minutosSec + segundos

    return duracion

def listaVideos(diasCant, fecha):

    fechasValidas = list()
    diasActuales = calcDias(diaHoy, mesHoy) + 1
    dias = calcOperDias(diasCant)
    days, year, day, month = dias

    while (days != diasActuales):
        if days == 0:
            days = days + 1
            dias = (days, year, day, month)
        
        a = tradDiasFecha(dias, fecha)
        fechasValidas.append(a)
        
        days = days + 1
        dias = (days, year, day, month)

    return fechasValidas

        

    


#def theBestVideos(vistas, likes):

