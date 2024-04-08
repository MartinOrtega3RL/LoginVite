import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../container/Home.jsx";
import Login from "../components/Login.jsx";
import AuthenticatedHome from "../components/Authenticator.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/Home" element={<AuthenticatedHome/>} />
        {/* Añade más rutas aquí */}
      </Routes>
    </BrowserRouter>
  );
}
