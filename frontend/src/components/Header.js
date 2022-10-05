import logo from "../images/logo.svg";
import React from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";

function Header(props) {
  const history = useHistory();

  function onSignOut() {
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <div className="header__container">
        <Switch>
          <Route exact path="/sign-in">
            <Link to="/sign-up" className="header__registration">
              Регистрация
            </Link>
          </Route>
          <Route exact path="/sign-up">
            <Link to="/sign-in" className="header__registration">
              Войти
            </Link>
          </Route>
          <Route path="/">
            <p className="header__email">{props.userData}</p>
            <Link to="sign-in" className="header__sign-out" onClick={onSignOut}>
              Выйти
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
