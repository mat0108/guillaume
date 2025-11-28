import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { UserProps } from "./Admin_main";

const Check_Connect = ()=>{
    const [cookies,setCookies] = useCookies<"user",UserProps>(["user"])
    const navigate = useNavigate();
    useEffect(()=>{
        if(!(cookies && cookies.user && cookies.user.isLogin)){
            navigate("/admin")     
        }
    },[])
}

export default Check_Connect