import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { CrearUsuario } from "../components/CrearUsuario";

export function Loging() {
  const [logging, setLogging] = useState({
    nombre: "",
    contrasena: "",
  });
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    apellido: "",
    contrasena: "",
    rol_id: 4,
  });
  const [abrirCerrar, setAbrirCerrar] = useState(false);

  const navigate = useNavigate();

  function HandleLoggin(e) {
    const { name, value } = e.target;
    setLogging((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function Login(e) {
    e.preventDefault();
    if (logging.nombre == "" || logging.contrasena == "") {
      alert("Ambos campos son requeridos");
      return;
    }
    try {
      const response = await fetch(
        "https://tienda-production-852a.up.railway.app/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },

          body: JSON.stringify(logging),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en el servidor");
      }
      const datos = await response.json();
      console.log(datos.usuario);
      localStorage.setItem("token", datos.token);
      localStorage.setItem("usuario", JSON.stringify(datos.usuario));
      setLogging({ nombre: "", contrasena: "" });
      navigate("/productos");
    } catch (error) {
      return error;
    }
  }

  function HandleAbrirCerrar() {
    setAbrirCerrar(true);
  }

  async function HandleCrearUsuario(e) {
    e.preventDefault();
    if (
      nuevoUsuario.nombre == "" ||
      nuevoUsuario.apellido == "" ||
      nuevoUsuario.contrasena == ""
    ) {
      alert("Todos los  campos son requeridos");
    }
    try {
      const response = await fetch(
        "https://tienda-production-852a.up.railway.app/nuevoUsuario",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(nuevoUsuario),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en el servidor");
      }
      const datos = await response.json();
      console.log(datos);
      setNuevoUsuario({
        nombre: "",
        apellido: "",
        contrasena: "",
      });
      setAbrirCerrar(false);

      navigate("/productos");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full h-screen bg-slate-800 relative ">

     <div className="size-96 rounded-full bg-radial-[at_25%_25%] from-white to-zinc-900 to-75% absolute bottom-60 right-28 animate-[pulse_5s_ease_infinite]"></div>

      <div className="w-8 h-8 bg-cyan-50 border-4 blur-sm border-indigo-600 rounded-full shadow-[0_0_10px_#4F46E5] absolute left-96"></div>
      <div className="w-8 h-8 bg-cyan-50 rounded-full absolute left-96 top-14 "></div>
      <div className="w-2 h-2 bg-cyan-50 rounded-full absolute"></div>
      <div className="w-2 h-2 bg-cyan-50 rounded-full absolute"></div>
      <div className="w-2 h-2 bg-cyan-50 rounded-full absolute"></div>
      <div className="w-2 h-2 bg-cyan-50 rounded-full absolute"></div>
      <div className="w-2 h-2 bg-cyan-50 rounded-full absolute"></div>
      <div className="w-2 h-2 bg-cyan-50 rounded-full absolute"></div>
      <div className="w-2 h-2 bg-cyan-50 rounded-full absolute"></div>
      <div className="w-2 h-2 bg-cyan-50 rounded-full absolute"></div>
      <div className="w-2 h-2 bg-cyan-50 rounded-full absolute"></div>
      <div className="w-2 h-2 bg-cyan-50 rounded-full absolute"></div>

      <form>
        <div>
          <div>
            <h1>Login</h1>
            <input
              placeholder="Usuario...."
              type="text"
              name="nombre"
              value={logging.nombre}
              onChange={HandleLoggin}
            />

            <input
              placeholder="Password....."
              type="password"
              name="contrasena"
              value={logging.contrasena}
              onChange={HandleLoggin}
            />

            <button type="submit" onClick={Login}>
              Iniciar Sesion
            </button>
          </div>
        </div>
      </form>
      <span onClick={HandleAbrirCerrar}>
        {!abrirCerrar ? (
          "Crear usuario"
        ) : (
          <div>
            <span onClick={HandleAbrirCerrar}>
              <CrearUsuario
                nuevoUsuario={nuevoUsuario}
                setNuevoUsuario={setNuevoUsuario}
                HandleCrearUsuario={HandleCrearUsuario}
                setAbrirCerrar={setAbrirCerrar}
                HandleAbrirCerrar={HandleAbrirCerrar}
              />
            </span>
          </div>
        )}
      </span>
    </div>
  );
}

/*<div className="contenedor-fullCrearUsuario">
              <span onClick={HandleAbrirCerrar}>
                <CrearUsuario
                  nuevoUsuario={nuevoUsuario}
                  setNuevoUsuario={setNuevoUsuario}
                  funcion={HandleCrearUsuario}
                />
              </span>
            </div>*/
