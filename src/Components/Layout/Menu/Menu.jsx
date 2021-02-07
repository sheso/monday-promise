import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { fire } from "../../../Auth/Fire";
import { AuthContext } from "../../../Context/AuthContext";
import "./Menu.css";
const Menu = () => {
  const { userPhoto, currentUser } = useContext(AuthContext);
  const signOut = () => {
    fire.auth().signOut();
  };

  return (
    <div>
      <div className="dashboard">
        <div className="logo">
          <img src="'../../../images/pinky-promise.svg" alt="" width="15%" />
          <p className="logoText">Monday Promise</p>
        </div>
        {currentUser ? (
          <>
            <div className="user">
              <img
                src={userPhoto}
                alt="userPhoto"
                style={{ borderRadius: "10px" }}
                className="my-3"
              />
              <h3>
                <NavLink to="/account" className="navlink">
                  {currentUser}
                </NavLink>
              </h3>
            </div>
            <div className="links">
              <div className="link py-1">
                <img src="" alt="" />
                <h2>
                  <NavLink to="/contract/new" className="navlink">
                    Новое обещание
                  </NavLink>
                </h2>
              </div>
              <div className="link py-1">
                <img src="" alt="" />
                <h2>
                  <NavLink exact to="/" className="navlink">
                    Лента
                  </NavLink>
                </h2>
              </div>
              <div className="link py-3">
                <img src="" alt="" />
                <h2>
                  <NavLink to="/friends" className="navlink">
                    Друзья
                  </NavLink>
                </h2>
              </div>
              <div className="link">
                <img src="" alt="" />
                <button onClick={() => signOut()} className="exit my-1">
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
                <Link to="/main" className="navlink">
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
