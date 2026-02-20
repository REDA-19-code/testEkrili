import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import Back from "../components/backPage";
import { useLoginContext } from "../context/userApiContext";
import Uplaod from "../components/uplaod";
import { Button } from "@mui/material";

export default function UplaodImage ({hidden}) {
        const isMobile = useMediaQuery("(max-width: 720px)");
        const {profileImage,setProfileImage,handelUpdate}=useLoginContext()
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
            justifyContent:"space-around",
            alignItems:'center',
            flexDirection:"column",
            position:'relative',
                    textAlign:"center"

             }}
            >
            <Back style={{position:'absolute',left:'0',top:'10px'}} />
            <h1 style={{marginTop:"10px"}} >Your avatar is ready</h1>
             <Uplaod image={profileImage} setImage={setProfileImage} />
             <div style={{
                width:"100%",
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center"
             }} >
                <Button 
                    sx={{
                        background:'transperant',
                        borderRadius:'35px',
                        padding:'10px 25px',
                        marginTop:'30px',
                        height:'40px',
                        color:"#8371f9"
                    }}
                 >
                    cancel 
                </Button>
                <Button
                onClick={handelUpdate}
                disabled={!profileImage}
                variant="contained"
                sx={{
                    background:'#8371f9',
                    borderRadius:'35px',
                    padding:'10px 25px',
                    marginTop:'30px',
                    height:'40px,'
                }}
                >
                    Next
                </Button>
             </div>


            </div>
        </div>
    )
}