import { useContext } from "react";
import { useHistory } from "react-router-dom";
import fire from "../../../Auth/Fire";
import { AuthContext } from "../../../Context/AuthContext";
import { InputsContext } from "../../../Context/InputsContext";
import "./Register.css";
const Register = () => {
  const { inputs, changeRegisterHandler } = useContext(InputsContext);
  const { setCurrentUser } = useContext(AuthContext);

  const history = useHistory();

  const SignUp = (inputs) => {
    try {
      fire
        .auth()
        .createUserWithEmailAndPassword(inputs.email, inputs.password)
        .then(() => {
          let user = fire.auth().currentUser;
          user.updateProfile({
            displayName: inputs.name,
          });
        });

      history.push("/");
    } catch (error) {
      alert(error); // TODO: handle errors
    }
  };

  return (
    <main>
      <section className="glass my-5 flex-column align-items-center justify-content-evenly">
        <h3>Регистрация</h3>
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Введите имя"
          onChange={changeRegisterHandler}
        />
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Введите e-mail"
          onChange={changeRegisterHandler}
        />
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Введите пароль"
          onChange={changeRegisterHandler}
        />

        <button className="btn btn-primary" onClick={() => SignUp(inputs)}>
          Регистрация
        </button>
      </section>
    </main>
  );
};

export default Register;
