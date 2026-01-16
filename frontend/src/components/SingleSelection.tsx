import { useEffect } from 'react';
import { IonItem, IonList, IonSelect, IonSelectOption, SelectCustomEvent, useIonRouter } from '@ionic/react';
import { useCategory } from './MemoryContext';

// cadena de funciones recorriendo desde aqui hasta app.

export default function SingleSelection() {

    const { setCategory } = useCategory();
    const { dataLoaded, setDataLoaded } = useCategory();
    const { redirect, setRedirect } = useCategory();
    const ruta = useIonRouter();

    const handleChange = (e : SelectCustomEvent) => {
        if (dataLoaded){
            setDataLoaded(false);
        }
        setCategory(e.detail.value);
        setRedirect(true);
    }

    useEffect(() => {
        if (redirect){
            ruta.push('/tab1', 'forward', 'replace');
        } else {
            ruta.push('/tab2', 'root', 'replace');
        }
    }, [redirect]);

    return (
        <IonList>
            <IonItem>
                <IonSelect aria-label="Categoría" placeholder="Selecciona una Categoría musical"
                    onIonChange={handleChange}
                    >
                    <IonSelectOption value="phonk">Phonk</IonSelectOption>
                    <IonSelectOption value="Musica_EDM_electronica">Electrónica</IonSelectOption>
                    <IonSelectOption value="Musica_techno">Techno</IonSelectOption>
                    <IonSelectOption value="Regueton_Musica_latina">Reguetón</IonSelectOption>
                    <IonSelectOption value="Musica_Pop">Pop</IonSelectOption>
                    <IonSelectOption value="Hip_Hop_Rap">Hip Hop/ Rap</IonSelectOption>
                    <IonSelectOption value="K_pop">K-pop</IonSelectOption>
                    <IonSelectOption value="Rock">Rock</IonSelectOption>
                    <IonSelectOption value="Rock_latino">Rock latino</IonSelectOption>
                </IonSelect>
            </IonItem>
        </IonList>
    );
}