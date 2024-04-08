import { useForm } from "react-hook-form";
import "../assets/Style/Estilo.css";
import logo from "../assets/log.png";
import reg from "../assets/register.svg";
import { useState } from "react";
import auth0 from "auth0-js";
import Ath0Config from "../Auth0Config";
import axios from "axios";
import { urlBackend } from "../config";

const webAuth = new auth0.WebAuth(Ath0Config);

webAuth.checkSession({}, (err, authResult) => {
  if (err) {
    // No hay sesión activa o ha ocurrido un error al verificar la sesión
    console.log("No hay sesión activa");
  } else {
    // Hay una sesión activa
    console.log("Sesión activa:", authResult);
  }
});

export default function Login() {
  const {
    register: registerSignIn,
    handleSubmit: handleSubmitSignIn,
    reset: resetSignIn,
  } = useForm();

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    reset: resetSignUp,
    formState: { errors },
  } = useForm();

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar si la contraseña debe mostrarse

  const handleSignIn = (data) => {

    const dataToSend = {
      Email: data.Email,
      Contraseña : data.Contraseña
    }

    axios
      .post(`${urlBackend}GetDataUser`, dataToSend)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    webAuth.login(
      {
        realm: "Usuarios-Login",
        email: data.Email,
        password: data.Contraseña,
      },
      (err) => {
        if (err) {
          alert("Usuario o Contraseña no validos", err);
        } else {
          alert("Inicio de sesion Exitoso");
        }
      }
    );
  };

  const renderErrorMessage = (fieldName) => {
    if (errors[fieldName]) {
      return (
        <span className="Error-Message-Register">
          {errors[fieldName].message}
        </span>
      );
    }
    return null;
  };

  const handleSignUp = (data) => {
    const { Nombre, Apellido, Cuil, Telefono, Email, Contraseña } = data;

    webAuth.signup(
      {
        email: Email,
        password: Contraseña,
        connection: "Usuarios-Login", // Cambia esto según tu configuración de Auth0
        user_metadata: {
          nombre: Nombre,
          apellido: Apellido,
          cuil: Cuil,
          rol: "Usuario",
          telefono: Telefono,
        },
      },
      (err) => {
        if (err=="invalid_signup") {
          console.error("Error al registrar usuario en Auth0:", err);
          alert("Error al registrar usuario, Ya existe", err);
        } else {
          alert("Usuario registrado con éxito en Auth0");
          resetSignUp(); // Resetear los datos del formulario de registro después de enviarlos
          setIsSignUpMode(false); // Cambiar de vuelta a la vista de inicio de sesión
        }
      }
    );
  };

  const toggleSignUpMode = () => {
    setIsSignUpMode(!isSignUpMode);
    setShowPassword(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Cambiar el estado para mostrar u ocultar la contraseña
  };

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form //Formulario Login
            onSubmit={handleSubmitSignIn(handleSignIn)}
            className="sign-in-form"
          >
            <h2 className="title">Iniciar Sesion</h2>
            <div className="input-field">
              <i className="fas fa-user fa-lg"></i>
              <input
                type="text"
                placeholder="Email"
                {...registerSignIn("Email")}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock fa-lg"></i>
              <input
                type={showPassword ? "text" : "password"} // Cambiar el tipo de entrada según el estado de showPassword
                placeholder="Contraseña"
                {...registerSignIn("Contraseña")}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                <i
                  className={`fas ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  } fa-lg`}
                ></i>
              </button>
            </div>
            <input type="submit" value="Iniciar Sesion" className="btn solid" />
          </form>

          {/* ///////////////////////////////////////////////////// */}

          <form //FORMULARIO REGISTRO
            onSubmit={handleSubmitSignUp(handleSignUp)}
            className="sign-up-form"
          >
            <h2 className="title">Registrarse</h2>
            <div className="input-field">
              <i className="fas fa-user fa-lg"></i>
              <input
                type="text"
                placeholder="Nombre"
                {...registerSignUp("Nombre", {
                  required: { value: true, message: "El nombre es Requerido" },
                  minLength: {
                    value: 4,
                    message: "El nombre debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "El nombre debe tener maximo 20 caracteres",
                  },
                })}
              />
            </div>
            {renderErrorMessage("Nombre")}
            <div className="input-field">
              <i className="fas fa-user fa-lg"></i>
              <input
                type="text"
                placeholder="Apellido"
                {...registerSignUp("Apellido", {
                  required: {
                    value: true,
                    message: "El Apellido es Requerido",
                  },
                  minLength: {
                    value: 3,
                    message: "El Apellido debe tener al menos 3 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "El Apellido debe tener maximo 20 caracteres",
                  },
                })}
              />
            </div>
            {renderErrorMessage("Apellido")}
            <div className="input-field">
              <i className="fas fa-id-card"></i>
              <input
                type="text"
                placeholder="Cuil"
                {...registerSignUp("Cuil")}
              />
            </div>
            {renderErrorMessage("Cuil")}
            <div className="input-field">
              <i className="fas fa-phone fa-lg"></i>
              <input
                type="text"
                placeholder="Telefono"
                {...registerSignUp("Telefono", {
                  required: {
                    value: true,
                    message: "El Telefono es Requerido",
                  },
                  minLength: {
                    value: 10,
                    message: "El Telefono debe contener 10 caracteres",
                  },
                  maxLength: { value: 11, message: "Telefono no valido" },
                  validate: (value) => {
                    if (/^[a-zA-Z]+$/.test(value)) {
                      return "No debe tener letras";
                    }
                  },
                })}
              />
            </div>
            {renderErrorMessage("Telefono")}
            <div className="input-field">
              <i className="fas fa-envelope fa-lg"></i>
              <input
                type="email"
                placeholder="Email"
                {...registerSignUp("Email", {
                  required: { value: true, message: "El email es requerido" },
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Correo no valido",
                  },
                })}
              />
            </div>
            {renderErrorMessage("Email")}
            <div className="input-field">
              <i className="fas fa-lock fa-lg"></i>
              <input
                type={showPassword ? "text" : "password"} // Cambiar el tipo de entrada según el estado de showPassword
                placeholder="Contraseña"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$"
                title="La contraseña debe tener al menos 8 caracteres de longitud y contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (por ejemplo, !@#$%^&*)."
                {...registerSignUp("Contraseña", {
                  required: { value: true, message: "Contraseña Requerida" },
                })}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                <i
                  className={`fas ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  } fa-lg`}
                ></i>
              </button>
            </div>
            {renderErrorMessage("Contraseña")}
            <input type="submit" className="btn" value="Registrarse" />
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
            <p>Entonces diviertete en nuestro sistema y</p>
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
}
