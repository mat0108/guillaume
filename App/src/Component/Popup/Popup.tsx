import { Dispatch, SetStateAction } from "react";

type ConfirmPopupProps = {
    text:string;
    yes?:string
    actionYes: ()=>void;
    no?:string;
    actionNo?: ()=>void;
    setIsOpen: Dispatch<SetStateAction<any>>
}
export function ConfirmPopup({text,yes,actionYes,no,actionNo,setIsOpen}:ConfirmPopupProps){
    return <div className="w-fit h-fit flex flex-col gap-4 p-2 bg-spaceBlue text-white rounded-lg border-2 border-black font-mt-bold">
        <p>{text}</p>
        <div className="flex flex-row">
            <div className="w-1/2 flex center"><p className="bg-red px-2 rounded-lg" onClick={()=>{setIsOpen(false);if(actionNo){actionNo()}}}>{yes ?? "Non"}</p></div>
            <div className="w-1/2 flex center"><p className="bg-green px-2 rounded-lg" onClick={()=>{setIsOpen(false);actionYes()}}>{no ?? "Oui"}</p></div>
        </div>
    </div>
}