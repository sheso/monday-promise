import { useContext } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import "./Menu.css";

const Menu = () => {
  const history = useHistory();
  const { currentUser, signout } = useContext(AuthContext);
  console.log("current user in menu", currentUser);

  const signoutUser = async () => {
    await signout();
    history.push("/");
  };

  return (
    <div>
      <div className="dashboard">
        <div className="logo">
          <img src="../../../images/promise.png" alt="" />
          <p className="logoText">Monday Promise</p>
        </div>
        {currentUser ? (
          <>
            <div className="user">
              {currentUser.photoURL && (
                <img src={currentUser.photoURL} alt={currentUser.displayName} />
              )}
              <h3>
                <NavLink to="/account" className="navlink">
                  {currentUser.displayName}
                </NavLink>
              </h3>
            </div>
            <div className="links">
              <div className="link">
                <img src="" alt="" />
                <h2>
                  <NavLink to="/contract/new" className="navlink">
                    Новое обещание
                  </NavLink>
                </h2>
              </div>
              <div className="link">
                <img src="" alt="" />
                <h2>
                  <NavLink exact to="/feed" className="navlink">
                    Лента
                  </NavLink>
                </h2>
              </div>
              <div className="link ">
                <img src="" alt="" />
                <h2>
                  <NavLink to="/friends" className="navlink">
                    Друзья
                  </NavLink>
                </h2>
              </div>
              <div className="link">
                <img src="" alt="" />
                <h2>
                  <NavLink to="/chat" className="navlink">
                    Чат
                  </NavLink>
                </h2>
              </div>
              <div className="link py-3">
                <img src="" alt="" />
              </div>
              <div className="link">
                <img src="" alt="" />
                <button onClick={() => signoutUser()} className="exit">
                  <h3>Выйти</h3>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="links">
            <div className="link">
              <img src="" alt="" />
              <h2>
                <Link to="/" className="navlink">
                  Главная
                </Link>
              </h2>
            </div>
            <div className="link">
              <img src="" alt="" />
              <h2>
                <NavLink to="/register" className="navlink">
                  Регистрация
                </NavLink>
              </h2>
            </div>
            <div className="link">
              <img src="" alt="" />
              <h2>
                <NavLink to="/login" className="navlink">
                  Войти
                </NavLink>
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
