import { useState,useEffect } from "react"
import { useLocation } from "react-router-dom"
import useMediaQuery from "@mui/material/useMediaQuery";

export default function LogInAndRegister() {
    //كود عمل overly 
    const location = useLocation();
const isMobile = useMediaQuery("(max-width: 720px)");

const [isLogin, setIsLogin] = useState(!location.pathname.startsWith("/login"));
        useEffect(() => {
        setIsLogin(!location.pathname.startsWith("/login"));
        }, [location.pathname]);
    const message = {
    login: {
            title: "Welcome back",
            description: "Log in to access your account and continue where you left off."
        },
        register: {
            title: "Welcome aboard",
            description: "Create your account and start your journey with us in seconds."
        }
    };


    //-------
    return (

            <div className="overly" 
            style={{
                left: isLogin ?'5vw':'55vw',
                display:isMobile?'none':'flex',

            }}
            >
            <div className={'overly-continer'} >
                <img
          src={'/images/photo_2026-02-13_01-10-24-removebg-preview.png'}
          alt="preview"
          style={{
            width: "200px",
            
            marginTop:'20px',

          }}
        />
        <h1>{location.pathname.startsWith("/login")?message.login.title:message.register.title}</h1>
        <p className="description" >{location.pathname.startsWith("/login")?message.login.description:message.register.description}</p>
            </div>
            </div>

    )
}