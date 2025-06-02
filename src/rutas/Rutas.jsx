import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Loging } from "../paginas/Loging";
import { Contenido } from "../paginas/Contenido";
import { ShoppingCar } from "../paginas/ShoppingCart";
import { CrearUsuario } from "../components/CrearUsuario";

export function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<Loging />} />
      <Route path="/productos" element={<Contenido />} />
      <Route path="/carrito" element={<ShoppingCar />} />
    </Routes>
  );
}
