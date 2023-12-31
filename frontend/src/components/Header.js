import React from "react";
import logo from "../images/logo_theme_dark.png";
import { Routes, Route, Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img className="logo logo_place_header" src={logo} alt="Место" />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          }
        />
        <Route
          path="/main"
          element={
            <div className="header__user-info">
              <p className="header__email">{props.email}</p>
              <Link
                to="/sign-in"
                className="header__link"
                onClick={props.onSignOut}
              >
                Выйти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
