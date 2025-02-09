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
import PermissionRequestForm from "./components/permissions/PermissionRequest";
import Unauthorized from "./components/Unauthorized";
import AdminDashboard from "./components/admin/AdminDashboard";

function App() {
  
  return (
    <>
        <RecoilRoot>
          <Navbar />
          <Routes>
            <Route path="/" element={<StatesGridLayout />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUpUpdate mode="signup" user={null} />} />
            <Route path="/edit-profile" element={<SignUpUpdate mode="edit" />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/form/:id?" element={<StateForm />} />
            <Route path="/permission-form" element={<PermissionRequestForm/>}  />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

          </Routes>
        </RecoilRoot>
    </>
  );
}

export default App;
