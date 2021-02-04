import { Route, Switch } from "react-router-dom";
import Register from "../../Pages/Register/Register";
import Login from "../../Pages/Login/Login";
import Main from "../../Layout/Main/Main";

const AppSwitch = () => {
  return (
    <Switch>
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
        <Main />
      </Route>
    </Switch>
  );
};

export default AppSwitch;
