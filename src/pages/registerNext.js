import { useState } from "react";
import TextComponent from "../components/TextComponents";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import Back from "../components/backPage";
import { useLoginContext } from "../context/userApiContext";

export default function RegisterNext ({hidden}) {
        const isMobile = useMediaQuery("(max-width: 720px)");
        const navigate=useNavigate()
    const [password,setPassword]=useState('')
    const {setPasswordRegister,passwordRegister,isLaoding,handeLRegister}=useLoginContext();
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
            gap:"10px",
            position:'relative'
             }}
            >
            <Back style={{position:'absolute',left:'0',top:'10px'}} />
            <h1 style={{marginBottom:'20px'}} >Create your password</h1>
            <TextComponent label={'Password'} placeholder={'Enter your password here'} width={'100%'} value={passwordRegister} setValue={setPasswordRegister} />
            <TextComponent label={'confirm Password'} placeholder={'Enter your password here'} width={'100%'} value={password} setValue={setPassword} />

            <Button variant="contained"
            onClick={handeLRegister}
            disabled={
            password !== passwordRegister ||
            passwordRegister.length < 6
            }
            sx={{
                background:'#8371f9',
                borderRadius:'35px',
                padding:'10px 25px',
                marginTop:'30px'
            }}
            >
                {isLaoding?<div class="loader"></div>:'Sign up'}
            </Button>
            
            </div>
        </div>
    )
}