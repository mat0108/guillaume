import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import { getExpoCount, getTableauByExpo, getTableauById, getTableaux, rotateTableau, tableau, UpdateAfficheExpo, updateTableau } from "../../../services/tableau";
import Loading from "../../../Component/Loading/Loading";

import {toast} from 'react-toastify';
import { ConfirmPopup } from "../../../Component/Popup/Popup";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Expo, getAllExpo, getExpo } from "../../../services/expo";
import InputString from "../../../Component/Inputs/InputString";
import { dropDownProps } from "../../../Component/Inputs/dropDownMenu";
import DropDownMenu from "../../../Component/Inputs/dropDownMenu";

const DisplayTableau = ({tableaux,pos,setPopup,setIsOpen,dropDownItems}:{tableaux:tableau[],pos:number, setPopup:Dispatch<SetStateAction<any>>;setIsOpen:Dispatch<SetStateAction<any>>,dropDownItems:dropDownProps[]}) => {
    const [image,setImage] = useState<File>()
    const [tableau,setTableau] = useState<tableau>(tableaux[pos])
    const fileInputRef = useRef<HTMLInputElement>(null)
    const fetchData = async (toastMessage?:string)=> {
        const res = await getTableauById({id:tableau._id})
        if(res.status === 200){
            setTableau(res.data)
            if(toastMessage) toast.info(toastMessage)
        }
    } 
    const handleFile = async (file:File)=>{
        const res = await UpdateAfficheExpo({tableauId:tableau._id,file:file})
        if(res.status === 200){
            fetchData("Tableau mise à jour ")
        }
    }
    const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setPopup(<ConfirmPopup text="Est que vous etes sur de mettre a jour l'image du tableau ? " setIsOpen={setIsOpen} actionYes={()=>{handleFile(file);setPopup(null)}}/>)
        setIsOpen(true)
    };
    const onChangeDropdown = (e:any)=>{
        setTableau((prev: any) => ({ ...prev, ["expos"]: e }))
    }

    async function rotateImage(angle:number) {
        const res = await rotateTableau({tableauId:tableau._id,angle})
        if(res.status === 200){
            fetchData("Rotation effectué")
        }
    }  
    async function updateData() {
        const res = await updateTableau({tableauId:tableau?._id,body:{
            titre:tableau.titre,
            technique:tableau.technique,
            dim_cadre:tableau.dim_cadre,
            dim_oeuvre: tableau.dim_oeuvre,
            prix:tableau.prix,
            date:tableau.date,
            expos:tableau.expos
            
        }})
        if(res.status === 200){
            fetchData("Tableau mise à jour ")
        }
        
    }
    const elem = useMemo(()=>{
        return <div className={`flex flex-row gap-4 p-4 w-full h-fit ${pos % 2 ? "bg-spaceBlue" : "bg-delftBlue"}`}>
        <div className="flex center w-fit">
            <img src={tableau.imageBase64.imageBase64} alt={tableau._id} className={`w-40 h-fit `} />    
        </div>
        <div className="w-fit h-full flex flex-col center gap-2">
            <div className="w-fit h-fit flex flex-col gap-2 center ">
                <div className="w-full flex flex-row gap-2">
                    <div className="w-12 h-12 flex center p-2 border-4 border-white rounded-xl " onClick={()=>rotateImage(90)}>
                        <img src="/images/rotate-left.webp" className="w-8 "/>
                    </div>                
                    <div className="w-12 h-12 flex center p-2 border-4 border-white rounded-xl" onClick={()=>rotateImage(-90)}>
                        <img src="/images/rotate-right.webp" className="w-8 "/>
                    </div>
                </div>
                <div className="w-full h-full flex center relative ">
                    <div className="w-12 h-12 flex center p-2 border-4 border-white rounded-xl">
                        <img src="/images/add.webp" className="w-8 z-[0]"/>    
                    </div>
                     <input ref={fileInputRef} type="file" accept="image/*" onClick={(e) => (e.currentTarget.value = "")} onChange={onChangeFile} className={`absolute top-0 left-0 w-full h-full text-transparent z-[10]`}/>
        
                </div>
            </div>
           
        </div>
        <div className="w-[400px] flex flex-col center gap-4 ">
            <InputString field="titre" value={tableau.titre} setValue={setTableau} placeholder="Le titre du tableau" title="Titre du tableau"/>
            <InputString field="technique" value={tableau.technique} setValue={setTableau} placeholder="La technique du tableau" title="Technique du tableau"/>
        </div>
        <div className="w-[200px] flex flex-col center  gap-4 ">
             <InputString field="dim_oeuvre" value={tableau.dim_oeuvre} setValue={setTableau} placeholder="Dimension de l'oeuvre" title="Dimension de l'oeuvre" />
            <InputString field="dim_cadre" value={tableau.dim_cadre} setValue={setTableau} placeholder="Dimension du cadre" title="Dimension du cadre"  />
        </div>
        <div className="w-[200px] flex flex-col center  gap-4 ">
            <InputString field="prix" value={tableau.prix} setValue={setTableau} placeholder="Prix du tableau" title="Prix du tableau"  />
            <InputString field="date" value={tableau.date} setValue={setTableau} placeholder="mm/yyyy ou yyyy" title="Date du tableau" />
        </div>
        <div className="w-[300px] flex flex-col  ">
            <p className="w-full font-mt-bold text-white">Exposition</p>
            <DropDownMenu options={dropDownItems} selectedOptions={tableau.expos} setSelectedOptions={onChangeDropdown}/>
            
        </div>
        <div className="flex flex-col center gap-4 ">
            <button className="bg-green p-2 text-white font-mt-bold rounded-lg mt-2" onClick={()=>setPopup(<ConfirmPopup text="Confirmez vous la mise à jour des ses informations ?" actionYes={()=>updateData()} setIsOpen={setIsOpen}/>)}>Update les informations</button>
            <button className="bg-red p-2 text-white font-mt-bold rounded-lg mt-2 " onClick={()=>fetchData()}>Reset les informations</button>
        </div>
    </div>
    },[tableau])
    return elem
}

const AdminTableauUpdates = ()=>{
    const [total,setTotal] = useState<number>(0)
    const [loading,setLoading] = useState<boolean>(false);
    const [tableaux,setTableaux] = useState<tableau[]>()
    const [expo,setExpo] = useState<Expo>()
    const [expos,setExpos] = useState<Expo[]>()
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const [popup,setPopup] = useState<any>()
    const params = useParams();
    const limit = 10;

    useEffect(()=>{
        async function fetchData(){
            const data = await getExpoCount(params?.expoId);
            const data2 = await getAllExpo()
            console.log('data2 : ', data2)
            if(params.expoId){
                let expo = data2.filter((expo:Expo)=>expo._id === params.expoId)
                if(expo.length === 1){
                    setExpo(expo[0])
                }
            }
            setExpos(data2);
            setTotal(data.total);
        } 
        fetchData()
    },[params])
        useEffect(() => {
            if (total > 0) {
                const fetchAll = async () => {
                    setLoading(true);
                    setTableaux([]); // reset before fetching
    
                    const pages = Math.ceil(total / limit);
                    const fetchPromises = [];
    
                    for (let i = 1; i <= pages; i++) {
                        if (params.expoId) {
                            fetchPromises.push(getTableauByExpo({ expoId:params.expoId, page: i, limit }));
                        } else {
                            fetchPromises.push(getTableaux({ page: i, limit }));
                        }
                    }
    
                    try {
                        const results = await Promise.all(fetchPromises);
                        // flatten all tableaux into one array
                        const allTableaux = results.flatMap(res => res.tableaux);
                        if(params?.expoId && expo){
                            let tableauOrdonnée = expo?.tableauxOrder && expo?.tableauxOrder.length ? expo?.tableauxOrder.map(id=>allTableaux.find(t=>t._id === id)).filter((t): t is tableau => Boolean(t)) : allTableaux
                            setTableaux(tableauOrdonnée);
                        }else{
                            setTableaux(allTableaux);
                        }
                        
                        
                        
                    } catch (err) {
                        console.error(err);
                    } finally {
                        setLoading(false);
                    }
                };
    
                if(total > 0 && limit){fetchAll();}
            }
        }, [total, expo , params, limit])

    const elem = useMemo(()=>{
        return <div className="w-full min-h-screen h-full flex flex-col bg-mainColor overflow-auto custom-scrollbar gap-4">
            {!loading && tableaux && tableaux.map((tableau:tableau,pos:number)=><DisplayTableau tableaux={tableaux} pos={pos} setPopup={setPopup} setIsOpen={setIsOpen} key={tableau._id} dropDownItems={expos?.map((expo:Expo)=>{return {value:expo._id,name:expo.title}}) as dropDownProps[]} />)}
            {loading && <div className="w-full h-[400px] lg:h-[800px] flex center"><Loading darkMode/></div>} 
        </div>
    },[tableaux,expos])
    useEffect(()=>{
        if(popup){
            setIsOpen(true)
        }
    },[popup])
    useEffect(()=>{
        if(!isOpen){
            setPopup(null)
        }
    },[isOpen])
    return <div>
        {elem}
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 flex w-screen flex items-center justify-center p-1 lg:p-4">
                        <DialogPanel>{popup}</DialogPanel> 
                            
                        
                    </div>
        </Dialog>
    </div>
}
export default AdminTableauUpdates;