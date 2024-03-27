import React from "react";
import auth0 from "auth0-js";
import Ath0Config from "../Auth0Config";

const webAuth = new auth0.WebAuth(Ath0Config);

const Home = () => {

  const handleSignOut = () => {
    webAuth.logout({
      returnTo: "http://localhost:5173/Login", // URL a la que redirigir después de cerrar sesión
      clientID: Ath0Config.clientID,
    });
  };


  return (
    <>
      <h1>Bienvenido User</h1>

      <button onClick={handleSignOut}>Cerrar Sesion</button>
    </>
  );
};

export default Home;
