import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { getExpoCount, getTableauByExpo, getTableaux, tableau } from "../../services/tableau"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Dialog, DialogPanel } from '@headlessui/react'
import Loading from "../Loading/Loading";
type PaintingGridProps = {
    expo?: string
    background?: ReactNode;
}
const PaintingGrid = ({expo,background}:PaintingGridProps)=>{
    const [tableaux,setTableaux] = useState<tableau[]>([]);
    const [tableau,setTableau] = useState<tableau | null>()
    const [page,setPage] = useState(1);
    const [total,setTotal] = useState<number>(0);
    const [loading,setLoading] = useState(false);
    const limit = 10;
    const [isOpen,setIsOpen] = useState(false);
    const breakpoints:any = { 480: 1, 768: 2, 996: 3, 1200: 4, 1900: 5 };

    function getValueFromWidth(width = window.innerWidth) {
    const sorted = Object.keys(breakpoints)
        .map(Number)
        .sort((a, b) => a - b);

    let value = breakpoints[sorted[0]];

    for (const bp of sorted) {
        if (width >= bp) {
        value = breakpoints[bp];
        } else {
        break;
        }
    }

    return value;
    }
    
    
    useEffect(()=>{
        async function fetchData(){
            const data = await getExpoCount(expo);
            console.log('data.total : ', data.total)
            setTotal(data.total);
        } 
        fetchData()
    
    },[expo])

    useEffect(() => {
        if (total > 0) {
            const fetchAll = async () => {
                setLoading(true);
                setTableaux([]); // reset before fetching

                const pages = Math.ceil(total / limit);
                console.log('pages : ', pages)
                const fetchPromises = [];

                for (let i = 1; i <= pages; i++) {
                    if (expo) {
                        fetchPromises.push(getTableauByExpo({ expo, page: i, limit }));
                    } else {
                        fetchPromises.push(getTableaux({ page: i, limit }));
                    }
                }

                try {
                    const results = await Promise.all(fetchPromises);
                    console.log('results  : ', results )
                    // flatten all tableaux into one array
                    const allTableaux = results.flatMap(res => res.tableaux);
                    setTableaux(allTableaux);
                    
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            if(total > 0 && limit){fetchAll();}
        }
    }, [total, expo, limit]);
    function BackItem({item}:{item:tableau}){
        return <div  className={`max-w-[50vw]  relative flex flex-col p-4 rounded-2xl bg-lightGray flex center`} onClick={()=>{setIsOpen(false)}}>
            <p className="font-mt-bold mt-2 text-center"> {item.titre}</p>
            <div className={`flex flex-row justify-around ${item.dim_cadre ? "w-[80%]":"w-[70%]"}`}>
                    <p>dimension oeuvre : {item.dim_oeuvre}</p>
                    {item.dim_cadre && <p>dimension cadre : {item.dim_cadre}</p>}
                    <p>technique : {item.technique}</p>
                </div>
                <img src={item?.imageBase64.imageBase64} alt={item.titre} className="w-full max-h-[80vh]"/>
            

            <div className="absolute bottom-3 right-2 w-5 h-5"><img src={"/images/close.webp"} alt={"close"}/></div>
         </div > 
    }


    function onFullScreen(tableau:tableau){
        setTableau(tableau);
        setIsOpen(true);
        
    }
    const FrontItems  = useMemo(()=>{
        return tableaux?.map((tableau,pos)=>
         <div className={`relative flex flex-col pb-2 rounded-2xl  flex center w-full z-[10] ${pos % 2 ? "bg-white" : "bg-snow"}`} onClick={()=>{onFullScreen(tableau)}}>

            <img src={tableau.imageBase64.imageBase64} alt={tableau._id} className="w-full h-fit rounded-t-lg z-[10]"/>
            <p className="font-mt-bold mt-2 text-center z-[10]"> {tableau.titre}</p>
            <img src={"/images/fullscreen.webp"} alt={"fullscreen"} className="absolute bottom-3 right-2 w-5 h-5 z-[10]" />
            </div> 
        )
    },[tableaux])

    return <div className="w-full flex center relative pt-2">
        {background}
        <div className="w-screen">

            {loading && <div className="w-full h-[400px] flex center"><Loading darkMode /></div>}
            {!loading && <ResponsiveMasonry 
                columnsCountBreakPoints={{768: 2, 996: 3, 1200: 4, 1900:5 }} >
                <Masonry gutter="32px">{FrontItems}</Masonry>
            </ResponsiveMasonry>}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel>{tableau && BackItem({item:tableau})}</DialogPanel> 
                    
                
            </div>
            </Dialog>
            </div>
    </div>
}

export default PaintingGrid;