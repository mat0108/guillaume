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
    expos: string[] ,
    imageBase64: imageTableau;
    date: string;
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
    return res;
}
export const getTableauByExpo = async (body:{expoId:string,page:number,limit:number}):Promise<tableauResponse>=>{
    const res = await axios.post<tableauResponse>(`${apiUrl}/tableau/getByExpo`,body);
    return res.data;
}
type TableauProps = {
    dim_oeuvre:string;
    dim_cadre:string;
    titre:string;
    technique:string;
    prix:string;
    expos:string[];
    date:string;
}
export const createTableau = async ({tableau,file}:{tableau:TableauProps,file:File}) => {
    const form = new FormData();
    form.append("file", file);
    form.append("tableau", JSON.stringify(tableau));
    const res = await axios.post(`${apiUrl}/tableau/create`,form,{headers: { "Content-Type": "multipart/form-data" }});
    return res;
}
export const addImages = async ({images}:{images: File[]})=>{
    const res = await axios.post(`${apiUrl}/tableau/addMultipleImage`,images);
    return res.data;
}
export const getImageById = async ({id}:{id:string}) => {
    const res = await axios.get(`${apiUrl}/tableau/getImage/${id}`);
    return res.data;
}

export const getExpoCount = async(expoId?:string) =>{
    const res = await axios.post(`${apiUrl}/tableau/counts`,{expoId:expoId})
    return res.data;
}
export const updateTableau = async({tableauId,body}:{tableauId?:string,body:any}) =>{
    const res = await axios.post(`${apiUrl}/tableau/${tableauId}/update`,body)
    return res;
}
export const rotateTableau = async({tableauId,angle}:{tableauId?:string,angle:number}) =>{
    const res = await axios.post(`${apiUrl}/tableau/${tableauId}/rotate`,{angle:angle})
    return res;
}
export const UpdateAfficheExpo = async ({tableauId,file}:{tableauId:string,file:File}) => {
    const form = new FormData();
    form.append("file", file);
    const res = await axios.post(`${apiUrl}/tableau/${tableauId}/updateTableau`,form,{headers: { "Content-Type": "multipart/form-data" }})
    return res;
}