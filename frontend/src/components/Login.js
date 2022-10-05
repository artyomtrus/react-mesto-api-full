import React from "react";
import { withRouter } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.handleAuthorize(email, password);
  }

  return (
    <div className="login-page">
      <main className="login">
        <div className="login__container">
          <h3 className="login__title">Вход</h3>
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <button className="login__button" type="submit" aria-label="Войти">
              Войти
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default withRouter(Login);
