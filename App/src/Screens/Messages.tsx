import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getMessages, message } from "../services/mail";
import CreateMessage from "../Component/CreateMessage";
import moment from "moment"
type MessageProps = {
    setPopup:Dispatch<SetStateAction<any>>,
    setIsOpen:Dispatch<SetStateAction<any>>

}
const Messages = ({setPopup,setIsOpen}:MessageProps)=>{
    const [messages,setMessages] = useState<message[]>()
    useEffect(()=>{
        async function fetchData() {
            const res = await getMessages();
            setMessages(res.data.sort((a:message, b:message) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        }
        fetchData()
    },[])

    return <div className="relative w-full h-screen bg-mainColor flex flex-col aligned overflow-auto .custom-scrollbar p-4 gap-4 relative">
        <p className="w-full text-center text-white font-mt-bold text-xs lg:text-lg mb-4">Les derniers commentaires</p>
        {messages?.length && messages?.map((message,pos)=><div className={`w-[95%] lg:w-[80%] h-fit flex flex-col gap-2 p-4 ${pos % 2 ? "bg-white" : "bg-snow"}`}>
            <div className="w-full flex justify-between font-mt-bold text-2xs lg:text-lg">
                <p >{message.name}</p>
                <p >{moment(message.date).format("DD/MM/YYYY HH:mm")}</p>
                
            </div>
            <p className="text-justify text-3xs lg:text-base">{message.message}</p>
        </div>)}
        <div className="absolute top-2 right-2 lg:right-20">
            <button className="w-fit bg-green p-1 lg:p-2 text-white font-mt-bold rounded-lg mt-2 text-3xs lg:text-base" onClick={()=>{setPopup(<CreateMessage setIsOpen={setIsOpen}/>);setIsOpen(true)}}>Créer un commentaire</button>
        </div>
                    
    </div>
}
export default Messages;