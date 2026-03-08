import TextVerify from "../components/textVerifyComponent";
import {  Button, useMediaQuery } from "@mui/material";
import { useTheme } from "../context/themeContext";
import { useState, useEffect } from "react";
import { RiResetLeftLine } from "react-icons/ri";
import { IoChevronBackOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLoginContext } from "../context/userApiContext";
export  function TimerResend({ initialSeconds = 59, onResend }) {
  const {colors}=useTheme()
  const [seconds, setSeconds] = useState(initialSeconds);
  const canResend = seconds === 0;

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const handleResend = () => {
    if (!canResend) return;
    setSeconds(initialSeconds);
    onResend?.();
  };

  return (
    <p style={{ fontSize: 17, color: "#6b7280",  }}>
      Didn't receive the code?{" "}
      <span
        onClick={handleResend}
        style={{
          color:colors.primary ,
          fontWeight: 700,
          cursor: canResend ? "pointer" : "default",
          opacity: canResend ? 1 : 0.3,
          textDecoration: "none",
        }}
      >
        Resend Code
      </span>
      {!canResend && (
        <span style={{ color: "#9ca3af" }}> ({seconds}s)</span>
      )}
    </p>
  );
}

export  function ShieldIcon({ size = 72 }) {
  const inner = size * 0.72;
  const {colors}=useTheme()
  return (
    
      <div style={{
        width: inner,
        height: inner,
        borderRadius: "50%",
        background: "#ffffff",
        boxShadow: "0 4px 18px rgba(37, 100, 235, 0.16), 0 1px 4px rgba(0,0,0,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <svg width={size * 0.32} height={size * 0.32} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L4 5.5V11c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5.5L12 2z"
            stroke={colors.primary}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M9 12l2 2 4-4"
            stroke={colors.primary}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

  );
}


export default function VerifyPage() {
    const {code,setCode,emailVerify,handelSendCode,handelVerify}=useLoginContext()

  const location=useLocation()
  const navigate=useNavigate()
  const isMobile = useMediaQuery("(max-width: 720px)");
  const {colors}=useTheme()
const prevPath = location.state?.from;

const handleNavigate = () => {
  if (prevPath && prevPath.startsWith("/rest")) {
    navigate("/rest/password");
  } else {
    navigate("/");
  }
};


  return (
    <div
      style={{
        width: isMobile ? "100vw" : "50vw",
        height: "100vh",
        display: "flex",           // مهم
        justifyContent: "center",  // توسيط أفقي
        alignItems: "center",      // توسيط عمودي
        position: "absolute",
        right: 0,
        top: 0,
      }}
    >
      <div
        style={{
          width: isMobile ? "90%" : "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px"
        }}
      >
        <ShieldIcon size={100} />
        <div style={{
          width:'80%',
          textAlign:'center',
        }} >
          <h1>Verify your email ✨</h1>
          <p style={{
            color:colors.textSecondary,
            lineHeight:'1',
            marginBottom:'30px'
          }} >Enter the verification code we just sent to your inbox to
complete your registration.</p>
       <div
        style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 18px",
      borderRadius: 20,
      border: `2px solid ${colors.primary}`,
      background: "#f0f5ff",
    }}>
      <span style={{
        width: 8, height: 8,
        borderRadius: "50%",
        background: colors.primary,
        flexShrink: 0,
      }} />
      <span style={{
        fontSize: 17,
        color: colors.primary,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 700,
        letterSpacing: "0.1px",
      }}>
        {emailVerify}
      </span>
    </div>
        </div>

        <TextVerify values={code} setValues={setCode} />
        <TimerResend onResend={handelSendCode} initialSeconds={10} />
        <Button
        onClick={handelVerify}
         sx={{color:'white',background:colors.primary,width:'100%',fontSize:'17px',fontWeight:'500',borderRadius:'15px'}} >
          verify email 
        </Button>
        <p className="separeOR" >OR</p>
        <p
        onClick={()=>{navigate(-1)}}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",               // مسافة بين الأيقونة والنص
            color: colors.textSecondary,
            cursor: "pointer"         // ليبدو قابلاً للنقر
          }}
        >
          <RiResetLeftLine />
          Change email address
        </p>
        <p
        onClick={()=>{navigate(-1)}}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",               // مسافة بين الأيقونة والنص
              color: colors.textSecondary,
              cursor: "pointer"         // ليبدو قابلاً للنقر
            }}
          >
            <IoChevronBackOutline/> Back to Register
          </p>

      </div>
    </div>
  );
}