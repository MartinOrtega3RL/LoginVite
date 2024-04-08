import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../container/Home.jsx";
import Login from "../components/Login.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/Home" element={<Home/>} />

        {/* Añade más rutas aquí */}
      </Routes>
    </BrowserRouter>
  );
}
