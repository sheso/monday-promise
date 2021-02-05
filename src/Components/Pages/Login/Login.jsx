import { useContext } from "react";
import { useHistory } from "react-router-dom";
import fire from "../../../Auth/Fire";
import firebase from "firebase";
import { InputsContext } from "../../../Context/InputsContext";
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

  const googleLogin = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    try {
      fire
        .auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
          let googleUser = result.user;
          let photoUrl = result.photoUrl;
          history.push("/");
        });
    } catch (err) {
      alert(err);
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
        <p>Войти с помощью соц.сетей</p>
        <img
          src="../../../images/google.png"
          width="7%"
          alt="google"
          onClick={() => googleLogin()}
        />
      </section>
    </main>
  );
};

export default Login;
