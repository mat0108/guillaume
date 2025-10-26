
type paintProps = {
    name:string;
    imageUrl: string;
    imageAlt:string;
    id: string;
    imageClass?:string;
    size?: string;
    background?:string;

}

const Paint = ({name,imageUrl,imageAlt,id,imageClass,size,background}:paintProps) => {
    return <div id={id} className={`${size ?? "w-full h-full"} flex flex-col center ${background ?? "bg-lightBlue"} font-mt-bold text-white`}>

        {/* <img src={'/images/test.webp'} alt={imageAlt} className={`${imageClass ?? "w-full h-fit"}`}/> */}
        <p>{name}</p>
    </div>
}
export default Paint;