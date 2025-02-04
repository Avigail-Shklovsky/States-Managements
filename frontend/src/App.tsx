import { Route, Routes } from "react-router";
import "../src/styles/App.scss";
import StatesGridLayout from "./components/states/StatesGridLayout";
import Navbar from "./layouts/Navbar";
import StateForm from "./components/states/StateForm";
import { RecoilRoot } from "recoil";
import "../src/styles/_global.scss"; 
import SignUpUpdate from "./components/users/SignUpUpdate";
function App() {

  return (
    <>
        <RecoilRoot>
          <Navbar />
          <Routes>
            <Route path="/" element={<StatesGridLayout />} />
            <Route path="/signup" element={<SignUpUpdate />} />
            <Route path="/form/:id?" element={<StateForm />} />
          </Routes>
        </RecoilRoot>
    </>
  );
}

export default App;
