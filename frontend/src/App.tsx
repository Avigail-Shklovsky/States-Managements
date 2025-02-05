import { Route, Routes } from "react-router";
import "../src/styles/App.scss";
import StatesGridLayout from "./components/states/StatesGridLayout";
import Navbar from "./layouts/Navbar";
import StateForm from "./components/states/StateForm";
import { RecoilRoot } from "recoil";
import "../src/styles/_global.scss"; 
import SignIn from "./components/users/SignIn";
import SignUpUpdate from "./components/users/SignUpUpdate";
import Profile from "./components/users/Profile";
import ForgotPassword from "./components/users/ForgotPassword";
import ResetPassword from "./components/users/ResetPassword";
function App() {

  return (
    <>
        <RecoilRoot>
          <Navbar />
          <Routes>
            <Route path="/" element={<StatesGridLayout />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUpUpdate />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/form/:id?" element={<StateForm />} />
          </Routes>
        </RecoilRoot>
    </>
  );
}

export default App;
