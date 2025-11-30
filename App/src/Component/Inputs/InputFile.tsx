import { Dispatch, SetStateAction, useRef } from "react";

type InputFileProps = {
    value?: File;
    setValue: Dispatch<SetStateAction<any>>
    placeholder: string;
    title: string;
    warningTitle?: string;
    classField?: string;
    classTitle?: string;
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

export default InputImage;
