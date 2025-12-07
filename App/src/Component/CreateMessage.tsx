import { Dispatch, SetStateAction, useState } from "react";
import InputString from "./Inputs/InputString";
import { createMessage } from "../services/mail";

import {toast} from 'react-toastify';
type CreateMessageProps = {
    setIsOpen:Dispatch<SetStateAction<any>>
}
const CreateMessage = ({setIsOpen}:CreateMessageProps)=>{
    const [message,setMessage] = useState({
        name:"",
        message:""
    })
    async function confirm(){
        console.log('message : ', message)
        if(message.name && message.message){
            const res = await createMessage(message)
            if(res.status === 200){
                toast.info("le message a bien été crée")
                setIsOpen(false)
            }
        }
    }
    return <div className="max-w-[600px] w-[80vw] lg:w-[60vw] min-h-[100px] h-full flex flex-col gap-4 bg-spaceBlue p-4 rounded-3xl text-2xs lg:text-base">
        {<InputString value={message.name} setValue={setMessage} field="name" placeholder="Votre nom et prénom" title="Votre nom et prénom" classField="font-mt-bold h-[20px]" isObject/>}
        <div className="w-full h-fit">
             {<InputString value={message.message} setValue={setMessage} field="message" placeholder="Votre message" title="Votre message" classField="font-mt-bold min-h-[120px]" isObject/>}
        </div>
        <div className="flex flex-row text-white font-mt-bold text-xs lg:text-lg">
            <div className="w-1/2 flex center"><p className="bg-red px-2 rounded-lg" onClick={()=>{setIsOpen(false)}}>Annuler</p></div>
            <div className="w-1/2 flex center"><p className="bg-green px-2 rounded-lg" onClick={()=>{confirm()}}>Créer un message</p></div>
        </div>
    </div>
}

export default CreateMessage;