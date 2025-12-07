import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
const verif_login = import.meta.env.VITE_ADMIN_LOGIN;
const verif_password = import.meta.env.VITE_ADMIN_PASSWORD;
const AdminLogin = () => {
    const [login,setLogin] = useState<string | undefined>("") 
    const [password,setPassword] = useState<string |  undefined>("")
    const [cookies,setCookies] = useCookies();
    const navigate = useNavigate();
    useEffect(()=>{
        console.log('cookies : ', cookies)
        if(cookies && cookies.user && cookies.user.isLogin){
            navigate("/admin/main")
        }
    },[cookies])
    function Login(){
        if(login === verif_login && password === verif_password){
            setCookies("user", {isLogin:true}, { path: "/" , maxAge: 14 * 24 * 60 * 60});
            navigate("/admin/main")
        }else{
            toast.warning("Mauvais login ou password")
        }
    }    
    return (<div className="w-screen h-screen flex center bg-mainColor">
        <div className="flex center flex-col bg-spaceBlue text-white gap-4 p-4 rounded-3xl">
            <div className="flex flex-col p-2 ">
                <p>Identifiant</p>
                <input type={"username"} id="username" className="w-[200px] h-[50px] bg-delftBlue rounded-xl" placeholder="Votre identifiant" value={login} onChange={e=>setLogin(e.target.value)}/>
            </div>    
            <div className="flex flex-col p-2 ">
                <p>Mot de passe</p>
                <input type="password" id="password" className="w-[200px] h-[50px] bg-delftBlue rounded-xl" placeholder="Votre identifiant" value={password} onChange={e=>setPassword(e.target.value)}/>
            </div>   
            <div className="w-[150px] h-[50px] bg-lightBlue rounded-xl flex center font-mt-bold" onClick={()=>Login()}>
                Se connecter
            </div>
        </div>
    </div>)
}
export default AdminLogin;