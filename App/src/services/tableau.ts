import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export type imageTableau = {
    _id:string;
    imageBase64: string;
}

export type tableau = {
    _id: string;
    dim_oeuvre: string;
    dim_cadre: string;
    titre: string;
    technique:   string;
    prix:  string;
    expos: string[],
    imageBase64: imageTableau;
}

export type tableauResponse = {
    total: number;
    page: string;
    limit: number;
    tableaux : tableau[];
}
export const getTableaux = async (body:{page:number,limit:number}): Promise<tableauResponse>=> {
    const res = await axios.post<tableauResponse>(`${apiUrl}/tableau/getAll`,body);
    return res.data;
}

export const getTableauById = async ({id}:{id:string}) => {
    const res = await axios.get(`${apiUrl}/tableau/getById/${id}`);
    return res.data;
}
export const getTableauByExpo = async (body:{expo:string,page:number,limit:number}):Promise<tableauResponse>=>{
    const res = await axios.post<tableauResponse>(`${apiUrl}/tableau/getByExpo`,body);
    return res.data;
}
type TableauProps = {
    _id:string;
    dim_oeuvre:string;
    dim_cadre:string;
    titre:string;
    technique:string;
    prix:string;
}
export const createTableau = async (tableau:TableauProps) => {
    const res = await axios.post(`${apiUrl}/tableau/create`,tableau);
    return res.data;
}
export const addImages = async ({images}:{images: File[]})=>{
    const res = await axios.post(`${apiUrl}/tableau/addMultipleImage`,images);
    return res.data;
}
export const getImageById = async ({id}:{id:string}) => {
    const res = await axios.get(`${apiUrl}/tableau/getImage/${id}`);
    return res.data;
}

export const getExpoCount = async(exponame?:string) =>{
    const res = await axios.post(`${apiUrl}/tableau/counts`,{expo:exponame})
    return res.data;
}