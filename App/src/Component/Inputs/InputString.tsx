import { Dispatch, SetStateAction } from "react";

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
function InputString({value,field,setValue,placeholder,title,warningTitle,classField,classTitle}:InputStringProps){
        return <div className="w-full h-fit flex flex-col ">
            <div className={`${classTitle ?? 'font-mt-bold text-white flex justify-between'}`}><p>{title}</p>{warningTitle && <span className="text-lightRed">{warningTitle}</span>}</div>
            <input value={value} onChange={e=>setValue((prev: any) => ({ ...prev, [field]: e.target.value }))} placeholder={placeholder} className={`bg-white rounded-lg p-2 ${classField ?? 'font-mt-bold'}`}/>
        </div>
}

export default InputString;