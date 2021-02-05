import { BrowserRouter as Router } from "react-router-dom";

import "firebase/auth";
import Navbar from "./Components/Layout/Navbar/Navbar";
import Menu from "./Components/Layout/Menu/Menu";
import Main from "./Components/Layout/Main/Main";
// import AppSwitch from "./Components/Utilities/AppSwitch/AppSwitch";
import { AuthProvider } from "./Context/AuthContext";
import { InputsProvider } from "./Context/InputsContext";

function App() {
  return (
    <AuthProvider>
      <InputsProvider>
        <div className="container">
          <Router>
            <Navbar />
            <div className="main d-flex flex-row">
              <Menu />
              <Main />
            </div>
          </Router>
        </div>
      </InputsProvider>
    </AuthProvider>
  );
}

export default App;
