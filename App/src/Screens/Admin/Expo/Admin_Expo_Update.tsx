import { useParams } from "react-router";
import Check_Connect from "../Check_Connect";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { Expo, getExpo, UpdateAfficheExpo, UpdateExpo } from "../../../services/expo";
import { Dialog, DialogPanel } from "@headlessui/react";
import {toast} from 'react-toastify';
import { ConfirmPopup } from "../../../Component/Popup/Popup";

import InputString from "../../../Component/Inputs/InputString";
import InputStringArray from "../../../Component/Inputs/InputStringArray";
import InputImage from "../../../Component/Inputs/InputFile";


const AdminExpoUpdate = () => {
    
    Check_Connect();
    const [expo,setExpo] = useState<Expo>()
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const [popup,setPopup] = useState<any>()
    const [image,setImage] = useState<File>()

    const params = useParams();
    
    async function fetchData(){
        if(params.expoId){
            const data = await getExpo({expoId: params.expoId })

            setExpo(data)}
    }
    async function UpdateInfo() {
        if(expo){

            const res = await UpdateExpo(expo?._id,{title:expo?.title, paragraphes: expo?.paragraphes,lieu:expo?.lieu,date:expo?.date})
            if(res.status === 200){
                toast.info(res.data.message)
            }
        }
    }
    async function UpdateImage() {
        if(expo && image){
            const res = await UpdateAfficheExpo(expo?._id,image,expo?.tableauAfficheRatio)
            console.log('res : ', res)
            if(res.status === 200){
                toast.info(res.data.message)
                fetchData()
            }
        }
    }
    
    useEffect(()=>{
        fetchData()
    },[params])
    
    const imageElement = useMemo(()=>{
        return <div className="w-full flex center">
            <img src={expo?.tableauAffiche} alt={expo?.title} className={`h-[50vh] w-fit ${expo?.tableauAfficheRatio}`}/>
        </div>
    },[expo,expo?.tableauAffiche])
    useEffect(()=>{
        if(popup){
            setIsOpen(true)
        }
    },[popup])
    return <div className="w-full h-screen flex flex-col bg-mainColor flex p-2 gap-4 ">
        {expo && <>
            <div className="w-full h-full flex gap-4">
                <div className="w-1/2 h-full relative flex flex-col bg-grayBlack rounded-lg p-4 gap-8">
                    {<InputString value={expo.title} field="title" setValue={setExpo} placeholder="Nom de l’exposition" title="Nom de l’exposition " isObject />}
                    <div className="w-full flex flex-row gap-4 ">
                        <div className="w-1/2">
                            {<InputString value={expo.lieu} field="lieu" setValue={setExpo} placeholder="Lieu de l’exposition" title="Lieu de l’exposition " isObject />}
                        </div>
                        <div className="w-1/2">
                            {<InputString value={expo.date} field="date" setValue={setExpo} placeholder="Date de l’exposition" title="Date de l’exposition " isObject />}
                        </div>
                    </div>
                    {<InputStringArray value={expo.paragraphes} field="paragraphes" setValue={setExpo} placeholder="Paragraphe n° " title="Description de l’exposition" pos={0} setIsOpen={setIsOpen} setPopup={setPopup}/>}
                    <div className="absolute bottom-2 left-0 w-full flex center">
                        <div className="flex gap-4">
                            <button className="bg-green p-2 text-white font-mt-bold rounded-lg mt-2" onClick={()=>setPopup(<ConfirmPopup text="Confirmez vous la mise à jour des ses informations ?" actionYes={()=>UpdateInfo()} setIsOpen={setIsOpen}/>)}>Update les informations</button>
                            <button className="bg-red p-2 text-white font-mt-bold rounded-lg mt-2 " onClick={()=>fetchData()}>Reset les informations</button>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 h-full relative flex flex-col bg-grayBlack rounded-lg p-4 gap-8"> 
                    {imageElement}
                    <div>
                        {<InputString value={expo.tableauAfficheRatio} field="tableauAfficheRatio" setValue={setExpo} placeholder="le ratio d'affichage de l'image" title="Ratio d'affichage de l'image : 21/9, 14/21, 1/1 ... " warningTitle="(NE PAS RETIRER LE KEY `aspect-`)" isObject/>}
                    </div>
                    <InputImage value={image} setValue={setImage} placeholder="" title="Changer l'affiche de l’exposition" />
                    <div className="absolute bottom-2 left-0 w-full flex center">
                        <div className="flex gap-4">
                            <button className="bg-green p-2 text-white font-mt-bold rounded-lg mt-2" onClick={()=>setPopup(<ConfirmPopup text="Confirmez vous la mise à jour de l'affiche ?" actionYes={()=>UpdateImage()} setIsOpen={setIsOpen}/>)}>Update l'affiche</button>
                            <button className="bg-red p-2 text-white font-mt-bold rounded-lg mt-2 " onClick={()=>fetchData()}>Reset l'affiche</button>
                        </div>
                    </div>
                </div>
            </div>
           
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                        <div className="fixed inset-0 flex w-screen flex items-center justify-center p-1 lg:p-4">
                            <DialogPanel>{popup}</DialogPanel> 
                                
                            
                        </div>
            </Dialog>
        </>}
    </div>
}

export default AdminExpoUpdate;