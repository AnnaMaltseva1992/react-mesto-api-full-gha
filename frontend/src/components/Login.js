import React, { useState } from "react";

function Login(props) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
          props.onLogin(formValue.email, formValue.password);
        }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          className="auth__input"
          placeholder="Email"
          name="email"
          type="email"
          required
          value={formValue.email}
        ></input>
        <input
          onChange={handleChange}
          className="auth__input"
          placeholder="Пароль"
          name="password"
          type="password"
          required
          value={formValue.password}
        ></input>
        <button className="auth__submit-button" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
