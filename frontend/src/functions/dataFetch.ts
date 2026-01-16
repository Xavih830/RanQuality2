import { useEffect, useState } from "react";
import type { ApiOutput } from "../interfaces/ApiOutput";

export interface Data {
    busqueda: string | undefined,
    limite: string | undefined,
    fecha: string | undefined
}

export const dataFetch = async (datos: Data) => {
    const url = `https://sustainable-plated-tran.ngrok-free.dev/api/read?category=${datos.busqueda}&limit=${datos.limite}&date=${datos.fecha}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        console.error("Error en fetchData:", err);
        throw err;
    }
};