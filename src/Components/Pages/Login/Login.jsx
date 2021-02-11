import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { InputsContext } from "../../../Context/InputsContext";
import { AuthContext } from "../../../Context/AuthContext";
import "./Login.css";

const Login = () => {
  const { loginData, changeLoginHandler } = useContext(InputsContext);
  const history = useHistory();

  const { login, googleLogin } = useContext(AuthContext);

  const loginUser = async (loginData) => {
    try {
      await login(loginData);
      history.push("/feed");
    } catch (error) {
      alert(error);
      history.push("/login");
    }
  };

  const googleLoginUser = async () => {
    try {
      await googleLogin();
      history.push("/feed");
    } catch (err) {
      alert(err);
      history.push("/login");
    }
  };

  return (
    <main>
      <section className="glass">
        <h3>Войти</h3>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Введите e-mail"
          onChange={changeLoginHandler}
        />
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Введите пароль"
          onChange={changeLoginHandler}
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            loginUser(loginData);
          }}
        >
          Войти
        </button>
        <p>Войти с помощью Google</p>
        <img
          src="../../../images/google.png"
          width="7%"
          alt="google"
          className="my-2"
          onClick={() => googleLoginUser()}
        />
      </section>
    </main>
  );
};

export default Login;
