import { Routes, Route,useLocation  } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Overly from "./components/overly";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "./components/PageWrapper";
import { LoginProvider } from "./context/userApiContext";
import { DataProvider } from "./context/dataContext";
import UplaodImage from "./pages/uplaodImage";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import NavBar from "./components/navBar";
import Add from "./pages/Add";
import Edit from './pages/Edit';
import { ThemeProvider } from "./context/themeContext";
import VerifyPage from "./pages/verify";
import Forget from "./pages/forgetPassword";
import UpdatePassword from "./pages/updatePassword";
import VerifyRestPassword from "./pages/verifyRestPassword";
function App() {
    const location = useLocation();
    const isLogin=location.pathname.startsWith("/login")||location.pathname.startsWith("/register")||location.pathname.startsWith("/verify")||location.pathname.startsWith("/rest")
  return (
    <div className="App">
      <DataProvider>
        <ThemeProvider>
      <LoginProvider>
        {/* <NavBar/> */}
        {isLogin? <Overly/>:null}
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname} >
        <Route path="/login" element={
          <PageWrapper>
            <Login />
          </PageWrapper>
          } />
        <Route path="/register" element={<PageWrapper>
            <Register />
          </PageWrapper>} />
          <Route path="/dashboard" element={<PageWrapper>
            <Dashboard />
          </PageWrapper>} />
          <Route path="/" element={<PageWrapper>
            <Home />
          </PageWrapper>} />
          <Route path="/Add"element={<PageWrapper>
            <Add />
          </PageWrapper>}/>
          <Route path="/Edit" element={<PageWrapper>
          <Edit />
          </PageWrapper>} />
          <Route path="/verify" element={<PageWrapper>
          <VerifyPage/>
          </PageWrapper>} />
           <Route path="/rest/forget" element={<PageWrapper>
          <Forget/>
          </PageWrapper>} />
          <Route path="/rest/confirm" element={<PageWrapper>
          <VerifyRestPassword/>
          </PageWrapper>} />
           <Route path="/rest/password" element={<PageWrapper>
          <UpdatePassword/>
          </PageWrapper>} />
          
          

      </Routes>
    </AnimatePresence>
      </LoginProvider>
      </ThemeProvider>
      </DataProvider>
    
    </div>
  );
}

export default App;
