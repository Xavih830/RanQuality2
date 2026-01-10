import React, { createContext, useState, useContext, use } from 'react';

interface CategoryInput {
    category : string | undefined,
    setCategory : (categoria : string | undefined) => void
}

const CategoryContext = createContext<CategoryInput | undefined>(undefined);

export const CategoryProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [category, setCategory] = useState<string | undefined>(undefined);

    return (
        <CategoryContext.Provider value={{category, setCategory}}>
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