import { useState,useEffect } from "react"
import { useLocation } from "react-router-dom"
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "../context/themeContext";
import TestimonialCard from "./TestimonialCard";
import StatsBar from "./analysisCard";
import FeaturesList from "./FeaturesList";
import StepIndicator from "./stepIndecater";

export  function MailVerifiedIcon({ size = 110 }) {
  const badge = size * 0.32;
const {colors}=useTheme()
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {/* Outer soft circle */}
      <div style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(210, 220, 245, 0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {/* Inner white circle */}
        <div style={{
          width: size * 0.78,
          height: size * 0.78,
          borderRadius: "50%",
          background: "#ffffff",
          boxShadow: "0 8px 28px rgba(37,99,235,0.12), 0 2px 8px rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {/* Mail icon */}
          <svg width={size * 0.38} height={size * 0.38} viewBox="0 0 24 24" fill="none">
            <rect x="2" y="4" width="20" height="16" rx="3" stroke={colors.primary} strokeWidth="2"/>
            <path d="M2 7l10 7 10-7" stroke={colors.primary}  strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Blue check badge */}
      <div style={{
        position: "absolute",
        top: size * 0.04,
        right: size * 0.04,
        width: badge,
        height: badge,
        borderRadius: "50%",
        background: colors.primary ,
        border: "2.5px solid #fff",
        boxShadow: "0 2px 8px rgba(37,99,235,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <svg width={badge * 0.55} height={badge * 0.55} viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}


export default function LogInAndRegister() {

    //كود عمل overly 
    const {colors}=useTheme()
    const location = useLocation();
const isMobile = useMediaQuery("(max-width: 720px)");
const [index,setIndex] = useState(() => {
  if (location.pathname.startsWith("/verify")) return "verify"
  if (location.pathname.startsWith("/login")) return "login"
  if (location.pathname.startsWith("/register")) return "register"
  if (location.pathname.startsWith("/rest")) return "rest"
  return "login"
})
useEffect(() => {
  if (location.pathname.startsWith("/verify")) setIndex("verify")
  else if (location.pathname.startsWith("/login")) setIndex("login")
  else if (location.pathname.startsWith("/register")) setIndex("register")
  else if (location.pathname.startsWith("/rest")) setIndex("rest")
}, [location.pathname])

    const message = {
    login: {
            title: (
    <>
      Find the <span style={{color:colors.primary,fontStyle: 'italic'}} >Perfect Space</span> for your next chapter.
    </>
  ),
    description: `Join 50,000+ people discovering premium rentals
and managing properties with ease on SakniNow.`
        },
        register: {
            title: (
    <>
      Start Your <span style={{color:colors.primary,fontStyle: 'italic'}} >Home Journey</span> today.
    </>
  ),
            description: `reate your free account and join thousands of verified tenants
and owners on SakniNow. Your dream space is just a click away.`
        },
        verify: {
            title: (
    <>
      Check your inbox
    </>
  ),
            description: `We've sent a 6-digit verification code to`
        },
        rest: {
            title: (
    <>
      Reset Your <span style={{color:colors.primary,fontStyle: 'italic'}} >Password</span> in seconds.
    </>
  ),
            description: `Don't worry, it happens to
everyone. We'llsend you a
secure link to reset your
password right away.`
        },
    };

    
    //-------
    return (

           <div style={{position:'fixed',width:'50vw',height:'100vh'}} >
             <div className="overly" 
            style={{
                background:colors.overlyBackground,
                display:isMobile?'none':'flex',

            }}
            >
            <img
          src={'/images/photo_2026-02-13_01-10-24-removebg-preview.png'}
          alt="preview"
          style={{
            width: "150px",
            marginTop:'10px',
            position:'absolute',
            top:'0px',
            left:'10px'
          }}
        />
            <div className={'overly-continer'} >
          {location.pathname.startsWith("/verify")?<MailVerifiedIcon size={120}/>:null}
        <h1>{message[index].title}</h1>
        <p className="description" style={{color:colors.textSecondary}} >{message[index].description}</p>
        
       {location.pathname.startsWith("/login")||location.pathname.startsWith("/rest")?null: <FeaturesList option={location.pathname.startsWith("/verify"?1:0)} />}
      {location.pathname.startsWith("/rest")?<StepIndicator  />:null}
        <TestimonialCard name={'Allou Nour Ellah'} text={'"Listed my apartment and found a tenant in less than \naweek. Highlyrecommend!"'}/>
        
            </div>
            <StatsBar/>
            <img src="/images/house1.jpg" style={{width:'100%',bottom:'0',left:"0",position:'absolute',zIndex:'-2',opacity:0.3,height:"30%"}} alt="" />
            </div>
  
           </div>
    )
}