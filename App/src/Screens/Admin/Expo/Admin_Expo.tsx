import { useEffect, useState } from "react";
import { Expo, getAllExpo } from "../../../services/expo";
import Check_Connect from "../Check_Connect";
import { Link } from "react-router";
import Loading from "../../../Component/Loading/Loading";

const AdminExpo = ()=>{
    Check_Connect()
    const [expos,setExpos] = useState<Expo[] | undefined | null>(null);
    
    useEffect(()=>{
        async function fetchData() {
            let data = await getAllExpo();
            setExpos(data)
        }
        fetchData();
    },[])

        return <div className="w-screen h-screen bg-mainColor flex flex-col center p-4 gap-4 text-white font-mt-bold ">
        {!expos && <Loading darkMode/>}
        {expos && expos.map(expo=><div className="w-3/4 h-[70px] flex items-center justify-between bg-spaceBlue  rounded-lg p-4 gap-4  ">
            <p>{expo.title}</p>
            <div className="flex gap-4">
                <Link to={`/admin/expo/${expo._id}/update`} className="w-fit h-fit p-2 bg-steelBlue rounded-lg "> Modifier les informations </Link>
                <Link to={`/admin/expo/${expo._id}/order`} className="w-fit h-fit p-2 bg-blackDarked rounded-lg "> Modifier l'ordre des tableaux</Link>
                <Link to={`/admin/tableaux/${expo._id}`} className="w-fit h-fit p-2 bg-delftBlue rounded-lg "> Modifier les tableaux de cette expo</Link>
            
            </div>
        </div>
            
        )}
        {expos && <Link to={"/admin/expos/create"} className="w-fit h-[70px] p-2 bg-steelBlue flex center rounded-lg mt-4">Créer une nouvelle expo</Link>}

    </div> 
    
}
export default AdminExpo