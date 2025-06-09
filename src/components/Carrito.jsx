import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatosCarritoContext } from "../componentesfail/DatosParaCarrito";
import { useContext } from "react";

export function Carrito() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const { contadorArticulos, setContadorArticulos } =
    useContext(DatosCarritoContext);

  useEffect(() => {
    let id = parseInt(JSON.parse(localStorage.getItem("usuario")).id);
    fetch(`https://tienda-production-852a.up.railway.app/carrito/${id}`)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setContadorArticulos(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const navigate = useNavigate();
  function abritModal() {
    setMostrarModal(true);
  }
  function cerrarModal() {
    setMostrarModal(false);
  }
  function HandleCarrito() {
    navigate("/carrito");
  }
  if (!contadorArticulos.length) {
    return (
      <div>
        <ShoppingCart size={32} color="blue" />
      </div>
    );
  }

  function HandleVaciarCarrito() {
    let id = parseInt(JSON.parse(localStorage.getItem("usuario")).id);
    setContadorArticulos([]);

    fetch(`https://tienda-production-852a.up.railway.app/eliminarTodo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return "hubo un error en la consulta";
        }
        const datos = response.json();
      })
      .catch((error) => {
        console.error(error);
      });
    setMostrarModal(false);
  }
  return (
    <div className="relative min-w-full">
   
      <div className="flex items-center gap-2 cursor-pointer">
        <ShoppingCart size={32} color="blue" />
        <span
          onClick={abritModal}
          className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full"
        >
          {contadorArticulos.length}
        </span>
      </div>

      {mostrarModal && (
        <div className="w-96 bg-sky-200 min-h-32 overflow-y-auto right-0 top-0.5 absolute">
         <ul className="space-y-4 max-h-80 overflow-y-auto">
            {contadorArticulos.map((item) => (
              <li
                key={item.producto_id}
                className="flex  items-center gap-3 border-b-2 pb-2"
              >
                <img
                  src={item.img}
                  alt={item.nombre_producto}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex flex-col">
                  <h1 className="text-sm font-semibold text-gray-800">
                    {item.nombre_producto}
                  </h1>
                  <h1 className="text-sm text-gray-600">
                    Cantidad: {item.cantidad}
                  </h1>
                  <h1 className="text-sm text-gray-600">
                    Precio: ${item.precio}
                  </h1>
                </div>
              </li>
            ))}
          </ul>

 
          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={HandleCarrito}
              className="bg-blue-500 hover:bg-blue-600 text-white border-2 px-4 py-2 rounded transition-colors"
            >
              Ir al carrito
            </button>
            <button
              onClick={cerrarModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 border-2 px-4 py-2 rounded transition-colors"
            >
              Cerrar
            </button>
            <button
              onClick={HandleVaciarCarrito}
              className="bg-red-500 hover:bg-red-600 text-white border-2 px-4 py-2 rounded transition-colors"
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
