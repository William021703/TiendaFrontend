import { TbExposurePlus1 } from "react-icons/tb";
import { TbExposureMinus1 } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { Buton } from "../components/Buton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ShoppingCar() {
  const [articulos, setArticulos] = useState([]);
  const [conseguirIdApi, setConseguirIdApi] = useState(null);
  const [total, setTotal] = useState(0);
  const [cantidades, setCantidades] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const usuarioRaw = localStorage.getItem("usuario");
      const usuario = usuarioRaw ? JSON.parse(usuarioRaw) : null;

      if (!usuario?.id || !token) {
        navigate("/");
        return;
      }

      fetch(
        `https://tienda-production-852a.up.railway.app/carrito/${usuario.id}`
      )
        .then((res) => res.json())
        .then((data) => setArticulos(data))
        .catch((err) => {
          console.error(err);
          navigate("/");
        });
    } catch (error) {
      console.error("Error al leer usuario del localStorage:", error);
      navigate("/");
    }
  }, [navigate]);

  function HandleAumentarCantidad(objeto) {
    let obj = {
      usuario_id: objeto.usuario_id,
      producto_id: objeto.producto_id,
      nombre_producto: objeto.nombre_producto,
      precio: parseInt(objeto.precio),
      img: objeto.img,
      cantidad: parseInt(objeto.cantidad),
    };
    setArticulos((previ) =>
      previ.map((product) =>
        product.producto_id === obj.producto_id
          ? { ...product, cantidad: product.cantidad + 1 }
          : product
      )
    );
  }

  function HandleDisminuirCantidad(objeto) {
    let obj = {
      usuario_id: objeto.usuario_id,
      producto_id: objeto.producto_id,
      nombre_producto: objeto.nombre_producto,
      precio: objeto.precio,
      img: objeto.img,
      cantidad: objeto.cantidad,
    };
    setArticulos((previ) =>
      previ.map((product) =>
        product.producto_id === obj.producto_id && product.cantidad > 1
          ? { ...product, cantidad: product.cantidad - 1 }
          : product
      )
    );
  }
  function HandleEliminar(ids) {
    const { usuario_id, producto_id } = ids;
    let eliminar = [];
    for (let i = 0; i < articulos.length; i++) {
      if (articulos[i].producto_id !== producto_id) {
        eliminar.push(articulos[i]);
      }
    }
    setArticulos(eliminar);

    fetch(
      `https://tienda-production-852a.up.railway.app/eliminar/${usuario_id}/${producto_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("error con los articulos");
        }
        return response.json();
      })
      .then((datos) => {})
      .catch((error) => {
        console.error(error);
      });
  }
  const urlCarrito =
    "https://tienda-production-852a.up.railway.app/actualizarCarrito";

  useEffect(() => {
    if (!conseguirIdApi) {
      return;
    } else {
      let obj = {};

      for (let i = 0; i < articulos.length; i++) {
        if (articulos[i].producto_id == parseInt(conseguirIdApi)) {
          obj = {
            usuario_id: articulos[i].usuario_id,
            producto_id: articulos[i].producto_id,
            nombre_producto: articulos[i].nombre_producto,
            precio: articulos[i].precio,
            img: articulos[i].img,
            cantidad: articulos[i].cantidad,
          };
        }
      }
      fetch(urlCarrito, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((result) => {
          if (!result.ok) {
            return result.json().then((errorData) => {
              throw new Error(errorData.message || "Error en el servidor");
            });
          }
          return result.json();
        })
        .then((datos) => {})

        .catch((error) => {
          console.error("Error en el servidor:", error);
        });
    }
  }, [articulos]);

  function HandleRegresar() {
    navigate("/productos");
  }

  useEffect(() => {
    const { sumTotal, sumCantidades } = articulos.reduce(
      (acc, articulo) => {
        acc.sumTotal += articulo.precio * articulo.cantidad;
        acc.sumCantidades += articulo.cantidad;
        return acc;
      },
      { sumTotal: 0, sumCantidades: 0 }
    );
    setCantidades(sumCantidades);
    setTotal(sumTotal);
  }, [articulos]);

  function HandlePagar() {
    let obj = articulos.map((item) => {
      let ob = {
        nombre: item.nombre_producto,
        precio: item.precio,
        cantidad: item.cantidad,
        description: "sin descripcion",
      };
      return ob;
    });
    console.log(obj);
    fetch("https://tienda-production-852a.up.railway.app/pagos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ producto: obj }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "erro en el servidor");
          });
        }
        return response.json();
      })
      .then((datos) => {
        HandleVaciarCarrito();
        window.location.replace(datos);

        console.log("el pago se hizo");
      });
  }

  function HandleVaciarCarrito() {
    let usuario = localStorage.getItem("usuario");
    try {
      if (usuario) {
        const usuarioParse = usuario ? JSON.parse(usuario) : null;
        if (usuarioParse && usuarioParse.id) {
          fetch(
            `https://tienda-production-852a.up.railway.app/eliminarTodo/${usuarioParse.id}`,
            {
              method: "DELETE",
              headers: {
                "Content-type": "application/json",
              },
            }
          )
            .then((response) => {
              if (!response.ok) {
                return "hubo un error en la consulta";
              }
              const datos = response.json();
              setArticulos([]);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
    } catch (error) {
      navigate("/");
    }
  }

  return (
    <div className="bg-sky-100 min-h-full py-4 flex relative">
      <div>
        <button
          className="bg-linear-to-t from-sky-500 to-indigo-500 px-4 py-2 
          transition-colors duration-150 hover:bg-gradient-to-r from-indigo-500
           via-purple-500 to-pink-500 animate-pulse"
          onClick={() => {
            HandleRegresar();
          }}
        >
          regresar
        </button>

        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {articulos.map((item) => (
            <li
              key={item.producto_id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center gap-2"
            >
              <div className="w-full h-48 overflow-hidden rounded">
                <img
                  src={item.img}
                  alt={item.nombre}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center">
                <h1 className="text-lg font-semibold text-gray-800">
                  ${item.precio}
                </h1>
                <h1 className="text-gray-600">Cantidad: {item.cantidad}</h1>
              </div>

              <div className="flex gap-2 items-center">
                <button
                  className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                  onClick={() => {
                    HandleDisminuirCantidad(item);
                    setConseguirIdApi(item.producto_id);
                  }}
                >
                  <TbExposureMinus1 />
                </button>

                <button
                  className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                  onClick={() => {
                    HandleAumentarCantidad(item);
                    setConseguirIdApi(item.producto_id);
                  }}
                >
                  <TbExposurePlus1 />
                </button>
              </div>

              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded mt-2"
                onClick={() => HandleEliminar(item)}
              >
                <MdDelete />
              </button>
            </li>
          ))}
        </ul>

        {/* Total y botón pagar */}
        <div className="mt-8 text-center">
          <h1 className="text-xl font-medium">
            Cantidad de artículos: {cantidades}
          </h1>
          <h1 className="text-xl font-medium mb-4">Total a pagar: ${total}</h1>

          <button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-300"
            onClick={HandlePagar}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
