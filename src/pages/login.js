import TextComponent from "../components/TextComponents";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLoginContext } from "../context/userApiContext";



export default function Login ({hidden}) {
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
            alignItems:'center'
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
            <h1 style={{marginTop:'20%',marginBottom:'20px'}} >Login</h1>
            <TextComponent label={'Username'} placeholder={'Enter your username here'} width={'100%'} value={userNameLogin} setValue={setUserNameLogin} />
            <TextComponent label={'Password'} placeholder={'Enter your password here'} width={'100%'} value={passwordLogin} setValue={setPasswordLogin} />
     <Button 
    //  disabled={!userNameLogin || !passwordLogin}
  variant="contained"
  sx={{
    background:'#8371f9',
    borderRadius:'35px',
    padding:'10px 25px',
    marginTop:'30px',
    height:'40px,'
  }}
  onClick={() => handeLogin(userNameLogin, passwordLogin)} // ✅ تمرير القيم
>
  {isLaoding?<div class="loader"></div>:'login'}
</Button>

            <p>Don't have an account?<span style={{fontWeight:'700',cursor:'pointer'}} onClick={()=>{navigate('/register')}} > Sign up</span></p>
            <p className="separeOR" >OR</p>
            <div
             style={{
                width:!hidden&&isMobile?'80%':'60%',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                borderRadius:'20px',
                height:'50px',
                border:'1px solid gray',
                gap:'10px'
                
            }}>
                <img src="./images/3942a85ff2d1bf0528c1f464d18d2eaca7bbb8ed.png" alt="" style={{width:'40px'}} />
                <p>Sing in with Google</p>
            </div>
            </div>
        </div>
    )
}