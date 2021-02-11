import { Route, Switch } from "react-router-dom";
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Register from "../../Pages/Register/Register";
import Login from "../../Pages/Login/Login";
import Feed from '../../Pages/Feed/Feed';
import Profile from '../../Pages/Profile/Profile';
import ContractForm from '../../Pages/ContractForm/ContractForm';
import Friends from '../../Pages/Friends/Friends';
import Contract from '../../Pages/Contract/Contract';
import Chat from '../../Pages/Chat/Chat';
import User from '../../Pages/User/User';
import Landing from '../../Pages/Landing/Landing';

const AppSwitch = () => {
  return (
    <Switch>
			<PrivateRoute path="/chat">
        <Chat />
      </PrivateRoute>
			<PrivateRoute path="/account">
				<Profile />
      </PrivateRoute>
			<PrivateRoute path="/contract/new">
        <ContractForm />
      </PrivateRoute>
			<PrivateRoute path="/friends">
        <Friends />
      </PrivateRoute>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
			<PrivateRoute path="/contract/:id">
        <Contract />
      </PrivateRoute>
			<PrivateRoute path="/chat/:id">
        {/* <Chat /> */}
      </PrivateRoute>
			<PrivateRoute path="/user/:id">
        <User />
      </PrivateRoute>
      <PrivateRoute path="/feed">
				{/* Неавторизованный - на лендинг. Авторизованный - на ленту */}
        <Feed />
      </PrivateRoute>
			<Route path="/">
        <Landing />
      </Route>      
    </Switch>
  );
};

export default AppSwitch;
