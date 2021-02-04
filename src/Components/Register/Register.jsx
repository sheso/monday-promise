import "./Register.css";
const Register = () => {
  return (
    <main>
      <section className="glass my-5 flex-column align-items-center justify-content-evenly">
        <h3>Регистрация</h3>
        <input type="text" className="form-control" placeholder="Введите имя" />
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

export default Register;
