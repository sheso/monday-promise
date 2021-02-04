import { BrowserRouter as Router } from "react-router-dom";
import AppSwitch from "./Components/Utilities/AppSwitch";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
        <AppSwitch />
      </Router>
    </div>
  );
}

export default App;
