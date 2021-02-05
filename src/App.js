import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import "firebase/auth";
import Login from "./Components/Pages/Login/Login";
import Main from "./Components/Layout/Main/Main";
import Navbar from "./Components/Layout/Navbar/Navbar";
import Register from "./Components/Pages/Register/Register";
import { AuthProvider } from "./Context/AuthContext";
import { InputsProvider } from "./Context/InputsContext";

function App() {
  return (
    <AuthProvider>
      <InputsProvider>
        <div className="container">
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/">
                <Main />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
            </Switch>
          </Router>
        </div>
      </InputsProvider>
    </AuthProvider>
  );
}

export default App;
