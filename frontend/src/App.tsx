import { Route, Routes } from "react-router";
import "../src/styles/App.scss";
import StatesGridLayout from "./components/states/StatesGridLayout";
import Navbar from "./layouts/Navbar";
import StateForm from "./components/states/StateForm";
import { RecoilRoot } from "recoil";
import "../src/styles/_global.scss"; 
import SignIn from "./components/users/auth/SignIn";
import PermissionRequestForm from "./components/permissions/PermissionRequest";
import Unauthorized from "./components/Unauthorized";
import AdminDashboard from "./components/admin/AdminDashboard";
import SignUpUpdate from "./components/users/auth/SignUpUpdate";
import ResetPassword from "./components/users/auth/ResetPassword";
import ForgotPassword from "./components/users/auth/ForgotPassword";
import Profile from "./components/users/user-profile/ProfileContainer";

function App() {
  
  return (
    <>
        <RecoilRoot>
          <Navbar />
          <Routes>
            <Route path="/" element={<StatesGridLayout />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUpUpdate mode="signup"  />} />
            <Route path="/edit-profile/:id?" element={<SignUpUpdate mode="edit" />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/state-form/:id?" element={<StateForm />} />
            <Route path="/permission-form" element={<PermissionRequestForm/>}  />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

          </Routes>
        </RecoilRoot>
    </>
  );
}

export default App;
