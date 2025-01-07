import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import UserProtected from "./pages/UserProtected"
import CaptainProtected from "./pages/captainProtected"
import CaptainHome from "./pages/CaptainHome";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/riding" element={<Riding />} />
      <Route path="/userLogin" element={<UserLogin />} />
      <Route path="/userSignup" element={<UserSignup />} />
      <Route path="/captainLogin" element={<CaptainLogin />} />
      <Route path="/captainSignup" element={<CaptainSignup />} />
      <Route path="/captain-riding" element={<CaptainRiding />} />
      <Route path="/home" element={
        <UserProtected>
        <Home />
        </UserProtected>
        } />
        <Route path="/captain-home" element={
          <CaptainProtected>
          <CaptainHome />
          </CaptainProtected>
          } />

    </Routes>
  );
};

export default App;
