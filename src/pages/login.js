import TextComponent from "../components/TextComponents";
import { Button,  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLoginContext } from "../context/userApiContext";
import { useTheme } from "../context/themeContext";


export default function Login ({hidden}) {
    const {colors}=useTheme()
    const isMobile = useMediaQuery("(max-width: 720px)");
    const navigate=useNavigate()
    const {handeLogin,userNameLogin,setUserNameLogin,passwordLogin,setPasswordLogin,isLaoding,errer}=useLoginContext()
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
            <div style={{width:'100%',lineHeight:'0.9',marginBottom:'40px'}} >
                <h1 style={{marginTop:'20%',marginBottom:'20px',fontWeight:'600'}} >Welcome back 👋</h1>
                <p style={{
                    color:colors.textSecondary,fontWeight:'400'
                }} >Please enter your details to sign in.</p>
            </div>
            <TextComponent
                label={errer.type==='email'?errer.message:'Email adress'}
                placeholder={'Enter your email here'} 
                width={'100%'} value={userNameLogin} 
                setValue={setUserNameLogin} 
                isValid={errer.type!=='email'}
            />


            <div style={{position:'relative',width:'100%',marginTop:'10px'}} >
                <p 
                style={{position:'absolute',
                top:'0',
                right:'0',
                fontWeight:'700',
                color:colors.primary,
                cursor:'pointer'
            }}
                onClick={()=>{navigate("/rest/forget")}}
                >forget password?</p>
                <TextComponent
                label={errer.type==='password'?errer.message:'password'}
                placeholder="Enter your password"
                value={passwordLogin}
                setValue={setPasswordLogin}
                width="100%"
                isPassword={true}
                isValid={errer.type!=='password'}
                
                />
            </div>
     <Button 
     disabled={!userNameLogin || !passwordLogin}
  variant="contained"
  sx={{
    background:colors.primary,
    borderRadius:'10px',
    padding:'10px 25px',
    marginTop:'30px',
    height:'40px',
    width:'100%'
  }}
  onClick={() => handeLogin(userNameLogin, passwordLogin)} // ✅ تمرير القيم
>
  {isLaoding?<div className="loader"></div>:'login'}
</Button>

            <p>Don't have an account?<span style={{fontWeight:'700',cursor:'pointer',color:colors.primary}} onClick={()=>{navigate('/register')}} > Sign up</span></p>
            <p className="separeOR" >OR</p>
            <div
             style={{
                width:'100%',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                borderRadius:'20px',
                height:'50px',
                border:'1px solid gray',
                gap:'10px'
                
            }}>
                <img src="./images/3942a85ff2d1bf0528c1f464d18d2eaca7bbb8ed.png" alt="" style={{width:'30px'}} />
                <p style={{
                    color:colors.textPrimary,fontWeight:'600'
                }}  >Sing in with Google</p>
            </div>
            </div>
        </div>
    )
}
