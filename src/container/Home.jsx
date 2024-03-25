import React, { useState, useEffect } from "react";
import auth0 from "auth0-js";
import Ath0Config from "../auth0-config";

const webAuth = new auth0.WebAuth(Ath0Config);

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleAuthentication = () => {
      webAuth.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken) {
          // Obtener información del usuario usando el token de acceso
          webAuth.client.userInfo(authResult.accessToken, (err, user) => {
            if (err) {
              console.error(
                "Error al obtener la información del usuario:",
                err
              );
              setError("Error al obtener la información del usuario");
            } else {
              console.log("Información del usuario:", user);
              setUserData(user);
            }
          });
        } else if (err) {
          console.error("Error al iniciar sesión:", err);
          setError("Error al iniciar sesión");
        } else {
          setError("Error desconocido al iniciar sesión");
        }
      });
    };

    handleAuthentication();
  }, []);

  const handleSignOut = () => {
    webAuth.logout({
      returnTo: `http://localhost:5173/Login`, // URL a la que redirigir después de cerrar sesión
      clientID: Ath0Config.clientID,
    });
  };

  return (
    <>
      {userData ? (
        <div>
          <h1>Bienvenido, {userData.name}</h1>
          <p>Email: {userData.email}</p>
          <button onClick={handleSignOut}>Cerrar Sesión</button>
          {/* Otros detalles del usuario */}
        </div>
      ) : (
        <div>
          <h1>Inicia sesión para ver tu perfil</h1>
          {error && <p>{error}</p>}
          <a href="http://localhost:5173/Login">Inicia Sesion</a>
        </div>
      )}
    </>
  );
};

export default Home;
