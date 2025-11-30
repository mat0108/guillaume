import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export type Expo = {
    _id: string,
    title: string,
    paragraphes: string[],
    tableauAffiche: string,
    tableauAfficheRatio: string;
    paragrapheIndex: number
    tableauxOrder: string[]
    
}
export const getExpo = async ({expoId}:{expoId:string})=>{
    const res = await axios.get(`${apiUrl}/expo/${expoId}`,);
    return res.data;
}

export const getAllExpo = async ()=>{
    const res = await axios.get(`${apiUrl}/expo/getAll`);
    return res.data;
}
export const setOrderExpo = async (expoId:string,tableauxOrder:string[]) => {
    const res = await axios.post(`${apiUrl}/expo/${expoId}/addOrder`,{tableauxOrder:tableauxOrder});
    return res;
}
export const UpdateExpo = async (expoId:string,body:any) => {
    const res = await axios.post(`${apiUrl}/expo/${expoId}/update`,body)
    return res;
}
export const UpdateAfficheExpo = async (expoId:string,tableauAffiche:File,tableauAfficheRatio:string) => {
    const form = new FormData();
    form.append("file", tableauAffiche);
    form.append("tableauAfficheRatio", tableauAfficheRatio);
    const res = await axios.post(`${apiUrl}/expo/${expoId}/updateAffiche`,form,{headers: { "Content-Type": "multipart/form-data" }})
    return res;
}