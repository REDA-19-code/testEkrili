import TextComponent from "../components/TextComponents";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLoginContext } from "../context/userApiContext";
import { isValidAlgerianPhone } from "../utils/phonValidation";



export default function Register ({hidden}) {

        const isMobile = useMediaQuery("(max-width: 720px)");
        const navigate=useNavigate()
    const {
    userNameRegister,
    nameRegister,
    numberRegister,
    setUserNameRegister,
    setNumberRegister,
    setNameRegister,
    }=useLoginContext()
    return (
        <div 
        style={{
            width:!hidden&&isMobile?'100vw':'50vw',
            height:'100vh',
            display:hidden?'none':'flex',
            justifyContent:'center',
            alignItems:'center',
            position:'absolute',
            right:'0'
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
            <h1 style={{marginTop:'10%',marginBottom:'20px'}} >Sign up</h1>
            <TextComponent label={'Full name'} placeholder={'Enter your name here'} width={'100%'} value={nameRegister} setValue={setNameRegister} />
            <TextComponent label={'Username'} placeholder={'Enter your username here'} width={'100%'} value={userNameRegister} setValue={setUserNameRegister} />
            <TextComponent label={'Number phone'} placeholder={'Enter your username here'} width={'100%'} value={numberRegister} setValue={setNumberRegister} />
             <p style={{width:'100%',fontSize:'12px',fontWeight:'500',color:'gray'}} >Your phone number must begin with +213 (+9 digits)</p>
            <Button 
            variant="contained"
            disabled={ !userNameRegister ||!nameRegister ||!isValidAlgerianPhone(numberRegister)}
            sx={{
                background:'#8371f9',
                borderRadius:'35px',
                padding:'10px 25px',
                marginTop:'30px'
            }}
            onClick={()=>{navigate('/register/next')}}
            >Next</Button>
            <p>Already have accont?<span style={{fontWeight:'700',cursor:'pointer'}}  onClick={()=>{navigate('/login')}} > Login</span></p>
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