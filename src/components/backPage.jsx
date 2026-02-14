import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function Back({style}){
    const navigate=useNavigate()
    return (
        <ArrowBackIcon onClick={()=>{navigate(-1)}} style={{...style,cursor:'pointer'}} />
    )
}