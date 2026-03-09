import TextComponent from "../components/TextComponents";
import { Button, colors } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLoginContext } from "../context/userApiContext";
import SecurityScore from "../components/SecurityScore";
import { passwordValidation } from "../utils/passwordValidation";
import { useTheme } from "../context/themeContext";
import {ConditionPassword} from '../components/conditionPassword'

export default function UpdatePassword ({hidden}) {
        const {colors}=useTheme()
        const isMobile = useMediaQuery("(max-width: 720px)");
        const navigate=useNavigate()
    const {
    handelUpdatePassword,
    updatePassword,
    setUpdatePassword,
    isLaoding
    
    }=useLoginContext()
    return (
        <div 
        style={{
            width:!hidden&&isMobile?'100vw':'50vw',
            height: 'fit-content',
            display:hidden?'none':'flex',
            justifyContent:'center',
            alignItems:'center',
            position:'absolute',
            right:'0',
            top:'0',
            paddingBottom:'20px'

        }}
        >
            <div
             style={{
            width:!hidden&&isMobile?'90vw':'35vw',
            minHeight: '100vh',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:"column",
            gap:"10px",
             }}
            >
            <h1 style={{marginTop:'20%',marginBottom:'20px',fontWeight:'600'}} >Create new password🔒</h1>
             <TextComponent label={'Password'} placeholder={'Enter your Password here'} width={'100%'} value={updatePassword} setValue={setUpdatePassword} isPassword={true} />
            <TextComponent label={'Confirm Password'} placeholder={'Repeat your password'} width={'100%'} value={updatePassword} setValue={setUpdatePassword} isPassword={true} />
            <div style={{width:'100%',}}>
                 <p style={{width:'100%',fontSize:'12px',fontWeight:'500',color:'gray'}} >Use 8+ chars with letters, numbers, and symbols.</p>
                <SecurityScore score={passwordValidation(updatePassword)} />
             </div>
             <div style={{width:'100%'}} >
                <ConditionPassword password={updatePassword} />
             </div>


            <Button 
            variant="contained"
            sx={{
                background:colors.primary,
                borderRadius:'10px',
                padding:'10px 25px',
                marginTop:'30px',
                width:'100%'
            }}
            onClick={handelUpdatePassword}
            >{isLaoding?<div class="loader"></div>:'Update Password'}</Button>
            <p style={{color:colors.textSecondary,fontWeight:'500',fontSize:'18px'}} >uddenly remembered?<span style={{fontWeight:'700',cursor:'pointer',color:colors.primary}}  onClick={()=>{navigate('/login')}} > Sign In instead</span></p>
            </div>
        </div>
    )
}