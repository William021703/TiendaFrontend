import { useState } from "react";

export function AgregarProducto({
  nuevoProducto,
  setNuevoProducto,
  HandleAgregarProducto,
  setAbrirCerrar,
}) {
  function HandleInputChange(e) {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function modalAbrirCerrar() {
    setAbrirCerrar(false);
  }
  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "300px",
          height: "400px",
          background: "blue",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <button
          style={{ position: "absolute", top: "0", right: "0" }}
          onClick={modalAbrirCerrar}
        >
          cerrar
        </button>
        <input
          placeholder="nombre del producto"
          style={{ fontSize: "15px", width: "200px", height: "20px" }}
          type="text"
          value={nuevoProducto.nombre}
          onChange={HandleInputChange}
          name="nombre"
        />
        <input
          placeholder="descripcion del producto"
          style={{ fontSize: "15px", width: "200px", height: "20px" }}
          type="text"
          value={nuevoProducto.descripcion}
          onChange={HandleInputChange}
          name="descripcion"
        />
        <input
          placeholder="imagen del producto"
          style={{ fontSize: "15px", width: "200px", height: "20px" }}
          type="text"
          value={nuevoProducto.img}
          onChange={HandleInputChange}
          name="img"
        />
        <input
          placeholder="precio del producto"
          style={{ fontSize: "15px", width: "200px", height: "20px" }}
          type="text"
          value={nuevoProducto.precio}
          onChange={HandleInputChange}
          name="precio"
        />

        <input
          placeholder="cantidad del producto"
          style={{ fontSize: "15px", width: "200px", height: "20px" }}
          type="text"
          value={nuevoProducto.cantidad}
          onChange={HandleInputChange}
          name="cantidad"
        />
        <br />
        <button
          style={{ position: "absolute", bottom: "40px" }}
          type="submit"
          onClick={HandleAgregarProducto}
        >
          Agregar
        </button>
      </form>
    </div>
  );
}
