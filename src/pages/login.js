import { useState } from "react";
import TextComponent from "../components/TextComponents";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";



export default function Login ({hidden}) {
    const isMobile = useMediaQuery("(max-width: 720px)");
    const navigate=useNavigate()
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
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
            width:!hidden&&isMobile?'80vw':'35vw',
            height:'90vh',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:"column",
            gap:"10px"
             }}
            >
            <h1 style={{marginTop:'20%',marginBottom:'20px'}} >Login</h1>
            <TextComponent label={'Username'} placeholder={'Enter your username here'} width={'100%'} value={userName} setValue={setUserName} />
            <TextComponent label={'Password'} placeholder={'Enter your password here'} width={'100%'} value={password} setValue={setPassword} />
            <Button variant="contained"
            sx={{
                background:'#8371f9',
                borderRadius:'35px',
                padding:'10px 25px',
                marginTop:'30px'
            }}
            >Login</Button>
            <p>Don't have an account?<span style={{fontWeight:'700',cursor:'pointer'}} onClick={()=>{navigate('/sing')}} > Sign up</span></p>
            <p className="separeOR" >OR</p>
            <div style={{
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