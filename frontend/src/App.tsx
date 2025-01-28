import { Route, Routes } from "react-router";
import "../src/styles/App.scss";
import StatesGridLayout from "./components/StatesGridLayout";
import Navbar from "./layouts/Navbar";
import StateForm from "./components/StateForm";
import { RecoilRoot } from "recoil";
import "../src/styles/_global.scss"; 
function App() {

  return (
    <>
        <RecoilRoot>
          <Navbar />
          <Routes>
            <Route path="/" element={<StatesGridLayout />} />
            <Route path="/form/:id?" element={<StateForm />} />
          </Routes>
        </RecoilRoot>
    </>
  );
}

export default App;
