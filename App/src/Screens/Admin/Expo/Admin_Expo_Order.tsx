import { useEffect, useMemo, useState } from "react";
import Check_Connect from "../Check_Connect";
import { useParams } from "react-router";
import { getExpoCount, getTableauByExpo, tableau } from "../../../services/tableau";
import Loading from "../../../Component/Loading/Loading";
import {DndContext} from '@dnd-kit/core';
import DropDragGrid from "../../../Component/DropDragGrid/DropDragGrid";
import { Expo, getExpo, setOrderExpo } from "../../../services/expo";
import {toast} from 'react-toastify'
const AdminExpoOrder = ()=>{
    Check_Connect();
    const params = useParams();
    const [tableaux,setTableaux] = useState<tableau[] | undefined>();
    const [expo,setExpo] = useState<Expo>()
    const [items,setItems] = useState<string[]>()
    const [loading,setLoading] = useState<boolean>(false)
    const [total,setTotal] = useState<number>(0);
    const limit = 10;
    useEffect(()=>{
        async function fetchData(){
            if(params && params.expoId){
                const data = await getExpoCount(params.expoId);
                const data2 = await getExpo({expoId:params.expoId})
                setExpo(data2)
                setTotal(data.total);
            }
        } 
        
        fetchData()
    },[params])
     useEffect(() => {
            if (total > 0) {
                const fetchAll = async () => {
                    
                    setTableaux([]); // reset before fetching
                    setLoading(true)
                    const pages = Math.ceil(total / limit);
                    const fetchPromises = [];
                    console.log('params.expoId : ', params.expoId)
                    if(params && params.expoId){
                        for (let i = 1; i <= pages; i++) {
                            fetchPromises.push(getTableauByExpo({ expoId:params.expoId, page: i, limit }));
                        }
                    }
    
                    try {
                        const results = await Promise.all(fetchPromises);
                        // flatten all tableaux into one array
                        const allTableaux = results.flatMap(res => res.tableaux);
                        setTableaux(allTableaux);
                        let tableauOrdonnée = expo?.tableauxOrder && expo?.tableauxOrder.length ? expo?.tableauxOrder.map(id=>allTableaux.find(t=>t._id === id)).filter((t): t is tableau => Boolean(t)) : allTableaux
                        setItems(tableauOrdonnée.map(item=>item._id))
                    
                        
                        
                    } catch (err) {
                        console.error(err);
                    }finally {
                        
                        setLoading(false)
                    }
                };
    
                if(total > 0 && limit){fetchAll();}
            }
        }, [total, params, limit,expo]);
  
    const elem = useMemo(()=>{
        
        if(loading){
            return <div className="w-full h-screen flex center"> <Loading darkMode/></div>
        }else if(items && items?.length > 0 ){
             
            return <DropDragGrid items={items} setItems={setItems} tableaux={tableaux ?? []}/>
        }
    },[items,tableaux,loading])
    function updateClick(){
        async function fetchData(){
            if(params.expoId && items?.length){
                const data = await setOrderExpo(params.expoId,items)
                if(data.status === 200){
                    toast.success(data.data.message)
                }
            }
        }
        fetchData()
    }
    return <div className="w-screen bg-mainColor flex flex-col center p-4 gap-4 text-white font-mt-bold">
      <div className="relative w-full text-center text-2xl">{expo?.title}
        <div className="absolute top-2 right-10 text-lg bg-green p-2 rounded-xl" onClick={()=>updateClick()}>Mettre à jour l'ordre des tableaux</div>

      </div>
      {elem}
    </div>
}

export default AdminExpoOrder;