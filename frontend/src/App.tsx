import "../src/styles/App.scss";
import Navbar from "./layouts/Navbar";
import States from "./services/fetchsStates";

function App() {
  return (
    <>
      <Navbar />
      <States></States>
    </>
  );
}

export default App;
