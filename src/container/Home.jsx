import React from "react";
import auth0 from "auth0-js";

const auth0Config = {
  domain: "testerun.us.auth0.com",
  clientID: "qsyvSMj1lcb68hl1xJj2D0awZpi6KZuk",
  redirectUri: `${urlFrontend}`, // Cambia esto según tu configuración
  responseType: "token id_token",
  scope: "openid profile email",
};

const webAuth = new auth0.WebAuth(auth0Config);

const Home = () => {

  const handleSignOut = () => {
    webAuth.logout({
      returnTo: `${urlFrontend}`, // URL a la que redirigir después de cerrar sesión
      clientID: auth0Config.clientID,
    });
  };


  return (
    <>
      <h1>Juan</h1>

      <button onClick={handleSignOut()}>Cerrar Sesion</button>
    </>
  );
};

export default Home;
