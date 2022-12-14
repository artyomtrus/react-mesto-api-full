import logo from "../images/logo.svg";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";

function Header(props) {

  function onSignOut() {
   props.onSignOut();
  }

  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <div className="header__container">
        <Switch>
          <Route exact path="/signin">
            <Link to="/signup" className="header__registration">
              Регистрация
            </Link>
          </Route>
          <Route exact path="/signup">
            <Link to="/signin" className="header__registration">
              Войти
            </Link>
          </Route>
          <Route path="/">
            <p className="header__email">{props.userData}</p>
            <Link to="signin" className="header__sign-out" onClick={onSignOut}>
              Выйти
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
