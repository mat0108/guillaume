import { useParams } from "react-router";
import Check_Connect from "../Check_Connect";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { Expo, getExpo, UpdateAfficheExpo, UpdateExpo } from "../../../services/expo";
import { Dialog, DialogPanel } from "@headlessui/react";
import {toast} from 'react-toastify';
import { ConfirmPopup } from "../../../Component/Popup/Popup";

type InputStringProps = {
    value: string;
    field: string;
    setValue: Dispatch<SetStateAction<any>>
    placeholder: string;
    title: string;
    warningTitle?: string;
    classField?: string;
    classTitle?: string;
}
type InputFileProps = {
    value?: File;
    setValue: Dispatch<SetStateAction<any>>
    placeholder: string;
    title: string;
    warningTitle?: string;
    classField?: string;
    classTitle?: string;
}


type InputStringArrayProps = {
    value: string[];
    pos: number;
    field: string;
    setValue: Dispatch<SetStateAction<any>>
    placeholder: string;
    title: string;
    classField?: string;
    classTitle?: string;
    setPopup:Dispatch<SetStateAction<any>>,
    setIsOpen:Dispatch<SetStateAction<any>>
} 
export function InputString({value,field,setValue,placeholder,title,warningTitle,classField,classTitle}:InputStringProps){
        return <div className="w-full h-fit flex flex-col ">
            <div className={`${classTitle ?? 'font-mt-bold text-white flex justify-between'}`}><p>{title}</p>{warningTitle && <span className="text-lightRed">{warningTitle}</span>}</div>
            <input value={value} onChange={e=>setValue((prev: any) => ({ ...prev, [field]: e.target.value }))} placeholder={placeholder} className={`bg-white rounded-lg p-2 ${classField ?? 'font-mt-bold'}`}/>
        </div>
}
function InputStringArrayItem({value,pos,field,setValue,placeholder,title,classField,classTitle}:InputStringArrayProps){
    const ref = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    el.style.height = "auto";               // reset
    el.style.height = `${el.scrollHeight}px`; // new height
}, [value]);
    return <textarea value={value[pos]} 
            ref={ref}
        onInput={(e)=>{ e.currentTarget.style.height = "auto";
        e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;}} 
        onChange={(e) =>
            setValue((prev: any) => {
            const newArray = [...prev[field]]; 
            newArray[pos] = e.target.value;    
            return {...prev,[field]: newArray,};})} 
            placeholder={`${placeholder}${pos+1}`}  className={`bg-white w-full text-justify rounded-lg p-2 ${classField ?? 'font-mt-bold'} min-h-4 whitespace-pre-wrap overflow-hidden  resize-none  `}/>
}
    

function InputStringArray(props:InputStringArrayProps){
    return <div className="w-full h-fit flex flex-col gap-2 ">
        <p className={`${props.classTitle ?? 'font-mt-bold text-white'}`}>{props.title}</p>
        {props.value.map((item:string,pos:number)=>
        <div className="w-full h-full relative">
            <InputStringArrayItem {...props} pos={pos} classField={pos === props.value.length - 1 ? "font-mt-bold pr-10":undefined}/>
            {pos === props.value.length - 1 ? <div className="absolute top-0 right-1 w-fit h-[90%] flex center"><div className="bg-red w-8 h-8 flex center rounded-lg" onClick={()=>{props.setPopup(<ConfirmPopup text="Confirmez vous la suppression du dernier élément de la liste ?" actionYes={()=>props.value.pop()} setIsOpen={props.setIsOpen}/>);props.setIsOpen(true)}}><img src={"/images/del.webp"} alt={"del"} className="w-6 h-6"/></div></div>:""}
        </div>
        )}
        <div className="w-full flex center">
            <button className="bg-green p-2 text-white font-mt-bold rounded-lg mt-2" onClick={()=>{
                props.setValue((prev: any) => {
            const newArray = [...prev[props.field]]; 
            newArray.push("")
            return {...prev,[props.field]: newArray}})
            }}> Ajouter un paragraphe</button>   
        </div>
        </div>
}
function InputImage({value,setValue,placeholder,title,warningTitle,classField,classTitle}:InputFileProps){
        const fileInputRef = useRef<HTMLInputElement>(null)
        const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setValue(file)
      };
       return <div className="w-full h-fit flex flex-col ">
            <div className={`${classTitle ?? 'font-mt-bold text-white'} flex justify-between`}><p>{title}</p>{warningTitle && <span className="text-lightRed">{warningTitle}</span>}</div>
            <input ref={fileInputRef} type="file" accept="image/*" onClick={(e) => (e.currentTarget.value = "")} onChange={handleFile} placeholder={placeholder} className={`bg-white rounded-lg p-2 ${classField ?? 'font-mt-bold'}`}/>
        </div>
}
const AdminExpoUpdate = () => {
    
    Check_Connect();
    const [expo,setExpo] = useState<Expo>()
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const [popup,setPopup] = useState<any>()
    const [image,setImage] = useState<File>()

    const params = useParams();
    
    async function fetchData(){
        if(params.expoId){
            const data = await getExpo({expo: params.expoId })

            setExpo(data)}
    }
    async function UpdateInfo() {
        if(expo){

            const res = await UpdateExpo(expo?._id,{title:expo?.title, paragraphes: expo?.paragraphes})
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
                    {<InputString value={expo.title} field="title" setValue={setExpo} placeholder="Nom de l’exposition" title="Nom de l’exposition " warningTitle="NE PAS CHANGER ça casse l'app" />}
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
                        {<InputString value={expo.tableauAfficheRatio} field="tableauAfficheRatio" setValue={setExpo} placeholder="le ratio d'affichage de l'image" title="Ratio d'affichage de l'image : 21/9, 14/21, 1/1 ... " warningTitle="(NE PAS RETIRER LE KEY `aspect-`)"/>}
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