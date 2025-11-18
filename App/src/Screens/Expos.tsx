import { useEffect, useState } from "react"
import { Expo, getAllExpo } from "../services/expo"
import Loading from "../Component/Loading/Loading";
import { LinkButton } from "../Component/Navbar";
type ExposProps = {
    scrollRef:React.MutableRefObject<HTMLDivElement | null>;
}
const Expos = ()=>{
    const [expos,setExpos] = useState<Expo[] | undefined | null>(null);
    
    useEffect(()=>{
        async function fetchData() {
            let data = await getAllExpo();
            setExpos(data)
        }
        fetchData();
    },[])
    return <div className="bg-mainColor z-[30]">
        
        {!expos && <div className="w-full h-[400px] lg:h-[800px] flex center"><Loading darkMode/></div>} 
        {expos &&   <p className="w-full font-mt-bold text-[40px] text-center bg-mainColor text-textColor mt-10">Mes expositions</p>}
        {expos && expos.length && <div className="w-full flex flex-col center mt-1 lg:mt-2 ">
            <div className="w-[90%] flex flex-col gap-4 mt-2 lg:mt-10">
                {expos && expos.map((expo,pos)=><div className={`relative w-full flex `}>
                    <div className={`absolute inset-0 ${pos % 2 ? "bg-white" : "bg-snow"} opacity-100  z-0 rounded-3xl`}></div>
                    <div className="max-w-[80%] lg:max-w-[70%] relative flex flex-col justify-between p-1 lg:p-2">
                        <div>
                            <p className="w-full text-center font-mt-bold text-2xs lg:text-[30px] ">{expo.title}</p>
                            <div className="flex flex-col text-justify gap-4 mt-2 lg:mt-10 text-3xs lg:text-[20px]">
                                {expo.paragraphes && expo.paragraphes.map((paragraphe:string)=><p>{paragraphe}</p>)}
                            </div>
                        </div>
                        <div className="w-full flex center mt-2 text-2xs lg:text-base">
                            {LinkButton("Voir les tableaux",`/expo/${expo.title}`)}

                        </div>
                    </div>    
                    <div className="w-[20%] lg:w-[30%] p-1 lg:p-4 z-[10] h-full flex center">
                        {/* <div className=" flex flex-col ">
                            <img src={"/images/test1.webp"} className="h-[300px] w-fit"/>
                            <img src={"/images/test2.webp"} className="h-[300px] w-fit"/>
                        </div> */}
                        <img src={expo.tableauAffiche} alt={expo.title} className="w-fit lg:h-fit" />
                    </div>
                </div>)}

            </div>
        </div>}
    </div>
    
}
export default Expos;