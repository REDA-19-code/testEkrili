import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "./dataContext";
// 1. إنشاء Context
const MyContext = createContext();

// 2. إنشاء Provider
export const LoginProvider = ({ children }) => {
  //-----
  const {saveToken,token}=useDataContext()
  //----

  //login api
  const navigate=useNavigate()
    const apiUrl = process.env.REACT_APP_API_URL;
    const [userNameLogin,setUserNameLogin]=useState('')
    const [passwordLogin,setPasswordLogin]=useState('')
    const [isLaoding,setIsLaoding]=useState(false)

const handeLogin = async (userNameLogin, passwordLogin) => {
    setIsLaoding(true)
  try {
    // const response = await axios.post(`${apiUrl}/users/login`, {
    //   userName: userNameLogin,
    //   password: passwordLogin
    // });

    // console.log("Login Success:", response.data);
    navigate("/")
    // saveToken(response.data.token)

  } catch (error) {
    console.error("Login Failed:", error.response?.data || error.message);
  }finally{
    setIsLaoding(false)
  }
};
//-------

//register api 
    const [userNameRegister,setUserNameRegister]=useState('')
    const [passwordRegister,setPasswordRegister]=useState('')
    const [nameRegister,setNameRegister]=useState('')
    const [numberRegister,setNumberRegister]=useState('')
    const handeLRegister = async () => {
    
    setIsLaoding(true)
  try {
    // const response = await axios.post(`${apiUrl}/users/register`, {
    //    name:nameRegister, 
    //    userName:userNameRegister, 
    //    password:passwordRegister,
    //   numberPhone:numberRegister
    // });

    // console.log("creat accont Success:", response.data);
    //     saveToken(response.data.token)
        navigate("/register/next/uplaod")

  } catch (error) {
    console.error("Login Failed:", error.response?.data || error.message);
  }finally{
    setIsLaoding(false)
  }
};
//---------

//update api 
  const [profileImage,setProfileImage]=useState(null)
  const [userName,setUserName]=useState(null)
  const [name,setName]=useState(null)
  const handelUpdate=async()=>{
    setIsLaoding(true)
  try {
    // const response = await axios.put(`${apiUrl}/users/`, {
    //    name, 
    //    userName,
    //    profileImage 
    // });

    // console.log("update accont Success:", response.data);
    //     saveToken(response.data.token)
        navigate("/register/next/uplaod")

  } catch (error) {
    console.error("Login Failed:", error.response?.data || error.message);
  }finally{
    setIsLaoding(false)
  }

  }


//-------

  const value = {
    handeLogin,
    userNameLogin,
    setUserNameLogin,
    passwordLogin,
    setPasswordLogin,
    isLaoding,
    userNameRegister,
    passwordRegister,
    nameRegister,
    numberRegister,
    handeLRegister,
    setUserNameRegister,
    setNumberRegister,
    setNameRegister,
    setPasswordRegister,
    setProfileImage,
    profileImage

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
