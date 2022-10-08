import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.handleRegistration(email, password);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="login-page">
      <main className="login">
        <div className="login__container">
          <h3 className="login__title">Регистрация</h3>
          <form
            className="login__form"
            name="loginForm"
            onSubmit={handleSubmit}
          >
            <input
              id="email-input"
              type="email"
              name="email"
              className="login__email"
              placeholder="Email"
              minLength="2"
              maxLength="40"
              onChange={handleChangeEmail}
              required
            />
            <input
              id="password-input"
              type="password"
              name="password"
              className="login__password"
              placeholder="Пароль"
              minLength="2"
              maxLength="200"
              onChange={handleChangePassword}
              required
            />
            <button className="login__button" type="submit" aria-label="Войти">
              Зарегистрироваться
            </button>
            <span className="login__span">
              Уже зарегистрированы?
              <Link to="/signin" className="login__link">
                Войти
              </Link>
            </span>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Register;
