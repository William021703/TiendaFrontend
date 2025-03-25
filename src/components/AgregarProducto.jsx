import { useState } from "react";

export function AgregarProducto() {
  const [agregandoProducto, setAgregandoProducto] = useState({
    nombre: agregandoProducto.nombre,
    descripcion: e.target.value,
    img: e.target.value,
    cantidad: e.target.value,
    precio: e.target.value,
  });

  return (
    <div>
      <form action="" method="post">
        <label htmlFor="">
          <input
            value={agregandoProducto.nombre}
            type="text"
            onChange={(e) => {
              setAgregandoProducto(e.target.value);
            }}
          />
        </label>
      </form>
    </div>
  );
}
