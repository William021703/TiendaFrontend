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
    let usuario = parseInt(JSON.parse(localStorage.getItem("usuario")));
    if (usuario) {
       const id = usuario?.id
  if(id) { 
    fetch(`https://tienda-production-852a.up.railway.app/carrito/${id}`)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setArticulos(data);
      })
      .catch((error) => {
        console.error(error);
      });
}
    }


 
  }, []);

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

       
        console.log('el pago se hizo')
      });
  }

  function HandleVaciarCarrito() {
    let usuario = parseInt(JSON.parse(localStorage.getItem("usuario")));
    if (usuario) {
      const id = usuario?.id
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
        setArticulos([])
      })
      .catch((error) => {
        console.error(error);
      });
    }
    
   
  }

  return (
    <div
      style={{
        display: "grid",

        height: "100vh",
        overflow: "auto",
      }}
    >
      <div
        style={{
          flex: "7",

          paddingTop: "20px",
        }}
      >
        <button
          style={{
            display: "flex",
            cursor: "grab",
            transition: "background-color 0.3s ease",
            background: "lightgray",
            margin: "5px",
          }}
          onClick={() => {
            HandleRegresar();
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "lightblue";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "lightgray";
          }}
        >
          regresar
        </button>

        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {articulos.map((item) => (
            <li
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "70%",
                height: "100px",

                borderBottom: "1px solid black",
                alignItems: "center",
              }}
              className="objeto"
              key={item.producto_id}
            >
              <div>
                <img
                  src={item.img}
                  alt={item.nombre}
                  style={{
                    width: "100px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="">
                <h1 style={{ fontSize: "20px" }}>{item.precio} </h1>
              </div>
              <div style={{ alignItems: "center" }}>
                <h1 style={{ fontSize: "20px" }}>{item.cantidad} </h1>

                <button
                  style={{
                    width: "30px",
                    height: "20px",
                    background: "gray",
                    borderRadius: "5px",
                  }}
                  onClick={() => {
                    HandleDisminuirCantidad(item);
                    setConseguirIdApi(item.producto_id);
                  }}
                >
                  {<TbExposureMinus1 />}
                </button>

                <button
                  style={{
                    width: "30px",
                    height: "20px",
                    background: "green",
                    borderRadius: "5px",
                  }}
                  onClick={() => {
                    HandleAumentarCantidad(item);
                    setConseguirIdApi(item.producto_id);
                  }}
                >
                  {<TbExposurePlus1 />}
                </button>
              </div>
              <button
                style={{
                  width: "30px",
                  height: "50px",
                  background: "red",
                  borderRadius: "5px",
                }}
                onClick={() => {
                  HandleEliminar(item);
                }}
              >
                {<MdDelete />}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "space-evenly",
          background: "white",
          padding: "10",

          fontSize: "10px",
          position: "fixed",
          bottom: "0",
          left: "500px",
          zIndex: "10px",
        }}
      >
        <h1>Cantidad de articulos:{cantidades} </h1>
        <h1>Total a pagar:{total} </h1>
        <button
          style={{
            width: "200px",
            height: "50px",
            background: "blue",
            borderRadius: "10px",
            cursor: "grab",
            color: "white",
            fontSize: "20px",
          }}
          onClick={HandlePagar}
        >
          Comprar
        </button>
      </div>
    </div>
  );
}
