import { useContext } from "react";
import { useHistory } from "react-router-dom";
import fire from "../../Auth/Fire";
import { InputsContext } from "../../Context/InputsContext";
import "./Login.css";

const Login = () => {
  const { login, changeLoginHandler } = useContext(InputsContext);
  const history = useHistory();
  const loginUser = async (login) => {
    try {
      await fire.auth().signInWithEmailAndPassword(login.email, login.password);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <main>
      <section className="glass my-5 flex-column align-items-center justify-content-evenly">
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
            loginUser(login);
          }}
        >
          Войти
        </button>
      </section>
    </main>
  );
};

export default Login;
