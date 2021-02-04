import "./Login.css";

const Login = () => {
  return (
    <main>
      <section className="glass my-5 flex-column align-items-center justify-content-evenly">
        <h3>Войти</h3>
        <input
          type="email"
          className="form-control"
          placeholder="Введите e-mail"
        />
        <input
          type="password"
          className="form-control"
          placeholder="Введите пароль"
        />
        <button className="btn btn-primary">Регистрация</button>
      </section>
    </main>
  );
};

export default Login;
