import { useEffect, useState } from "react";

export interface DataFetchOutput {
    data: Object | null,
    loading:boolean,
    error:string | null
}

export interface Data {
    busqueda : string,
    limite : number,
    fecha: string
}

export default function dataFetch( datos : Data) : DataFetchOutput{

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect (() => {

        const obtenerDatos = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/search?query=${datos.busqueda}&limit=${datos.limite}&date=${datos.fecha}`);

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
                }

                const result = await response.json();
                setData(result);
                
            } catch(err : any) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ocurrió un error desconocido al obtener los datos.");
                }
            } finally {
                setLoading(false);
            }
        };

        obtenerDatos();

    }, [datos])

    return {data, loading, error};

}