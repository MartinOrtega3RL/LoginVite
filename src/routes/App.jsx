import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../container/Home.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Añade más rutas aquí */}
      </Routes>
    </BrowserRouter>
  );
}
