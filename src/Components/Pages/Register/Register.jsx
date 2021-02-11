import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { InputsContext } from "../../../Context/InputsContext";
import "./Register.css";

const Register = () => {
  const { inputs, changeRegisterHandler } = useContext(InputsContext);
  const { signup } = useContext(AuthContext);

  const history = useHistory();

  const SignUp = async (inputs) => {
    try {
      await signup(inputs);
      history.push("/feed");
    } catch (error) {
      history.push("/register");
    }
  };

  return (
    <section className="glass" style={{ width: "30vw" }}>
      <h3>Регистрация</h3>
      <input
        required
        type="text"
        name="name"
        className="form-control"
        placeholder="Введите имя"
        onChange={changeRegisterHandler}
      />
      <input
        required
        type="email"
        name="email"
        className="form-control"
        placeholder="Введите e-mail"
        onChange={changeRegisterHandler}
      />
      <input
        required
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
  );
};

export default Register;
