import { useState } from "react";
import "./crearUsuario.css";

export function CrearUsuario({
  nuevoUsuario,
  setNuevoUsuario,
  HandleCrearUsuario,
  setAbrirCerrar,
}) {
  function HandleCerrar() {
    setAbrirCerrar(false);
  }
  function HandleInputChange(e) {
    const { name, value } = e.target;
    setNuevoUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="contenedor-crearUsuario">
      <form>
        <div className="form-crearUsuario">
          <div className="input-crearUsuario">
            <button className="btn-cerrar" onClick={HandleCerrar}>
              x
            </button>
            <input
              className="input-text-crearUsuario"
              placeholder="nombre..."
              type="text"
              name="nombre"
              onChange={HandleInputChange}
              value={nuevoUsuario.nombre}
            />
            <input
              className="input-text-crearUsuario"
              placeholder="apellido..."
              type="text"
              name="apellido"
              onChange={HandleInputChange}
              value={nuevoUsuario.apellido}
            />

            <input
              className="input-text-crearUsuario"
              placeholder="password..."
              type="password"
              name="contrasena"
              onChange={HandleInputChange}
              value={nuevoUsuario.contrasena}
            />
            <button
              className="btn-crearUsuario"
              type="submit"
              onClick={HandleCrearUsuario}
            >
              Crear usuario
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
