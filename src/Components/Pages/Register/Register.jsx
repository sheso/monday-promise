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
    await signup(inputs);
    history.push("/feed");
  };

  return (
    <section className="glass" style={{ width: "30vw" }}>
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
  );
};

export default Register;
