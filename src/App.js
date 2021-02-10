import { BrowserRouter as Router } from "react-router-dom";

import "firebase/auth";
// import Navbar from "./Components/Layout/Navbar/Navbar";
import Menu from "./Components/Layout/Menu/Menu";
import Main from "./Components/Layout/Main/Main";
// import AppSwitch from "./Components/Utilities/AppSwitch/AppSwitch";
import { AuthProvider } from "./Context/AuthContext";
import { InputsProvider } from "./Context/InputsContext";

function App() {
  return (
    <AuthProvider>
      <InputsProvider>
        <Router>
          <div className="screen">
            <Menu />
            <Main />
          </div>
        </Router>
      </InputsProvider>
    </AuthProvider>
  );
}

export default App;
