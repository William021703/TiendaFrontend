import { Centro } from "../components/Centro";
import { TopNombre } from "../components/TopNombre";
import { Carrito } from "../components/Carrito";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AgregarProducto } from "../components/CrearProducto";

export function Contenido() {
  const [conseguirUsuarioId, setConseguirUsuarioId] = useState({});
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    img: "",
    cantidad: "",
  });
  const [permisos, setPermisos] = useState();
  const [abrirCerrar, setAbrirCerrar] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const usuarioRaw = localStorage.getItem("usuario");
      const usuario = usuarioRaw ? JSON.parse(usuarioRaw) : null;
      const id = usuario?.id;

      if (id) {
        fetch(`https://tienda-production-852a.up.railway.app/usuario/${id}`)
          .then((resultado) => resultado.json())
          .then((datos) => {
            setConseguirUsuarioId(datos);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (error) {
      console.error("Error al parsear usuario:", error);
      navigate("/login");
    }
  }, []);

  function HandleAbrirCerrar() {
    setAbrirCerrar(true);
  }

  async function HandleAgregarProducto(e) {
    e.preventDefault();
    if (
      !nuevoProducto.nombre ||
      !nuevoProducto.descripcion ||
      !nuevoProducto.precio ||
      !nuevoProducto.img ||
      !nuevoProducto.cantidad
    ) {
      alert("todos los campos son requeridos");
    }
    let obj = {};
    obj = {
      nombre: nuevoProducto.nombre,
      descripcion: nuevoProducto.descripcion,
      img: nuevoProducto.img,
      precio: parseInt(nuevoProducto.precio),
      cantidad: parseInt(nuevoProducto.cantidad),
    };
    try {
      fetch(`https://tienda-production-852a.up.railway.app/crearProductos`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(obj),
      }).then((response) => {
        if (!response.ok) {
          throw new Error("no funciona");
        }
        const datos = response.json();
        console.log(datos);
      });
    } catch (error) {
      console.error(error);
    }
    setNuevoProducto({
      nombre: "",
      descripcion: "",
      precio: "",
      img: "",
      cantidad: "",
    });
    setAbrirCerrar(false);
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="bg-amber-50 w-full h-14 flex items-center justify-between px-4 fixed top-0 z-20">
        <h1 className="text-lg font-bold">Ropa deportiva</h1>
        <Carrito />
      </div>

      <div className="h-14" />

      <div className="flex-grow overflow-y-auto px-4 pb-14">
        <Centro />
      </div>

      <div className="bg-amber-50 w-full h-14 flex items-center justify-between px-4 fixed bottom-0 z-20">
        <TopNombre usuarioInfo={conseguirUsuarioId} />
        {permisos != 4 && (
          <div>
            {abrirCerrar ? (
              <AgregarProducto
                nuevoProducto={nuevoProducto}
                setNuevoProducto={setNuevoProducto}
                HandleAgregarProducto={HandleAgregarProducto}
                setAbrirCerrar={setAbrirCerrar}
              />
            ) : (
              <button onClick={HandleAbrirCerrar}>Agregar Producto</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
