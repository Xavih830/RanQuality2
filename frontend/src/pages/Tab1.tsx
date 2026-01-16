import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import DoubleSelection from '../components/DoubleSelection';
import { useEffect, useState } from 'react';
import './Tab1.css';
import type { ApiOutput } from '../interfaces/ApiOutput';
import { dataFetch } from '../functions/dataFetch';
import { useCategory } from '../components/MemoryContext';
import { Typography } from "@mui/material";
import { saveSongbyCat } from '../services/firebase';

const Tab1 = () => {

  const { dataLoaded, setDataLoaded } = useCategory();
  const [datos, setDatos] = useState<Array<ApiOutput>>([]);
  const [categoria, setCategoria] = useState<string>('');
  const [limite, setLimite] = useState<string>();
  const [fecha, setFecha] = useState<string>();
  const { setRedirect } = useCategory();

  const handleDataChange = async (category: string, limit: string | undefined, date: string | undefined) => {
    setCategoria(category.replaceAll('_', ' '));
    setLimite(limit);
    setFecha(date);
    setRedirect(false);
    try {
      const resultado = await dataFetch({
        busqueda: category,
        limite: limit,
        fecha: date
      });

      setDatos(resultado);
      setDataLoaded(true);
    } catch (error) {
      console.error("No se pudo cargar la data", error);
    };

  };

  let contenidoFecha = '';
  if (fecha == '1_semana'){
    contenidoFecha = 'desde hace 1 semana';
  } else if (fecha == '1_mes'){
    contenidoFecha = 'desde hace 1 mes';
  } else if (fecha == '6_meses'){
    contenidoFecha = 'desde hace 6 meses';
  } else {
    contenidoFecha = 'desde hace 1 año';
  }

  const handleClick = (categoria: string, title: string, url: string) => {
    saveSongbyCat(categoria, title, url).then(succ => {
      console.log(succ.message);
    }).catch(fail => console.log(fail.message));
  };

  const musicaTops = (musica: Array<ApiOutput>) => {
    if (!musica) return null;

    console.log("Datos recibidos en musicaTops:", musica);

    const a = limite ? Number(limite) : musica.length;
    const musicaParaMostrar = musica.slice(0, a);

    return (
      <>
        <Typography variant='h4' style={{textAlign:'center', marginTop:'4vw'}} sx={{fontWeight:'bold'}}>Top {limite} {categoria} {contenidoFecha}</Typography>
        {musicaParaMostrar.map((e, index) => (
          <IonCard key={index}>
            <img src={e.image} alt={e.title} />
            <a style={{textDecoration:'none'}} href={e.url} target="_blank" rel="noopener noreferrer">
              <IonCardHeader>
                <IonCardTitle>{e.title}</IonCardTitle>
                <IonCardSubtitle style={{marginBottom:'4vw'}}>{e.date}</IonCardSubtitle>
              </IonCardHeader>
             </a>
             <IonCardContent style={{backgroundColor: '#ffffff', textAlign: 'center', color: '#000000', fontWeight: 'bold'}} onClick={ () => handleClick(categoria, e.title, e.url)}>Añadir a mi playlist <span style={{fontSize: '1.2rem'}}> +</span></IonCardContent>
          </IonCard>
        ))}
      </>
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Búsqueda</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Búsqueda</IonTitle>
          </IonToolbar>
        </IonHeader>
        {dataLoaded ? (
          musicaTops(datos)
        ) : (
          <DoubleSelection handleDataChange={handleDataChange}></DoubleSelection>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
