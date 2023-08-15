import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(formValue.email, formValue.password);
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          placeholder="Email"
          name="email"
          type="email"
          required
          value={formValue.email || ""}
          onChange={handleChange}
          autoComplete="off"
        ></input>
        <input
          className="auth__input"
          placeholder="Пароль"
          name="password"
          type="password"
          required
          value={formValue.password || ""}
          onChange={handleChange}
          autoComplete="off"
        ></input>

        <button className="auth__submit-button" type="submit">
          Зарегистрироваться
        </button>
        <div className="auth__signup">
          <p className="auth__signup-text">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="auth__signup-link">
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Register;
