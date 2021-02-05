import { Route, Switch } from "react-router-dom";
import Register from "../../Pages/Register/Register";
import Login from "../../Pages/Login/Login";
import Feed from '../../Pages/Feed/Feed';
import Chat from "../../Pages/Chat/Chat";

const AppSwitch = () => {
  return (
    <Switch>

<Route path="/chat">
				{/* Неавторизованный - на лендинг. Авторизованный - на ленту */}
        <Chat />
      </Route>

			<Route path="/account">
				{/* личный кабинет */}
      </Route>
			<Route path="/promise/new">
        {/* создание новой цели */}
      </Route>
			<Route path="/friends">
        {/* друзья/поиск друзей */}
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
			<Route path="/promise/:id">
        {/* конкретная цель */}
      </Route>
			<Route path="/chat/:id">
        {/* конкретный чат по конкретной цели */}
      </Route>
			<Route path="/user/:id">
        {/* страница пользователя - какого-то, не нашего. Нашего должна вести на /account */}
      </Route>
      <Route path="/">
				{/* Неавторизованный - на лендинг. Авторизованный - на ленту */}
        <Feed />
      </Route>

      
    </Switch>
  );
};

export default AppSwitch;
