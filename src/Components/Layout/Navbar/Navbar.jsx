import { useContext } from "react";
import { Link } from "react-router-dom";
// import fire from "../../../Auth/Fire";
import { AuthContext } from "../../../Context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <ul className="nav d-flex justify-content-around align-items-center my-3">
      <li className="nav-item">
        <Link to="/" className="route">
          Главная
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="route">
          Регистрация
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="route">
          Войти
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
