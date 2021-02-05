import { useContext } from "react";
import { NavLink } from "react-router-dom";
import fire from "../../../Auth/Fire";
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
        {currentUser ? (
          <>
            <div className="user">
              <img
                src={userPhoto}
                alt="userPhoto"
                style={{ borderRadius: "10px" }}
              />
              <h3>
                <NavLink to="/account">{currentUser}</NavLink>
              </h3>
            </div>
            <div className="links">
              <div className="link">
                <img src="./images/upcoming.png" alt="" />
                <h2>
                  <NavLink to="/promise/new">Новое обещание</NavLink>
                </h2>
              </div>
              <div className="link">
                <img src="./images/upcoming.png" alt="" />
                <h2>
                  <NavLink exact to="/">
                    Лента
                  </NavLink>
                </h2>
              </div>
              <div className="link">
                <img src="./images/upcoming.png" alt="" />
                <h2>
                  <NavLink to="/friends">Друзья</NavLink>
                </h2>
              </div>
              <div className="link">
                <img src="./images/library.png" alt="" />
                <button onClick={() => signOut()}>Выйти</button>
              </div>
            </div>
          </>
        ) : (
          <div className="links">
            <div className="link">
              <img src="" alt="" />
              <h2>
                <Link to="/main">Главная</Link>
              </h2>
            </div>
            <div className="link">
              <img src="" alt="" />
              <h2>
                <NavLink to="/register">Регистрация</NavLink>
              </h2>
            </div>
            <div className="link">
              <img src="" alt="" />
              <h2>
                <NavLink to="/login">Войти</NavLink>
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
