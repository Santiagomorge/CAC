import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './login.css';
import login_image from '../../static/login_image.jpg';
import logo_login from '../../static/logo_login.png';

export const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "El usuario es obligatorio.";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Limpiar errores al modificar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/usuario/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log("Login exitoso");
        navigate("/usuarios");
      } else if (response.status === 401) {
        setErrors({ form: "Usuario o contraseña incorrectos." });
      } else {
        throw new Error("Error al verificar usuario");
      }
    } catch (error) {
      console.error(error);
      setErrors({ form: "Error al verificar usuario." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-contprin">
      <div className="login-container">
        <div className="box caja40">
          <img
            className="imagen-login"
            src={login_image}
            alt="fondo"
          />
        </div>
        <div className="box caja60">
          <img
            className="logo-login"
            src={logo_login}
            alt="Logo de la empresa"
          />
          <p className="texto-login">¡Bienvenido al sistema de acceso a recursos!</p>

          <form className="formlogin" onSubmit={handleSubmit}>
            <div className="label-login">
              <label htmlFor="username" className="input-login">
                Usuario
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? "input-error" : ""}
              />
              {errors.username && (
                <div className="error-message">{errors.username}</div>
              )}
            </div>

            <div className="label-login">
              <label htmlFor="password" className="input-login">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && (
                <div className="error-message">{errors.password}</div>
              )}
            </div>

            {errors.form && (
              <div className="error-message">{errors.form}</div>
            )}

            <button type="submit" className="ingresar" disabled={loading}>
              {loading ? "Cargando..." : "Ingresar"}
            </button>
          </form>

          <div className="link-container">
            <Link to="/login-recursos" className="link-recursos">
              Entrar a recursos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
