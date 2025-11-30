import { Dispatch, SetStateAction, useEffect, useRef } from "react";

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

export default InputStringArray;