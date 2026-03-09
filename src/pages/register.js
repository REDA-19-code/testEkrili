import TextComponent from "../components/TextComponents";
import { Button, colors } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLoginContext } from "../context/userApiContext";
import { isValidAlgerianPhone } from "../utils/phonValidation";
import ChickType from "../components/chickType";
import SecurityScore from "../components/SecurityScore";
import { passwordValidation } from "../utils/passwordValidation";
import { useTheme } from "../context/themeContext";
import {ConditionPassword} from '../components/conditionPassword'


export default function Register ({hidden}) {
        const {colors}=useTheme()
        const isMobile = useMediaQuery("(max-width: 720px)");
        const navigate=useNavigate()
    const {
    LastNameRegister,
    FirstameRegister,
    numberRegister,
    setLastNameRegister,
    setNumberRegister,
    setFirstNameRegister,
    isOwner,
    setIsOwner,
    email,
    setEmail,
    passwordRegister,
    setPasswordRegister,
    handeLRegister,
    errer,
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
            height: 'fit-content',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:"column",
            gap:"10px",
             }}
            >
            <h1 style={{marginTop:'20%',marginBottom:'20px',fontWeight:'600'}} >Create your account</h1>
            <ChickType value={isOwner} setValue={setIsOwner} />
            <div style={{display:'flex',justifyContent:'space-around',width:'100%'}} >
                <TextComponent label={'First name'} placeholder={'nouro'} width={'45%'} value={FirstameRegister} setValue={setFirstNameRegister} />
                <TextComponent label={'Last name'} placeholder={'Allou'} width={'45%'} value={LastNameRegister} setValue={setLastNameRegister} />
            </div>
            <TextComponent label={errer.type==='email'?errer.message:'Email adress'} placeholder={'Enter your email here'} width={'100%'} value={email} setValue={setEmail} isValid={errer.type !=='email'} />
            <TextComponent label={'Number phone'} placeholder={'Enter your Number here'} width={'100%'} value={numberRegister} setValue={setNumberRegister} />
             <p style={{width:'100%',fontSize:'12px',fontWeight:'500',color:'gray'}} >Your phone number must begin with +213 (+9 digits)</p>


             <TextComponent label={'Password'} placeholder={'Enter your Password here'} width={'100%'} value={passwordRegister} setValue={setPasswordRegister} isPassword={true} />
             <div style={{width:'100%',}}>
                 <p style={{width:'100%',fontSize:'12px',fontWeight:'500',color:'gray'}} >Use 8+ chars with letters, numbers, and symbols.</p>
                <SecurityScore score={passwordValidation(passwordRegister)} />
             </div>
             <div style={{width:'100%'}}>
                <ConditionPassword password={passwordRegister} />
             </div>
            <TextComponent label={'Confirm Password'} placeholder={'Repeat your password'} width={'100%'} value={passwordRegister} setValue={setPasswordRegister} isPassword={true} />


            <Button 
            variant="contained"
            disabled={ !FirstameRegister ||!LastNameRegister ||!isValidAlgerianPhone(numberRegister)||passwordValidation(passwordRegister)<4}
            sx={{
                background:colors.primary,
                borderRadius:'10px',
                padding:'10px 25px',
                marginTop:'30px',
                width:'100%'
            }}
            onClick={handeLRegister}
            >
                {isLaoding?<div class="loader"></div>:'create account'}
            </Button>
            <p>Already have accont?<span style={{fontWeight:'700',cursor:'pointer',color:colors.primary}}  onClick={()=>{navigate('/login')}} > Login</span></p>
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