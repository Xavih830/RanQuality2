import React, { useState } from 'react';
import { IonItem, IonList, IonSelect, IonSelectOption, SelectCustomEvent } from '@ionic/react';
import { useCategory } from './MemoryContext';

interface DataOutput {
    handleDataChange : (category : string, limit: string | undefined, date: string | undefined) => void
}

export default function DoubleSelection(props : DataOutput) {

    const { category, setCategory } = useCategory();
    const [limit, setLimit] = useState<string | undefined>(undefined);
    const [date, setDate] = useState<string | undefined>(undefined);

    const handleChange = (e : SelectCustomEvent) => {
        const val = e.detail.value;
        const esNumero = !isNaN(Number(val));

        let currentLimit = limit;
        let currentDate = date;

        if (esNumero) {
            setLimit(val);
            currentLimit = val; 
        } else {
            setDate(val);
            currentDate = val; 
        }

        if (category !== undefined && currentLimit !== undefined && currentDate !== undefined) {
            props.handleDataChange(category, currentLimit, currentDate);
            
            setLimit(undefined);
            setDate(undefined);
            setCategory(undefined);
        }
    };

    const customDate = {
        header: 'Fecha de subida',
        subHeader: 'Selecciona la fecha desde la que quieres un top'
    };

    const customLimit = {
        header: 'Limite',
        subHeader: 'Selecciona el limite de datos que quieres que tenga tu top'
    };
    
    return (
        <IonList>

            <IonItem>
                <IonSelect label="Límite" interfaceOptions={customLimit} interface="popover" placeholder="Selecciona uno"
                    onIonChange={handleChange}
                >
                    <IonSelectOption value="10">10</IonSelectOption>
                    <IonSelectOption value="25">25</IonSelectOption>
                    <IonSelectOption value="50">50</IonSelectOption>
                    <IonSelectOption value="75">75</IonSelectOption>
                    <IonSelectOption value="100">100</IonSelectOption>
                </IonSelect>
            </IonItem>

            <IonItem>
                <IonSelect label="Fecha" interfaceOptions={customDate} interface="popover" placeholder="Selecciona uno"
                    onIonChange={handleChange}
                >
                    <IonSelectOption value="1_semana">1 semana</IonSelectOption>
                    <IonSelectOption value="1_mes">1 mes</IonSelectOption>
                    <IonSelectOption value="6_meses">6 meses</IonSelectOption>
                    <IonSelectOption value="1_año">1 año</IonSelectOption>
                </IonSelect>
            </IonItem>

        </IonList>
    );
}