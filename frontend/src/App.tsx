import "../src/styles/App.scss";
import StatesGridLayout from "./components/StatesGrid";
import Navbar from "./layouts/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <StatesGridLayout></StatesGridLayout>
    </>
  );
}

export default App;
