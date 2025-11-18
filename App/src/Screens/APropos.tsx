const APropos = () => {
    function Image(src:string,alt:string,size?:string){
        return <div className={`${size ?? 'w-full h-1/3 '} flex center`}>
            <img src={`/images/apropos/${src}`} alt={alt} className="w-full h-full   rounded-xl"/>
        
        </div>
    }
    return <div className="w-full h-full flex flex-row gap-4 bg-mainColor">
        <div className="w-1/4 h-full flex flex-col center gap-4">
            
            {Image("apropos-5.webp","apropos-2","w-full h-2/3")}
            {Image("apropos-1.webp","apropos-1")}
        </div>
         <div className="w-2/4 h-full flex flex-col center gap-4">
            <div className="w-full h-1/3 flex flex-row gap-4">
                {Image("apropos-6.webp","apropos-2","w-1/2 h-full")}
                {Image("apropos-4.webp","apropos-1","w-1/2 h-full")}
            
            </div>
            <div className="w-full h-1/3 bg-red "></div>
            
            <div className="w-full h-1/3 flex flex-row gap-4">
                {Image("apropos-8.webp","apropos-1","w-2/5 h-full")}
            
                {Image("apropos-2.webp","apropos-1","w-3/5 h-full")}


            </div>

            
        </div>
        <div className="w-1/4 h-full flex flex-col center gap-4">
            {Image("apropos-9.webp","apropos-1")}
            {Image("apropos-7.webp","apropos-3","w-full h-2/3")}
        </div>
    </div>
}
export default APropos;