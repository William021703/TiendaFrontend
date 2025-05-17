import { useState } from "react";
import "./loging.css";
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
    <div className="formulario">
      <img
        src="https://media.istockphoto.com/id/1333438263/es/foto/sala-de-juegos-por-la-noche-con-luz-de-ne%C3%B3n-silla-de-juegos-altavoces-y-monitor-de-computadora.jpg?s=1024x1024&w=is&k=20&c=Is4ztDkwq9iHLncMVWQamQyGi6xvFY5Jae9dBttxavk="
        alt="img"
      />
      <form>
        <div className="form">
          <div className="input">
            <h1>Login</h1>
            <input
              placeholder="Usuario...."
              className="input-text"
              type="text"
              name="nombre"
              value={logging.nombre}
              onChange={HandleLoggin}
            />

            <input
              className="input-text"
              placeholder="Password....."
              type="password"
              name="contrasena"
              value={logging.contrasena}
              onChange={HandleLoggin}
            />

            <button className="btn" type="submit" onClick={Login}>
              Iniciar Sesion
            </button>
          </div>
        </div>
      </form>
      <span
        style={{
          position: "absolute",
          bottom: "110px",
          cursor: "grab",
        }}
        onClick={HandleAbrirCerrar}
      >
        {!abrirCerrar ? (
          "Crear usuario"
        ) : (
          <div className="contenedor-fullCrearUsuario">
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
