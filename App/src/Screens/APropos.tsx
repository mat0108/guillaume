const APropos = () => {
    
    const isMobile = window.screen.width < 600;
    console.log('isMobile : ', isMobile)
    function Image(src:string,alt:string,size?:string,option?:string){
        return <div className={`${size ?? 'w-full h-2/7 '} flex center ${option ?? "overflow-hidden "} `}>
            <img src={`/images/apropos/${src}`} alt={alt} className={`w-full h-full  rounded-xl`}/>
        </div>
    }
    function Text(){
        return <div className={` flex flex-col text-white gap-3 text-[0.5rem] lg:text-base `}>
            <p>Guillaume Barnabé est un jeune homme passionné par la peinture, la nature, les voyages et la musique. Né à Paris en 1995, Guillaume a suivi les leçons de Rémi Pradaude, à Crépy-en-Valois, et Florian Soirot à Paris.</p>
            <p className="">Cet apprentissage a affiné ses techniques de prédilection, l’acrylique, la gouache, l’aquarelle, sur différents supports, des toiles, des cartons, du papier Canson.</p>
            <p className="text-justify">Curieux et sensible aux formes comme aux couleurs, il cultive un rapport profond à l’expression artistique. Les arts plastiques constituent pour lui un terrain d’expérimentation où l’observation, le choix des couleurs, la technique du geste et la créativité se rencontrent. Il y trouve une manière de traduire son regard sur le monde, entre sensibilité esthétique et plaisir de construire des univers visuels forts.</p>
            <p className="text-justify">Sa fascination pour la nature et la montagne en particulier témoigne d’une aspiration à la beauté et à la connexion au monde qui l’entoure. Le végétal, les saisons et les paysages nourrissent son imagination et le regénèrent. Cet attrait se prolonge dans son intérêt pour les voyages, qui lui permettent d’explorer de nouveaux paysages, de nouvelles cultures et nourrissent sa curiosité.</p>
            <p className="text-justify">Enfin, la musique classique, la chanson française et hispanique occupent une place essentielle dans son quotidien. Elles enrichissent profondément sa personnalité, en lui apportant à la fois culture, émotions et inspiration. Ce rapport à la musique révèle chez lui un goût sincère pour ce qui touche et élève. </p>
        </div>
    }
    return <div className="w-full h-full flex flex-col gap-4 bg-mainColor overflow-auto">
        {isMobile ? <div className="w-full h-full flex flex-col gap-4 bg-mainColor">
            <div className="w-full flex flex-row gap-4">
                <div className="w-1/2 h-full flex flex-col gap-4">
                    {Image("apropos-4.webp","apropos-1","flex-1")}
                    {Image("apropos-6.webp","apropos-2","flex-1")}
                </div>
                {Image("apropos-5.webp","apropos-1","w-1/2 h-full")}
            </div>
            <div className="w-full flex flex-row gap-4 px-2">
                <div className="w-1/4 h-full flex center">
                
                    {Image("apropos-7.webp","apropos-1","w-full h-3/4")}
                </div>
                <div className="w-3/4 h-full">
                    {Text()}
                </div>
         
             </div>
            <div className="w-full flex flex-row gap-4">
                <div className="w-1/2 h-full flex ">
                    
                  {Image("apropos-11.webp","apropos-1","flex-1")}
                </div>
                <div className="w-1/2 h-full flex flex-col gap-4">
                 {Image("apropos-2.webp","apropos-1","flex-1")}
                  {Image("apropos-9.webp","apropos-1","flex-1")}
                 </div>

            </div>
        </div>:<div className="w-full h-full flex flex-row gap-4">
        <div className="w-1/4 h-full flex flex-col center gap-4">
            
            {Image("apropos-5.webp","apropos-2","w-full h-3/5")}
            {Image("apropos-11.webp","apropos-1","w-full h-2/5")}
        </div>
         <div className="w-2/4 h-full flex flex-col center gap-4">
            <div className="w-full h-2/8 flex flex-row gap-4">
                {Image("apropos-4.webp","apropos-1","w-3/5 h-full","t")}
                {Image("apropos-6.webp","apropos-2","w-2/5 h-full")}
            </div>
            <div className="flex center w-full h-1/2">{Text()}</div>
            <div className="w-full h-2/8 flex flex-row gap-4">
                {Image("apropos-1.webp","apropos-1","w-1/2 h-full")}
            
                {Image("apropos-2.webp","apropos-1","w-1/2 h-full")}


            </div>

            
        </div>
        <div className="w-1/4 h-[calc(100vh - 100px)] grid grid-rows-[1fr_2fr] gap-4">
            {Image("apropos-9.webp","apropos-1","w-full h-full")}
            {Image("apropos-7.webp","apropos-3","w-full h-full")}
        </div></div>}
    </div>
}
export default APropos;