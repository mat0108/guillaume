import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const sendMail = async ({name,email,message}:{name:string,email:string,message:string})=>{
    const res = await axios.post(`${apiUrl}/contact/send`,{name,email,message});
    return res.data;
}
export type message = {
    name:string,
    message:string,
    date:Date
}

export const getMessages = async ()=>{
    const res = await axios.get(`${apiUrl}/messages/`)
    return res;
}
export const createMessage = async({name,message}:{name:string,message:string})=>{
    const res = await axios.post(`${apiUrl}/messages/create`,{name,message})
    return res;
}