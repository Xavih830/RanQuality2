import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import DoubleSelection from '../components/DoubleSelection';
import { useState } from 'react';
import './Tab1.css';

const Tab1 = () => {

  const [dataLoaded, setDataLoaded] = useState(false);

  const handleDataChange = (category: string, limit: string, date: string) => {
    
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
        {/* <DoubleSelection></DoubleSelection> */}
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
