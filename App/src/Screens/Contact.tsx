import { Dispatch, SetStateAction, useMemo, useState } from "react";
import InputString from "../Component/Inputs/InputString";
import { sendMail } from "../services/mail";
import { toast } from "react-toastify";

const Contact = ({onClose}:{onClose: Dispatch<SetStateAction<any>>})=>{
    const isMobile = window.screen.width < 600;
    const [message,setMessage] = useState("");
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    async function onCLick(){
        const res = await sendMail({name,email,message})
        if(res.status === 200){
            toast.info("Votre mail a bien été envoyé")
        }
        
    }
    const element = useMemo(()=>{
            return <div className="w-[80vw] lg:w-[500px] h-full relative flex flex-col bg-mainColor p-10 gap-4 rounded-4xl">
            
            {!isMobile && <div className="absolute top-4 right-4 hover:cursor-pointer" onClick={onClose}><img src={"/images/close2-white.webp"} alt='close' className="w-6"/></div>}
            {<InputString value={name} setValue={setName} placeholder="Votre nom et prénom" title="Votre nom et prénom" />}
            {<InputString value={email} setValue={setEmail} placeholder="Votre email" title="Votre email"/>}
            <div className="w-full h-[200px]"> 

             {<InputString value={message} setValue={setMessage} placeholder="Votre message" title="Votre message" classField="font-mt-bold min-h-[180px]" />}
            </div>

         <button className="bg-green p-2 text-white font-mt-bold rounded-lg mt-2" onClick={()=>onCLick()} >Envoyer le mail</button>
            
        </div>
    },[name,email,message])
    return element   
}

export default Contact;