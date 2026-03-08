import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "./dataContext";
// 1. إنشاء Context
const MyContext = createContext();

// 2. إنشاء Provider
export const LoginProvider = ({ children }) => {
  //-----
  const {saveToken, saveDisplayName, saveUserRole, saveUserAvatar, token}=useDataContext()
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
    const response = await axios.post(`${apiUrl}/users/login`, {
      userName: userNameLogin,
      password: passwordLogin
    });

    console.log("Login Success:", response.data);
    navigate("/")
    saveToken(response.data.token)
    saveDisplayName(response.data?.name || response.data?.user?.name || userNameLogin)
    saveUserRole(
      response.data?.role ||
      response.data?.user?.role ||
      response.data?.userType ||
      response.data?.user?.userType ||
      response.data?.accountType ||
      response.data?.user?.accountType ||
      ""
    )
    saveUserAvatar(
      response.data?.profileImage ||
      response.data?.user?.profileImage ||
      response.data?.avatar ||
      response.data?.user?.avatar ||
      response.data?.image ||
      response.data?.user?.image ||
      ""
    )

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
    const response = await axios.post(`${apiUrl}/users/register`, {
       name:nameRegister, 
       userName:userNameRegister, 
       password:passwordRegister,
      numberPhone:numberRegister
    });

    console.log("creat accont Success:", response.data);
        saveToken(response.data.token)
        saveDisplayName(response.data?.name || response.data?.user?.name || nameRegister || userNameRegister)
        saveUserRole(
          response.data?.role ||
          response.data?.user?.role ||
          response.data?.userType ||
          response.data?.user?.userType ||
          response.data?.accountType ||
          response.data?.user?.accountType ||
          ""
        )
        saveUserAvatar(
          response.data?.profileImage ||
          response.data?.user?.profileImage ||
          response.data?.avatar ||
          response.data?.user?.avatar ||
          response.data?.image ||
          response.data?.user?.image ||
          ""
        )
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
  const [userName]=useState(null)
  const [name]=useState(null)
  const handelUpdate=async()=>{
    setIsLaoding(true)
  try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("userName", userName);
      formData.append("profileImage", profileImage);
      const response = await axios.put(
        `${apiUrl}/users/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, 
          },
        }
      );

console.log("update account Success:", response.data);
saveToken(response.data.token);
saveDisplayName(response.data?.name || response.data?.user?.name || name || userName || "");
saveUserRole(
  response.data?.role ||
  response.data?.user?.role ||
  response.data?.userType ||
  response.data?.user?.userType ||
  response.data?.accountType ||
  response.data?.user?.accountType ||
  ""
);
saveUserAvatar(
  response.data?.profileImage ||
  response.data?.user?.profileImage ||
  response.data?.avatar ||
  response.data?.user?.avatar ||
  response.data?.image ||
  response.data?.user?.image ||
  ""
);

        navigate("/")

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
    profileImage,
    handelUpdate

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
