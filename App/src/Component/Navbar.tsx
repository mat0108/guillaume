import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router";
import { UserProps } from "../Screens/Admin/Admin_main";
import { useCookies } from "react-cookie";
export function LinkButton(text:string,to:string){
        return <Link to={to} className="flex center text-3xs lg:text-xl text-nowrap font-mt-bold text-textColor  border-2 border-textColor hover:text-hoverColor hover:border-hoverColor rounded-2xl py-0.5 px-1 lg:px-4 bg-secondColor">{text}</Link>
}
export function ClickButton(text:string,onClick:any){
        return <div onClick={onClick} className="flex center text-3xs lg:text-xl text-nowrap font-mt-bold text-textColor  border-2 border-textColor hover:text-hoverColor hover:border-hoverColor rounded-2xl py-0.5 px-1 lg:px-4 bg-secondColor">{text}</div>
}
type NavbarProps = {
    scrollRef:React.RefObject<HTMLInputElement>;
    onContact: Dispatch<SetStateAction<any>>
}
const Navbar = ({scrollRef,onContact}:NavbarProps) => {
    const isMobile = window.screen.width < 600;
    
    const [background, setBackground] = useState("bg-transparent");
    const location = useLocation()
    const [cookies,setCookies] = useCookies<"user",UserProps>(["user"])
    
    useEffect(() => {
        if (location.pathname === "/expos" || location.pathname === "/apropos" || location.pathname === "/messages" || location.pathname==="/contact" ||  /^\/admin(\/.*)?$/.test(location.pathname)) {
            setBackground("bg-mainColor");
            return;
        }else{
            setBackground("bg-transparent")
        }

        const el = scrollRef.current;
        if (!el) return;

        const handleScroll = () => {
            const pos = el.scrollTop;
            if (pos < (isMobile ? 320 : 520)) {
            setBackground("bg-transparent");
            } else {
            setBackground("bg-mainColor transition-mainColor duration-300");
            }
        };

        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, [location.pathname, scrollRef]);

    const element = useMemo(()=>{
        if(cookies && cookies.user && cookies.user.isLogin &&  /^\/admin(\/.*)?$/.test(location.pathname)){
            return <div className="flex gap-2 lg:gap-10">
                {LinkButton("Admin  : Expositions","/admin/expos")}
                {LinkButton("Admin  : Tableaux","/admin/tableaux")}
                {LinkButton("Création tableau","/admin/tableau/create")}
            </div>
        }else{
            return <div className="flex gap-2 lg:gap-20">
                {LinkButton("Mes expositions","/expos")}
                {LinkButton("Portrait","/apropos")}
                {isMobile ? LinkButton("Contact","/contact"):ClickButton("Contact",onContact)}
                {LinkButton("Commentaires","/messages")}
                
            </div>
        }
    },[cookies,location.pathname])
    return (
        <div className={`w-full flex center ${background}`}>
        <div className={`flex flex-row justify-between p-2 w-[98%] lg:w-[90%] `}>
            <Link to="/"  className="text-xs lg:text-4xl font-mt-bold text-darkBlue ">{true ? "Guillaume Barnabé":""}</Link>
            {element}
        </div>
        </div>
    )
}

export default Navbar