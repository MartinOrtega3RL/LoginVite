import React from "react";
import auth0 from "auth0-js";
import Ath0Config from "../Auth0Config";
import axios from "axios";
import { urlBackend } from "../config";

const webAuth = new auth0.WebAuth(Ath0Config);

const Home = () => {

  const handleSignOut = () => {
    webAuth.logout({
      returnTo: "http://localhost:5173/Login", // URL a la que redirigir después de cerrar sesión
      clientID: Ath0Config.clientID,
    });
  };

  axios.get(`${urlBackend}GetUserData`)
  .then((response) => {
    console.log(response.data)
  })
  .catch((err) => {
    console.log(err);
  })

  return (
    <>
      <h1>Bienvenido User</h1>

      <button onClick={handleSignOut}>Cerrar Sesion</button>
    </>
  );
};

export default Home;
