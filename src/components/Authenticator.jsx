import React, { useEffect, useState } from 'react';
import auth0 from 'auth0-js';
import Ath0Config from '../Auth0Config';
import Home from '../container/Home';

const webAuth = new auth0.WebAuth(Ath0Config);

const AuthenticatedHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const renewSession = () => {
      webAuth.checkSession({}, (err, authResult) => {
        if (err) {
          console.error('Error al renovar sesión:', err);
          setIsAuthenticated(false);
        } else {
          console.log('Sesión renovada:', authResult);
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      });
    };

    renewSession();
  }, []);

  if (isLoading) {
    return <span>Cargando Animation</span> // Muestra un spinner de carga mientras se verifica la sesión
  }

  return isAuthenticated ? <Home /> : <p>No estás autenticado</p>; // Renderiza Home solo si el usuario está autenticado
};

export default AuthenticatedHome;
