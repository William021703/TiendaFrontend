import { useEffect, useState } from "react";

import { Buton } from "./Buton";
import { useContext } from "react";
import { DatosCarritoContext } from "../componentesfail/DatosParaCarrito";
import { useNavigate } from "react-router-dom";
export function Centro() {
  const [producto, setProducto] = useState([]);
  const [productoParaLaDescripcion, setProductoParaLaDescripcion] = useState(
    []
  );

  const { setContadorArticulos } = useContext(DatosCarritoContext);
  const navigate = useNavigate();
  const urlProducots =
    "https://tienda-production-852a.up.railway.app/productos";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.open("https://teal-pony-fe4b61.netlify.app/");
    }
  }, [navigate]);

  useEffect(() => {
    fetch(urlProducots)
      .then((resultado) => {
        return resultado.json();
      })
      .then((datos) => {
        const dato = datos.map((item) => {
          let obj = {
            producto_id: item.producto_id,
            nombre_producto: item.nombre,
            precio: parseInt(item.precio),
            img: item.img,
            cantidad: 1,
          };
          return obj;
        });

        setProductoParaLaDescripcion(dato);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function HandleMenos(id) {
    setProductoParaLaDescripcion((previ) =>
      previ.map((product) =>
        product.producto_id === id && product.cantidad > 1
          ? { ...product, cantidad: product.cantidad - 1 }
          : product
      )
    );
  }

  function HandleMas(id) {
    setProductoParaLaDescripcion((previ) =>
      previ.map((product) =>
        product.producto_id === id
          ? { ...product, cantidad: product.cantidad + 1 }
          : product
      )
    );
  }
  //se enviara articulos al carrito. si es igual se modifica sino se agrega a la descripcion del carrito
  const urlCarrito =
    "https://tienda-production-852a.up.railway.app/actualizarCarrito";

  function HandleAgregar(articulo) {
    const usuarioRaw = localStorage.getItem("usuario");
    const conseguirInformacionUsuario = usuarioRaw
      ? JSON.parse(usuarioRaw)
      : null;
    const id = conseguirInformacionUsuario
      ? parseInt(conseguirInformacionUsuario.id)
      : null;

    if (!id) {
      navigate("/");
      return;
    }

    let obj = {
      usuario_id: id,
      producto_id: articulo.producto_id,
      nombre_producto: articulo.nombre_producto,
      precio: parseInt(articulo.precio),
      img: articulo.img,
      cantidad: parseInt(articulo.cantidad),
    };

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
        console.error("Error en HandleAgregar:", error);
      });
    setContadorArticulos((previ) => {
      const exite = previ.some(
        (item) => item.producto_id == articulo.producto_id
      );
      if (exite) {
        return previ.map((item) => {
          if (item.producto_id == articulo.producto_id) {
            return {
              ...item,
              cantidad: articulo.cantidad,
            };
          } else {
            return item;
          }
        });
      } else {
        return [...previ, articulo];
      }
    });
    setProductoParaLaDescripcion((previ) =>
      previ.map((product) =>
        product.id === articulo.id ? { ...product, cantidad: 1 } : product
      )
    );
  }

  return (
    <div>
      <div
        className="bg-linear-to-r from-cyan-500 to-blue-500
       w-full h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <ul>
          {productoParaLaDescripcion.map((product) => (
            <li className="" key={product.producto_id}>
              <img
                src={product.img}
                alt={product.nombre_producto}
                className=""
              />
              <h1>{product.nombre_producto} </h1>
              <h1></h1>
              <h1>Precio: {product.precio}$ </h1>
              <div>
                <div className="">
                  <Buton
                    clase="menos"
                    funcion={() => HandleMenos(product.producto_id)}
                    name="-"
                  />
                  <Buton
                    clase="mas"
                    funcion={() => HandleMas(product.producto_id)}
                    name="+"
                  />
                </div>
                <Buton
                  clase="agregar"
                  funcion={() => {
                    HandleAgregar(product);
                  }}
                  name="Agregar"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/*const urlCarrito = "http://localhost:3020/actualizarCarrito";

  function HandleAgregar(articulo) {
    let objetoPrueba = {};
    if (articulo.cantidadParaAgregar === 1) {
      objetoPrueba = {
        usuario_id: articulo.usuario,
        nombre_producto: articulo.nombre,
        precio: articulo.precio,
        img: articulo.img,
        cantidad: articulo.cantidadParaAgregar,
      };

      fetch(urlCarrito, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(objetoPrueba),
      })
        .then((result) => {
          if (!result.ok) {
            return result.json().then((errorData) => {
              throw new Error(errorData.message || "Error en el servidor");
            });
          }
          return result.json();
        })
        .then((datos) => {
          setContadorArticulos((previ) => {
            const existe = previ.some(
              (item) => item.nombre_producto === articulo.nombre
            );

            if (existe) {
              return previ.map((item) =>
                item.nombre_producto === articulo.nombre
                  ? {
                      ...item,
                      cantidad: articulo.cantidadParaAgregar,
                    }
                  : item
              );
            } else {
              return [...previ, articulo];
            }
          });
        })

        .catch((error) => {
          console.error("Error en HandleAgregar:", error);
        });
      return;
    }
    objetoPrueba = {
      usuario_id: articulo.usuario,
      nombre_producto: articulo.nombre,
      precio: articulo.precio,
      img: articulo.img,
      cantidad: articulo.cantidadParaAgregar,
    };
    fetch(urlCarrito, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(objetoPrueba),
    })
      .then((result) => {
        if (!result.ok) {
          return result.json().then((errorData) => {
            throw new Error(errorData.message || "Error en el servidor");
          });
        }
        return result.json();
      })
      .then(() => {
        setContadorArticulos((previ) => {
          const existe = previ.some(
            (item) => item.nombre_producto === articulo.nombre
          );

          if (existe) {
            return previ.map((item) =>
              item.nombre_producto === articulo.nombre
                ? {
                    ...item,
                    cantidad: articulo.cantidadParaAgregar,
                  }
                : item
            );
          } else {
            return [...previ, articulo];
          }
        });
      })

      .catch((error) => {
        console.error("Error en HandleAgregar:", error);
      });

    setProductoParaLaDescripcion((previ) =>
      previ.map((product) =>
        product.id === articulo.id
          ? { ...product, cantidadParaAgregar: 1 }
          : product
      )
    );
  }*/
