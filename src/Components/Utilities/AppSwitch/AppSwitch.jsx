import { Route, Switch } from "react-router-dom";
import Register from "../../Pages/Register/Register";
import Login from "../../Pages/Login/Login";
import Feed from '../../Pages/Feed/Feed';
import Profile from '../../Pages/Profile/Profile';
import ContractForm from '../../Pages/ContractForm/ContractForm';
import Friends from '../../Pages/Friends/Friends';
import Contract from '../../Pages/Contract/Contract';
import Chat from '../../Pages/Chat/Chat';
import User from '../../Pages/User/User';


const AppSwitch = () => {
  return (
    <Switch>

<Route path="/chat">
				{/* Неавторизованный - на лендинг. Авторизованный - на ленту */}
        <Chat />
      </Route>

			<Route path="/account">
				<Profile />
      </Route>
			<Route path="/contract/new">
        <ContractForm />
      </Route>
			<Route path="/friends">
        <Friends />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
			<Route path="/contract/:id">
        <Contract />
      </Route>
			<Route path="/chat/:id">
        {/* <Chat /> */}
      </Route>
			<Route path="/user/:id">
        <User />
      </Route>
      <Route path="/">
				{/* Неавторизованный - на лендинг. Авторизованный - на ленту */}
        <Feed />
      </Route>

      
    </Switch>
  );
};

export default AppSwitch;
