import React, { useState } from 'react';
import { IonItem, IonList, IonSelect, IonSelectOption, SelectCustomEvent } from '@ionic/react';
import { useCategory } from './MemoryContext';

// cadena de funciones recorriendo desde aqui hasta app.

export default function SingleSelection() {

    const { setCategory } = useCategory();

    const handleChange = (e : SelectCustomEvent) => {
        setCategory(e.detail.value);
        
    }

    return (
        <IonList>
            <IonItem>
                <IonSelect aria-label="Categoría" placeholder="Selecciona una Cetegoría musical"
                    onIonChange={handleChange}
                    >
                    <IonSelectOption value="phonk">Phonk</IonSelectOption>
                    <IonSelectOption value="Musica EDM | electronica">Electrónica</IonSelectOption>
                    <IonSelectOption value="Música techno">Techno</IonSelectOption>
                    <IonSelectOption value="Regueton | Música latina">Reguetón</IonSelectOption>
                    <IonSelectOption value="Música Pop">Pop</IonSelectOption>
                    <IonSelectOption value="Hip Hop | Rap">Hip Hop/ Rap</IonSelectOption>
                    <IonSelectOption value="K-pop">K-pop</IonSelectOption>
                    <IonSelectOption value="Rock">Rock</IonSelectOption>
                    <IonSelectOption value="Rock latino">Rock latino</IonSelectOption>
                </IonSelect>
            </IonItem>
        </IonList>
    );
}