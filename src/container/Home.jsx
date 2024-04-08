import React, { useState, useEffect } from "react";
import auth0 from "auth0-js";
import Ath0Config from "../Auth0Config";
import axios from "axios";
import { urlBackend } from "../config";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";

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

const Home = () => {

  const [DataUser, setDataUser] = useState({});
  
  const handleSignOut = () => {
    webAuth.logout({
      returnTo: "http://localhost:5173/Login", // URL a la que redirigir después de cerrar sesión
      clientID: Ath0Config.clientID,
    });
  };

  useEffect(() => {
    axios
      .get(`${urlBackend}GetUserData`)
      .then((response) => {
        console.log(response.data);
        setDataUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>Bienvenido User</h1>

      <JSONPretty data={DataUser} />

      <button onClick={handleSignOut}>Cerrar Sesion</button>
    </>
  );
};

export default Home;
