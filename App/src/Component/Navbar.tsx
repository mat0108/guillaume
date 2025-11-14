import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
export function LinkButton(text:string,to:string){
        return <Link to={to} className="flex center text-2xs lg:text-xl text-nowrap font-mt-bold text-textColor  border-2 border-textColor hover:text-hoverColor hover:border-hoverColor rounded-2xl px-1 lg:px-4 bg-secondColor">{text}</Link>
}

const Navbar = () => {
    const isMobile = window.screen.width < 600;
    
    const [background, setBackground] = useState("bg-transparent");
    const location = useLocation()
    useEffect(() => {
        console.log(location)
        if(location.pathname === '/expos'){setBackground("bg-mainColor");}else{
            setBackground("bg-transparent")
        }
        const el = document.getElementById("scrollbar");
        if (!el || location.pathname === '/expos') return;

        const handleScroll = () => {
            const pos = el.scrollTop;
            if (pos < 520) {
                setBackground("bg-transparent");
            } else {
                setBackground(`bg-mainColor transition-mainColor duration-300`);
            }
            };

            el.addEventListener("scroll", handleScroll);
            return () => el.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);
    return (
        <div className={`w-full flex center ${background}`}>
        <div className={`flex flex-row justify-between p-2 w-[98%] lg:w-[90%] `}>
            <Link to="/"  className="text-base lg:text-4xl font-mt-bold text-darkBlue ">{true ? "Guillaume Barnabé":""}</Link>
            <div className="flex gap-2 lg:gap-20">
                {LinkButton("Mes expositions","/expos")}
                {LinkButton("Qui je suis","/")}
            </div>
        </div>
        </div>
    )
}

export default Navbar