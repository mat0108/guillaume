import { useEffect, useMemo, useRef, useState } from "react";
import { draw } from "../Component/draw";
import { getTableauByExpo } from "../services/tableau";
import PaintingGrid from "../Component/PaintingGrid/PaintingGrid";
import { Expo as ExpoType, getExpo } from "../services/expo";
import { useParams } from "react-router";

type ExpoProps = {
    title: string;

}
const Expo = ({title}:ExpoProps)=>{
    const [expo,setExpo] = useState<ExpoType>()
    const params = useParams();
    useEffect(()=>{
    
        async function fetchData(){
            if(params.expoId || title){
            const data = await getExpo({expoId: title ?? params.expoId })

            setExpo(data)}
        }
        fetchData()
    },[params,title])
    const canvasRef = useRef<HTMLCanvasElement>(null);
    let h = 520;
  
    // useEffect(()=>{

    //     const canvas = canvasRef.current;
    //     if (!canvas) return;
    //     const ctx = canvas.getContext("2d");
    //     if (!ctx) return;
    //     // draw({ctx,height:h,radius:120,position:2/3-0.03,thickness:30,asc:false})
    //     const handleResize = () => {
    //         canvas.width = window.innerWidth;
    //             draw({ctx,height:h,radius:120,position:2/3-0.03,thickness:30,asc:false});
    //         };
    //         window.addEventListener("resize", handleResize);
    //     return () => window.removeEventListener("resize", handleResize);
    // },[])

    // function onLoadImage(){
    //     const elem = document.getElementById("guillaume_picture");
    //     const canvas = canvasRef.current;
    //     if (!canvas) return;
    //     const ctx = canvas.getContext("2d");
    //     if (!ctx) return;
    //     if(elem){
    //         let parent = elem.parentElement?.clientWidth;
    //         let child = elem?.clientWidth;
    //         if(parent && child){
    //             if(parent === child){
    //                 let pos = (window.innerWidth - child - 60)/window.innerWidth

    //                 draw({ctx,height:h,radius:120,position:pos,thickness:30,asc:false})
    //             }else{
    //                 let pos = (window.innerWidth - (parent - child)/2 - child - 60)/window.innerWidth

    //                 draw({ctx,height:h,radius:120,position:pos,thickness:30,asc:false})
                    
    //             }
    //         }

    //     }   
    // }
    const element = useMemo(()=>{
        if(expo){
            return <PaintingGrid expo={expo} />
        }else{
            return <></>
        }
    },[expo])
    const LIMIT = 210;
    return <>
        <div className="absolute top-[270px] lg:top-[450px] left-0 w-full">
             <div className="w-full h-[50px] lg:h-[150px] bg-linear-to-b from-transparent  to-mainColor z-20"></div>
        </div>
        <div className="w-full flex relative mt-5 ">
        {/* <div className="absolute w-full h-full z-[10]">
            <canvas ref={canvasRef} id="canvas" width={window.innerWidth} height={h} />
          </div> */}
        <div className="w-3/4 lg:w-2/3 h-[270px] lg:h-[520px] flex flex-col gap-2 center font-mt-bold text-justify text-[12px] sm:text-[16px]">
            <p className="w-full text-center text-base sm:text-[50px] mb-[-8px] text-darkBlue">{expo?.title}</p>
                {/* <p className="w-full text-center text-base sm:text-[50px] mb-4 text-lightBlue">Guillaume Barnabé</p> */}
            <div className="flex flex-col w-[98%] sm:w-[90%] gap-4 text-[0.5rem] lg:text-[20px] ">
                {expo && expo.paragraphes && expo.paragraphes.map((paragraphe:string,pos:number)=><p className={`${pos >= 2 ? "text-trueWhite":"text-black"}`}>{paragraphe}</p>)}
            </div>

        
        </div>
        <div className="w-1/4 lg:w-1/3 h-[200px] sm:h-[520px] rounded-2xl flex center mt-8 relative flex center p-2 lg:p-0">
            <img id={"guillaume_picture"}src={"/images/guillaume.webp"} alt={"guillaume"} className="max-h-3/4 aspect-1 rounded-lg sm:rounded-[2rem] "/>
        </div>
        
    </div>
        <div className={`bg-mainColor`}>{element}</div>
    </>
}

export default Expo