import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import fire from "../../../Auth/Fire";
import { AuthContext } from "../../../Context/AuthContext";
import "./Menu.css";
const Menu = () => {
  const { userPhoto, currentUser } = useContext(AuthContext);
  const history = useHistory();
  const signOut = () => {
    fire.auth().signOut();
  };

  return (
    <div>
      <div className="dashboard">
        <div className="user">
          <img
            src={userPhoto}
            alt="userPhoto"
            style={{ borderRadius: "10px" }}
          />
          <h3>{currentUser}</h3>
        </div>
        {currentUser ? (
          <div className="links">
            <div className="link">
              <img src="" alt="" />
              <h2>Друзья</h2>
            </div>
            <div className="link">
              <img src="" alt="" />
              <h2>Сообщения</h2>
            </div>
            <div className="link">
              <img src="" alt="" />
              <h2>Лента</h2>
            </div>
            <div className="link">
              <img src="" alt="" />
              <h2>Обещания</h2>
            </div>
            <div className="link">
              <img src="" alt="" />
              <button onClick={() => signOut()}>Выйти</button>
            </div>
          </div>
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
                <Link to="/register">Регистрация</Link>
              </h2>
            </div>
            <div className="link">
              <img src="" alt="" />
              <h2>
                <Link to="/login">Войти</Link>
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
