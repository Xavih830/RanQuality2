import { useIonRouter, UseIonRouterResult } from '@ionic/react';
import React, { createContext, useState, useContext, use } from 'react';

interface CategoryInput {
    redirect : boolean,
    setRedirect : (redirect : boolean) => void,
    dataLoaded : boolean,
    setDataLoaded : (dataLoaded: boolean) => void,
    category : string | undefined,
    setCategory : (categoria : string | undefined) => void
}

const CategoryContext = createContext<CategoryInput | undefined>(undefined);

export const CategoryProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [category, setCategory] = useState<string | undefined>(undefined);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [redirect, setRedirect] = useState(false);

    return (
        <CategoryContext.Provider value={{category, setCategory, dataLoaded, setDataLoaded, redirect, setRedirect}}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = () => {
    const context = useContext(CategoryContext);

    if (!context){
        throw new Error("Hubo un error en la seleccion de categoria...");
    }

    return context;
}