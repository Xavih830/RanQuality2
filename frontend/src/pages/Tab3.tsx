import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/react';
import { getSongsByCat } from '../services/firebase';
import './Tab3.css';
import { useState } from 'react';

interface DataPlaylist {
  title:string,
  link: string
}

const Tab3: React.FC = () => {

  const categorias = ['phonk', 'Musica EDM electronica', 'Musica techno', 'Regueton Musica latina', 'Musica pop', 'Hip Hop Rap', 'K pop', 'Rock', 'Rock latino'];
  const [canciones, setCanciones] = useState<Array<DataPlaylist>>([]);

  const handleContent = async (e : CustomEvent) => {
    const categoriaSeleccionada = e.detail.value;
    
    const res = await getSongsByCat(categoriaSeleccionada);

  if (res.success && res.data) {
    const listaFormateada = Object.keys(res.data).map(id => ({
      id: id,           
      title: res.data[id].title,
      link: res.data[id].link
    }));

    setCanciones(listaFormateada);
  } else {
    setCanciones([]);
  }
  }

  return (
    <>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Playlists</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Playlists</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonAccordionGroup onIonChange={handleContent}>
          {categorias.map((e, i) => (
            <IonAccordion key={i} value={e}>
              <IonItem slot="header" color="light">
                <IonLabel className="ion-text-capitalize">Mi playlist de {e}</IonLabel>
              </IonItem>
              <div className='ion-padding' slot='content'>
                {canciones.length > 0 ? (
                  canciones.map((e, i) => (
                    <IonItem key={i}>
                       <IonLabel>
                        <a href={e.link} style={{textDecoration:'none'}}>
                          <h2>{e.title}</h2>
                        </a>
                       </IonLabel>
                    </IonItem>
                  ))
                ) : (
                  <p>No hay canciones en esta categoría.</p>
                )}
              </div>
            </IonAccordion>
          ))}
        </IonAccordionGroup>
      </IonContent>
    </IonPage>
    </>
  );
};

export default Tab3;
