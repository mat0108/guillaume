import axios from "axios";
import { tableau } from "./tableau";
const apiUrl = import.meta.env.VITE_API_URL;
export type Expo = {
    _id: string,
    title: string,
    paragraphes: string[],
    tableauAffiche: tableau
}
export const getExpo = async ({expo}:{expo:string})=>{
    const res = await axios.post(`${apiUrl}/expo/getByTitle`,{expotitle:expo});
    return res.data;
}

export const getAllExpo = async ()=>{
    const res = await axios.get(`${apiUrl}/expo/getAll`);
    return res.data;
}