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
    fetch(`https://tienda-production-852a.up.railway.app/${id}`)
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

    fetch(`https://tienda-production-852a.up.railway.app/${id}`, {
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
    <div>
      <div style={{ position: "relative", display: "inline-block" }}>
        <ShoppingCart size={32} color="blue" />
        <span
          onClick={abritModal}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            background: "red",
            color: "white",
            borderRadius: "50%",
            padding: "4px 8px",
            fontSize: "10px",
            fontWeight: "bold",
            cursor: "grab",
          }}
        >
          {contadorArticulos.length}
        </span>
      </div>
      {mostrarModal && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            background: "rgba(145, 66, 66, 0.5)",
            width: "300px",
            minHeight: "30px",
            cursor: "pointer",
            right: "0px",
            borderRadius: "20px",
            fontSize: "10px",
          }}
        >
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              margin: "10px",
            }}
          >
            {contadorArticulos.map((item) => (
              <li
                key={item.producto_id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "3px solid #ccc",
                  gap: "40px",
                }}
              >
                <img
                  src={item.img}
                  alt={item.nombre_producto}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "10px",
                  }}
                />
                <h1>{item.nombre_producto} </h1>
                <h1>{item.cantidad} </h1>
                <h1>{item.precio} </h1>
              </li>
            ))}
          </ul>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "8px",
              gap: "4px",
            }}
          >
            <button
              style={{
                width: "100px",
                height: "20px",
                background: "green",
                borderRadius: "10px",
                cursor: "grab",
              }}
              onClick={HandleCarrito}
            >
              Ir al carrito
            </button>
            <button
              style={{
                width: "90px",
                height: "20px",
                background: "red",
                borderRadius: "10px",
                cursor: "grab",
              }}
              onClick={cerrarModal}
            >
              Cerrar
            </button>
            <button
              style={{
                width: "90px",
                height: "20px",
                background: "red",
                borderRadius: "10px",
                cursor: "grab",
              }}
              onClick={HandleVaciarCarrito}
            >
              vaciar carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
