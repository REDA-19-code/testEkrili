import { Routes, Route,useLocation  } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Overly from "./components/overly";
import RegisterNext from "./pages/registerNext";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "./components/PageWrapper";
import { LoginProvider } from "./context/userApiContext";
import { DataProvider } from "./context/dataContext";
import UplaodImage from "./pages/uplaodImage";
import Home from "./pages/home";




function App() {
    const location = useLocation();
    const isLogin=location.pathname.startsWith("/login")||location.pathname.startsWith("/register")
  return (
    <div className="App">
      <DataProvider>
      <LoginProvider>
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
        <Route path="/register/next" element={<PageWrapper>
            <RegisterNext />
          </PageWrapper>} />
          <Route path="/register/next/uplaod" element={<PageWrapper>
            <UplaodImage />
          </PageWrapper>} />
          <Route path="/" element={<PageWrapper>
            <Home />
          </PageWrapper>} />

      </Routes>
    </AnimatePresence>
      </LoginProvider>
      </DataProvider>
     
    </div>
  );
}

export default App;
