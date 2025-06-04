import { useEffect, useState } from "react";

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
  const [abrirCerrar, setAbrirCerrar] = useState(true);
  const [registrarse, setRegistrarse] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      const user = JSON.parse(usuarioGuardado);
      if (user?.id) {
        navigate("/productos");
      }
    }
  }, []);

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
    setRegistrarse(true);
  }

  async function HandleCrearUsuario(e) {
    e.preventDefault();
    if (
      nuevoUsuario.nombre === "" ||
      nuevoUsuario.apellido === "" ||
      nuevoUsuario.contrasena === ""
    ) {
      alert("Todos los  campos son requeridos");
      return;
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
        rol_id: 4,
      });
      setAbrirCerrar(true);
      setRegistrarse(false)
      console.log('funciono')

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className="w-full h-screen bg-linear-to-r from-cyan-500 to-blue-500 relative">
        <div className="w-3 h-3 bg-white rounded-full absolute left-[69%] top-[50%] shadow-[0_0_15px_5px_white] before:content-[''] before:absolute before:w-12 before:h-[2px] before:bg-gradient-to-r before:from-white before:to-transparent before:top-1/2 before:left-full before:translate-y-[-50%] elemento-animado "></div>
        <div className="w-3 h-3 bg-white rounded-full absolute left-[30%] top-[29%] shadow-[0_0_15px_5px_white] before:content-[''] before:absolute before:w-12 before:h-[2px] before:bg-gradient-to-r before:from-white before:to-transparent before:top-1/2 before:left-full before:translate-y-[-50%] elemento-animado"></div>
        <div className="w-3 h-3 bg-white rounded-full absolute left-[90%] top-[78%] shadow-[0_0_15px_5px_white] before:content-[''] before:absolute before:w-12 before:h-[2px] before:bg-gradient-to-r before:from-white before:to-transparent before:top-1/2 before:left-full before:translate-y-[-50%] elemento-animado"></div>
        <div className="w-3 h-3 bg-white rounded-full absolute left-[9%] top-[48%] shadow-[0_0_15px_5px_white] before:content-[''] before:absolute before:w-12 before:h-[2px] before:bg-gradient-to-r before:from-white before:to-transparent before:top-1/2 before:left-full before:translate-y-[-50%] elemento-animado"></div>
        <div className="w-3 h-3 bg-white rounded-full absolute left-[80%] top-[95%] shadow-[0_0_15px_5px_white] before:content-[''] before:absolute before:w-12 before:h-[2px] before:bg-gradient-to-r before:from-white before:to-transparent before:top-1/2 before:left-full before:translate-y-[-50%]  elemento-animado"></div>
        <div className="w-3 h-3 bg-white rounded-full absolute left-[20%] top-[65%] shadow-[0_0_15px_5px_white] before:content-[''] before:absolute before:w-12 before:h-[2px] before:bg-gradient-to-r before:from-white before:to-transparent before:top-1/2 before:left-full before:translate-y-[-50%] elemento-animado"></div>
        <div className="w-3 h-3 bg-white rounded-full absolute left-[68%] top-[80%] shadow-[0_0_15px_5px_white] before:content-[''] before:absolute before:w-12 before:h-[2px] before:bg-gradient-to-r before:from-white before:to-transparent before:top-1/2 before:left-full before:translate-y-[-50%] elemento-animado"></div>
        <div className="w-3 h-3 bg-white rounded-full absolute left-[55%] top-[20%] shadow-[0_0_15px_5px_white] before:content-[''] before:absolute before:w-12 before:h-[2px] before:bg-gradient-to-r before:from-white before:to-transparent before:top-1/2 before:left-full before:translate-y-[-50%] elemento-animado"></div>
        <div className="w-3 h-3 bg-white rounded-full absolute left-[40%] top-[35%] shadow-[0_0_15px_5px_white] before:content-[''] before:absolute before:w-12 before:h-[2px] before:bg-gradient-to-r before:from-white before:to-transparent before:top-1/2 before:left-full before:translate-y-[-50%] elemento-animado"></div>
        <div className="w-3 h-3 bg-white rounded-full absolute left-[1%] top-[15%] shadow-[0_0_15px_5px_white] before:content-[''] before:absolute before:w-12 before:h-[2px] before:bg-gradient-to-r before:from-white before:to-transparent before:top-1/2 before:left-full before:translate-y-[-50%] elemento-animado"></div>
        <div className="w-3 h-3 bg-white rounded-full absolute left-[60%] top-[45%] shadow-[0_0_15px_5px_white] before:content-[''] before:absolute before:w-12 before:h-[2px] before:bg-gradient-to-r before:from-white before:to-transparent before:top-1/2 before:left-full before:translate-y-[-50%] elemento-animado"></div>
        <div className="w-3 h-3 bg-white rounded-full absolute left-[10%] top-[70%] shadow-[0_0_15px_5px_white] before:content-[''] before:absolute before:w-12 before:h-[2px] before:bg-gradient-to-r before:from-white before:to-transparent before:top-1/2 before:left-full before:translate-y-[-50%] elemento-animado"></div>
        <div className="w-3 h-3 bg-white rounded-full absolute left-[79%] top-[90%] shadow-[0_0_15px_5px_white] before:content-[''] before:absolute before:w-12 before:h-[2px] before:bg-gradient-to-r before:from-white before:to-transparent before:top-1/2 before:left-full before:translate-y-[-50%] elemento-animado"></div>
        <div className="w-3 h-3 bg-white rounded-full absolute left-[86%] top-[60%] shadow-[0_0_15px_5px_white] before:content-[''] before:absolute before:w-12 before:h-[2px] before:bg-gradient-to-r before:from-white before:to-transparent before:top-1/2 before:left-full before:translate-y-[-50%] elemento-animado"></div>
        <div className="w-3 h-3 bg-white rounded-full absolute left-[50%] top-[40%] shadow-[0_0_15px_5px_white] before:content-[''] before:absolute before:w-12 before:h-[2px] before:bg-gradient-to-r before:from-white before:to-transparent before:top-1/2 before:left-full before:translate-y-[-50%] elemento-animado"></div>
        <div className="w-3 h-3 bg-white rounded-full absolute left-[18%] top-[30%] shadow-[0_0_15px_5px_white] before:content-[''] before:absolute before:w-12 before:h-[2px] before:bg-gradient-to-r before:from-white before:to-transparent before:top-1/2 before:left-full before:translate-y-[-50%] elemento-animado"></div>
        <div className="w-3 h-3 bg-white rounded-full absolute left-[5%] top-[10%] shadow-[0_0_15px_5px_white] before:content-[''] before:absolute before:w-12 before:h-[2px] before:bg-gradient-to-r before:from-white before:to-transparent before:top-1/2 before:left-full before:translate-y-[-50%] elemento-animado"></div>
        <div className="w-3 h-3 bg-white rounded-full absolute left-[30%] top-[50%] shadow-[0_0_15px_5px_white] before:content-[''] before:absolute before:w-12 before:h-[2px] before:bg-gradient-to-r before:from-white before:to-transparent before:top-1/2 before:left-full before:translate-y-[-50%] elemento-animado"></div>

        {registrarse ? (
          <CrearUsuario
            nuevoUsuario={nuevoUsuario}
            setNuevoUsuario={setNuevoUsuario}
            HandleCrearUsuario={HandleCrearUsuario}
            setRegistrarse={setRegistrarse}
            setAbrirCerrar={setAbrirCerrar}
          />
        ) : (
          <div className="bg-blur-xs backdrop-blur w-[360px] max-w-full flex flex-col absolute left-1/2 top-[25%] -translate-x-1/2 z-10 rounded-2xl p-6 items-center shadow-xl animate-pulse">
            <div>
              <h1 className="text-3xl">Login</h1>
            </div>
            <div>
              <form
                className="w-80 h-80 flex flex-col 

"
              >
                <div>
                  <div className=" bg-transparent w-full h-80 flex flex-col justify-evenly items-center ">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-2xl px-4" htmlFor="nombre">
                        Usuario
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={logging.nombre}
                        onChange={HandleLoggin}
                        className="w-60 h-10 px-4 border-0 border-b-2 border-blue-500 focus:border-blue-500 focus:outline-none text-2xl"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-2xl px-4" htmlFor="password">
                        Password
                      </label>
                      <input
                        type="password"
                        name="contrasena"
                        value={logging.contrasena}
                        onChange={HandleLoggin}
                        className="w-60 h-10 px-4 border-0 border-b-2 border-blue-500 focus:border-blue-500 focus:outline-none text-2xl"
                      />
                    </div>

                    <button
                      className="w-60 h-10 border-2 rounded-xl  bg-linear-to-r from-cyan-500 to-blue-500 hover:bg-linear-65 hover:from-purple-500 hover:to-pink-500 transition "
                      type="submit"
                      onClick={Login}
                    >
                      Iniciar Sesion
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div>
              <div>
                {abrirCerrar && (
                  <button
                    onClick={() => {
                      HandleAbrirCerrar();
                    }}
                    className="w-60 h-10 border-2 rounded-xl  bg-linear-to-r from-cyan-500 to-blue-500 hover:bg-linear-65 hover:from-purple-500 hover:to-pink-500 transition "
                  >
                    Crear Usuario
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
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
