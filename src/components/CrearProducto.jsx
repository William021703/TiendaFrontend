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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <form
        onSubmit={HandleAgregarProducto}
        className="relative flex flex-col gap-4 bg-white w-80 p-6 rounded-xl shadow-lg"
      >
        
        <button
          type="button"
          onClick={modalAbrirCerrar}
          className="absolute right-3 top-3 text-gray-500 hover:text-red-500 transition cursor-pointer 
          "
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-center">Agregar Producto</h2>

        <input
          placeholder="Nombre del producto"
          type="text"
          value={nuevoProducto.nombre}
          onChange={HandleInputChange}
          name="nombre"
          className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 
          focus:ring-blue-500 cursor-pointer"
        />

        <input
          placeholder="Descripción del producto"
          type="text"
          value={nuevoProducto.descripcion}
          onChange={HandleInputChange}
          name="descripcion"
          className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 
          focus:ring-blue-500 cursor-pointer"
        />

        <input
          placeholder="URL imagen del producto"
          type="text"
          value={nuevoProducto.img}
          onChange={HandleInputChange}
          name="img"
          className="border rounded-md px-3 py-2 text-sm focus:outline-none
           focus:ring-2 focus:ring-blue-500 cursor-pointer"
        />

        <input
          placeholder="Precio"
          type="number"
          value={nuevoProducto.precio}
          onChange={HandleInputChange}
          name="precio"
          className="border rounded-md px-3 py-2 text-sm focus:outline-none 
          focus:ring-2 focus:ring-blue-500 cursor-pointer"
        />

        <input
          placeholder="Cantidad"
          type="number"
          value={nuevoProducto.cantidad}
          onChange={HandleInputChange}
          name="cantidad"
          className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2
           focus:ring-blue-500 cursor-pointer"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2
           rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          Agregar
        </button>
      </form>
    </div>
  );
}
