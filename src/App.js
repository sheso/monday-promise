import { BrowserRouter as Router } from "react-router-dom";

import "firebase/auth";
import Navbar from "./Components/Layout/Navbar/Navbar";
import AppSwitch from "./Components/Utilities/AppSwitch/AppSwitch";
import { AuthProvider } from "./Context/AuthContext";
import { InputsProvider } from "./Context/InputsContext";

function App() {
  return (
    <AuthProvider>
      <InputsProvider>
        <div className="container">
          <Router>
            <Navbar />
            <AppSwitch />
          </Router>
        </div>
      </InputsProvider>
    </AuthProvider>
  );
}

export default App;
