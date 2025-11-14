import { useEffect, useState } from "react"
import { Expo, getAllExpo } from "../services/expo"
import Loading from "../Component/Loading/Loading";
import { LinkButton } from "../Component/Navbar";

const Expos = ()=>{
    const [expos,setExpos] = useState<Expo[] | undefined | null>(null);
    
    useEffect(()=>{
        async function fetchData() {
            let data = await getAllExpo();
            setExpos(data)
        }
        fetchData();
    },[])
    return <div className="relative flex flex-col overflow-auto custom-scrollbar z-[30] bg-mainColor ">
        
        {!expos && <div className="w-full h-[800px] flex center"><Loading darkMode/></div>} 
        {expos &&   <p className="w-full font-mt-bold text-[40px] text-center bg-mainColor text-textColor mt-10">Mes expositions</p>}
        {expos && expos.length && <div className="w-full flex flex-col center mt-2 ">
            <div className="w-[90%] flex flex-col gap-4 mt-10">
                {expos && expos.map((expo,pos)=><div className={`relative w-full flex `}>
                    <div className={`absolute inset-0 ${pos % 2 ? "bg-white" : "bg-snow"} opacity-85  z-0 rounded-3xl`}></div>
                    <div className="max-w-[70%] relative flex flex-col justify-between p-2">
                        <div>
                            <p className="w-full text-center font-mt-bold text-[30px] ">{expo.title}</p>
                            <div className="flex flex-col text-justify gap-4 mt-10 text-[20px]">
                                {expo.paragraphes && expo.paragraphes.map((paragraphe:string)=><p>{paragraphe}</p>)}
                            </div>
                        </div>
                        <div className="w-full flex center">
                            {LinkButton("Voir les tableaux",`/expo/${expo.title}`)}

                        </div>
                    </div>    
                    <div className="w-[30%] p-4 z-[10]">
                        <div className=" flex flex-col ">
                            <img src={"/images/test1.webp"} className="h-[300px] w-fit"/>
                            <img src={"/images/test2.webp"} className="h-[300px] w-fit"/>
                        </div>
                        {/* <img src={expo.tableauAffiche.imageBase64.imageBase64} alt={expo.tableauAffiche.titre} /> */}
                    </div>
                </div>)}

            </div>
        </div>}
    </div>
    
}
export default Expos;