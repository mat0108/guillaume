import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import InputString from "../../../Component/Inputs/InputString";
import { Expo, getAllExpo } from "../../../services/expo";
import DropDownMenu, { dropDownProps } from "../../../Component/Inputs/dropDownMenu";
import Loading from "../../../Component/Loading/Loading";
import InputImage from "../../../Component/Inputs/InputFile";
import { ConfirmPopup } from "../../../Component/Popup/Popup";
import { createTableau } from "../../../services/tableau";
import { toast } from "react-toastify";

type AdminTableauCreateProps = {
    setPopup:Dispatch<SetStateAction<any>>,
    setIsOpen:Dispatch<SetStateAction<any>>
}
const AdminTableauCreate = ({setPopup,setIsOpen}:AdminTableauCreateProps)=>{
    const [tableau,setTableau] = useState({
        titre:"",
        technique: "",
        dim_oeuvre: "",
        dim_cadre: "",
        prix:  "",
        expos: [],
        date: ""
    })
    const [expos,setExpos] = useState<Expo[]>()
    const [file,setFile] = useState<File>()
    useEffect(()=>{
        async function fetchData(){
            const data = await getAllExpo()
            setExpos(data)
        } 
        fetchData();
    },[])

    function Reset(){
        setTableau(
            {
                titre:"",
                technique: "",
                dim_oeuvre: "",
                dim_cadre: "",
                prix:  "",
                expos: [],
                date: ""
            }
        )
        setFile(undefined)
    }
    async function create(){
        if(tableau && file){
            const res = await createTableau({tableau,file})
            if(res.status){toast.info("Le tableau a bien été crée")}
        }
    }
    const dropDown = useMemo(()=>{
        return <div className="w-full flex flex-col">
   
            <p className="w-full font-mt-bold text-white">Exposition</p>
            {expos ? <DropDownMenu options={expos?.map((expo:Expo)=>{return {value:expo._id,name:expo.title}}) as dropDownProps[]} pos={1} selectedOptions={tableau.expos} setSelectedOptions={setTableau} isObject field="expos"/> : <div className="w-full flex center"><Loading darkMode size="w-8"/></div>}
        </div>
    },[expos,tableau])
    return <div className="w-full h-screen flex center bg-mainColor p-4">
        <div className="w-[60vw] h-fit relative flex flex-col bg-spaceBlue p-10 gap-4 rounded-4xl">
        <p className="font-mt-bold text-white w-full text-center text-[20px]">Création d'un nouveau tableau</p>
        <div className="w-full flex flex-row gap-4">
            <div className="w-3/5 flex flex-col gap-4">
                {<InputString value={tableau.titre} setValue={setTableau} field="titre" placeholder="Titre du tableau" title="Titre du tableau" isObject/>}
                {<InputString value={tableau.technique} setValue={setTableau} field="technique" placeholder="Technique du tableau" title="Technique du tableau" isObject/>}
            </div>
            <div className="w-2/5 flex flex-col gap-4">
                {<InputString value={tableau.dim_oeuvre} setValue={setTableau} field="dim_oeuvre" placeholder="XX x XX" title="Dimension oeuvre" isObject warningTitle="pas besoin de mettre l'unité "/>}
                {<InputString value={tableau.dim_cadre} setValue={setTableau} field="dim_cadre" placeholder="XX x XX" title="Dimension cadre" isObject/>}
            </div>
        </div>
        <div className="w-full flex flex-row gap-4">
            <div className="w-1/3">
                {dropDown}
            </div>
            <div className="w-1/3">
                {<InputString value={tableau.prix} setValue={setTableau} field="prix" placeholder="XXX" title="Prix" isObject warningTitle="pas besoin de €"/>}
            </div>
            <div className="w-1/3">
                {<InputString value={tableau.date} setValue={setTableau} field="date" placeholder="" title="Date" isObject />}
            </div>
        </div>
        <div className="w-full flex flex-row gap-4">
            <div className="w-2/3">
                {<InputImage title="Image du tableau" setValue={setFile} placeholder="" />}
            </div>
            <div className="w-1/3 flex flex-col">
                <button className="bg-green p-2 text-white font-mt-bold rounded-lg mt-2" onClick={()=>{setPopup(<ConfirmPopup text="Confirmez vous la création du tableau ?" actionYes={()=>{create()}} setIsOpen={setIsOpen}/>); setIsOpen(true)}}>Créer le tableau</button>
                <button className="bg-red p-2 text-white font-mt-bold rounded-lg mt-2 " onClick={()=>Reset()}>Reset </button>
            </div>
        </div>
            
        </div>
    </div>
}

export default AdminTableauCreate;