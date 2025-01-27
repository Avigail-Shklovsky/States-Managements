import { Route, Routes } from "react-router";
import "../src/styles/App.scss";
import StatesGridLayout from "./components/StatesGridLayout";
import Navbar from "./layouts/Navbar";
import StateForm from "./components/StateForm";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<StatesGridLayout />} />
        <Route path="/form/:id?" element={<StateForm />} />
      </Routes>
    </>
  );
}

export default App;
