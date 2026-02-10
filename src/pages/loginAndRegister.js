import { useState,useEffect } from "react"
import Login from "./login"
import Register from "./register"
import { useLocation } from "react-router-dom"
import useMediaQuery from "@mui/material/useMediaQuery";

export default function LogInAndRegister() {
    //كود عمل overly 
    const location = useLocation();
const isMobile = useMediaQuery("(max-width: 720px)");

const [isLogin, setIsLogin] = useState(location.pathname !== "/login");

        useEffect(() => {
        setIsLogin(location.pathname !== "/login");
        }, [location.pathname]);

    //-------
    return (
        <div style={{
            width:'100vw',
            height:'100vh',
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        }} >
            <div className="overly" 
            style={{
                left: isLogin ?'5vw':'55vw',
                display:isMobile?'none':'block'
            }}
            
            >

            </div>
            <Login hidden={isLogin&&isMobile} />
        <Register hidden={!isLogin&&isMobile} />
        </div>
    )
}