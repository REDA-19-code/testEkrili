import TextComponent from "../components/TextComponents";
import { Button,  } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLoginContext } from "../context/userApiContext";
import { useTheme } from "../context/themeContext";

export function ShieldIcon({ size = 72, color = "#7c3aed" }) {
  const inner = size * 0.72;

  return (

      <div style={{
        width: inner,
        height: inner,
        borderRadius: "50%",
        background: "#ffffff",
        boxShadow: "0 4px 18px rgba(124,58,237,0.16), 0 1px 4px rgba(0,0,0,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <svg width={size * 0.32} height={size * 0.32} viewBox="0 0 24 24" fill="none">
          {/* Lock body */}
          <rect x="5" y="11" width="14" height="10" rx="2.5"
            stroke={color} strokeWidth="1.8" />
          {/* Lock shackle */}
          <path d="M8 11V7a4 4 0 018 0v4"
            stroke={color} strokeWidth="1.8"
            strokeLinecap="round" />
          {/* Keyhole dot */}
          <circle cx="12" cy="16" r="1.2" fill={color} />
        </svg>
      </div>
  );
}


export default function Forget ({hidden}) {
    const location=useLocation()
    const {colors}=useTheme()
    const isMobile = useMediaQuery("(max-width: 720px)");
    const navigate=useNavigate()
    const {handeLogin,userNameLogin,setUserNameLogin,passwordLogin,setPasswordLogin,isLaoding}=useLoginContext()
    return (
        <div 
        style={{
            width:!hidden&&isMobile?'100vw':'50vw',
            height:'100vh',
            display:hidden?'none':'flex',
            justifyContent:'center',
            alignItems:'center',
            right:'0',
            top:'0',
            position:'absolute'
        }}
        >
            <div
             style={{
            width:!hidden&&isMobile?'90vw':'35vw',
            height:'90vh',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:"column",
            gap:"10px"
             }}
            >
            <div style={{width:'100%',lineHeight:'0.9',marginBottom:'40px',textAlign:'center',display:'flex',justifyContent:'center',
                alignItems:'center',
                flexDirection:'column',
                gap:'20px'
            }} >
                <ShieldIcon color={colors.primary} size={100} />
                <h1 style={{fontWeight:'600'}} >Forgot your password?</h1>
                <p style={{
                    color:colors.textSecondary,fontWeight:'400'
                }} >Enter your email and we'll send you a reset link
to regain access to your account.</p>
            </div>
            <TextComponent label={'email'} placeholder={'Enter your email here'} width={'100%'} value={userNameLogin} setValue={setUserNameLogin} />
     <Button 
     
  variant="contained"
  sx={{
    background:colors.primary,
    borderRadius:'10px',
    padding:'10px 25px',
    marginTop:'30px',
    height:'40px',
    width:'100%'
  }}
  onClick={() => navigate("/rest/confirm", { state: { from: location.pathname } })} // ✅ تمرير القيم
>
  {isLaoding?<div class="loader"></div>:'send email'}
</Button>
<p className="separeOR" >OR</p>
<Button
  variant="outlined"
  sx={{
    color: colors.primary,
    borderRadius: "10px",
    padding: "10px 25px",
    marginTop: "30px",
    height: "40px",
    width: "100%",
    border:`2px solid ${colors.primary}`,
    fontWeight:'600'
  }}
  onClick={() => navigate('/login')}
>
  {isLaoding ? <div className="loader"></div> : "Back to login"}
</Button>
            </div>
        </div>
    )
}