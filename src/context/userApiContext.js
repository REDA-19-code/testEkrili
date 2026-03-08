import { createContext, use, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDataContext } from "./dataContext";
// 1. إنشاء Context
const MyContext = createContext();

// 2. إنشاء Provider
export const LoginProvider = ({ children }) => {
  const location=useLocation()
  //-----
  const {saveToken,token}=useDataContext()
  const [errer,setErrer]=useState({
    message:'',
    type:''
  })
  //----
  useEffect(()=>{
    setErrer({})
  },[location.pathname])

  //login api
  const navigate=useNavigate()
    const apiUrl = process.env.REACT_APP_API_URL;
    const [userNameLogin,setUserNameLogin]=useState('')
    const [passwordLogin,setPasswordLogin]=useState('')
    const [isLaoding,setIsLaoding]=useState(false)

const handeLogin = async (userNameLogin, passwordLogin) => {
    setIsLaoding(true)
  try {
    const response = await axios.post(`${apiUrl}/user/login`, {
      email: userNameLogin.trim(),
      password: passwordLogin
    });

    console.log("Login Success:", response.data);
    navigate("/")
    saveToken(response.data.token)
    setEmailVerify(email)
  } catch (error) {
    console.error("Login Failed:", error.response?.data || error.message);
    setErrer( error.response?.data)
    console.log(errer)
  }finally{
    setIsLaoding(false)
  }
};
//-------

//register api 
    const [FirstameRegister,setFirstNameRegister]=useState('')
    const [passwordRegister,setPasswordRegister]=useState('')
    const [LastNameRegister,setLastNameRegister]=useState('')
    const [numberRegister,setNumberRegister]=useState('')
    const [email,setEmail]=useState('');
    const [isOwner,setIsOwner]=useState(false)
    const handeLRegister = async () => {
    
    setIsLaoding(true)
  try {
    const response = await axios.post(`${apiUrl}/user/register`, {
       name:FirstameRegister.trim(), 
       famillyname:LastNameRegister.trim(), 
       password:passwordRegister,
      phone:numberRegister.trim(),
      email,
      isLessor:isOwner
    });

    console.log("creat accont Success:", response.data);
    navigate('/verify',{ state: { email} })
    setEmailVerify(email)
  } catch (error) {
    console.error("Login Failed:", error.response?.data || error.message);
    setErrer( error.response?.data)
    console.log(errer)
  }finally{
    setIsLaoding(false)
  }
};

//-------
//verify email 
const [code,setCode]=useState(Array(6).fill(""))
const [emailVerify,setEmailVerify]=useState('')

const handelVerify=async ()=>{
  const finalCode = code.join("");
  try {
    const response = await axios.post(`${apiUrl}/user/verify`, {
      email:emailVerify,
      code:finalCode
    });
    console.log(response.data)
    navigate('/')

}catch (error) {
console.error( error.response?.data || error.message);
}
}

const handelSendCode=async()=>{
  const response = await axios.post(`${apiUrl}/user/send-code`, {
      email:emailVerify,
    });
    console.log(response.data)
}

  const value = {
    handelVerify,
    handelSendCode,
    code,
    setCode,
    handeLogin,
    userNameLogin,
    setUserNameLogin,
    passwordLogin,
    setPasswordLogin,
    isLaoding,
    FirstameRegister,
    passwordRegister,
    LastNameRegister,
    numberRegister,
    handeLRegister,
    setFirstNameRegister,
    setNumberRegister,
    setLastNameRegister,
    setPasswordRegister,
    email,
    setEmail,
    isOwner,
    setIsOwner,
    errer,
    emailVerify

    };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};


export const useLoginContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext يجب أن يستخدم داخل MyProvider");
  }
  return context;
};
