import React from "react";
import { useForm } from "react-hook-form";
import "../assets/Style/Estilo.css";
import logo from "../assets/log.svg";
import reg from "../assets/register.jpg";
import { useState } from "react";

const Home = () => {
  const { register: registerSignIn, handleSubmit: handleSubmitSignIn } =
    useForm();
  const { register: registerSignUp, handleSubmit: handleSubmitSignUp } =
    useForm();
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSignIn = (data) => {
    console.log(data);
  };

  const handleSignUp = (data) => {
    console.log(data);
  };

  const toggleSignUpMode = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form
            onSubmit={handleSubmitSignIn(handleSignIn)}
            className="sign-in-form"
          >
            <h2 className="title">Iniciar Sesion</h2>
            <div className="input-field">
              <i className="fas fa-user fa-lg"></i>
              <input
                type="text"
                placeholder="Nombre"
                {...registerSignIn("Nombre")}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock fa-lg"></i>
              <input
                type="password"
                placeholder="Contraseña"
                {...registerSignIn("Contraseña")}
              />
            </div>
            <input
              type="submit"
              value="Iniciar Sesion"
              className="btn solid"
            />
            <p className="social-text">Utiliza alguna red social para ingresar</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
          <form
            onSubmit={handleSubmitSignUp(handleSignUp)}
            className="sign-up-form"
          >
            <h2 className="title">Registrarse</h2>
            <div className="input-field">
              <i className="fas fa-user fa-lg"></i>
              <input
                type="text"
                placeholder="Nombre"
                {...registerSignUp("Nombre")}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope fa-lg"></i>
              <input
                type="email"
                placeholder="Email"
                {...registerSignUp("email")}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock fa-lg"></i>
              <input
                type="password"
                placeholder="Contraseña"
                {...registerSignUp("Contraseña")}
              />
            </div>
            <input type="submit" className="btn" value="Registrarse" />
            <p className="social-text">o utiliza una red social para registrarte</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Eres nuevo?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={toggleSignUpMode}
            >
              Registrate
            </button>
          </div>
          <img src={logo} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Ya posees cuenta ?</h3>
            <p>
              Entonces diviertete en nuestro sistema y
            </p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={toggleSignUpMode}
            >
              Inicia Sesion
            </button>
          </div>
          <img src={reg} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;