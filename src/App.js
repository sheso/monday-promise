import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import Main from "./Components/Main/Main";
import Navbar from "./Components/Navbar/Navbar";
import Register from "./Components/Register/Register";

function App() {
  return (
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
  );
}

export default App;
