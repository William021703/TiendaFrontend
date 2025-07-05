import { useEffect } from "react";

export function CrearUsuario({
  nuevoUsuario,
  setNuevoUsuario,
  HandleCrearUsuario,
  setAbrirCerrar,
  setRegistrarse,
  camposRequeridos,
  setCamposRequeridos,
}) {
  function HandleCerrar() {
    setRegistrarse(false);
    setAbrirCerrar(true);
    console.log("hola mundo");
  }

  useEffect(() => {
    if (camposRequeridos) {
      const time = setTimeout(() => {
        setCamposRequeridos(false);
      }, 2000);
      return () => clearTimeout(time);
    }
  }, [camposRequeridos]);

  function HandleInputChange(e) {
    const { name, value } = e.target;
    setNuevoUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="w-full h-screen max-sm:flex-col flex flex-col relative items-center justify-center bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% z-10  ">
      <button
        type="button"
        onClick={HandleCerrar}
        className="text-xl font-bold w-60 h-10 rounded-2xl bg-radial-[at_50%_75%] from-sky-200 via-blue-400 
        to-indigo-900 to-90%  left-0.5 cursor-pointer"
      >
        Cerrar
      </button>

      <form className="w-96 h-96 flex rounded-2xl border-transparent  flex-col justify-evenly items-center shadow-xl animate-pulse">
        <div className="flex flex-col gap-1.5">
          <label className="text-2xl px-4" htmlFor="nombre">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={nuevoUsuario.nombre}
            onChange={HandleInputChange}
            className="w-60 h-10 px-4 border-0 border-b-2 border-blue-500 
            focus:outline-none text-2xl cursor-pointer"
          />
          <h1 className="text-sm text-amber-600">
            {camposRequeridos ? "Todos los campos son requeridos" : ""}
          </h1>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-2xl px-4" htmlFor="apellido">
            Apellido
          </label>
          <input
            type="text"
            name="apellido"
            value={nuevoUsuario.apellido}
            onChange={HandleInputChange}
            className="w-60 h-10 px-4 border-0 border-b-2 border-blue-500 
            focus:outline-none text-2xl cursor-pointer"
          />
          <h1 className="text-sm text-amber-600">
            {camposRequeridos ? "Todos los campos son requeridos" : ""}
          </h1>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-2xl px-4" htmlFor="contrasena">
            Password
          </label>
          <input
            type="password"
            name="contrasena"
            value={nuevoUsuario.contrasena}
            onChange={HandleInputChange}
            className="w-60 h-10 px-4 border-0 border-b-2 border-blue-500 
            focus:outline-none text-2xl cursor-pointer"
          />
          <h1 className="text-sm text-amber-600">
            {camposRequeridos ? "Todos los campos son requeridos" : ""}
          </h1>
        </div>

        <button
          type="submit"
          onClick={HandleCrearUsuario}
          className="w-60 h-10 border-2 rounded-xl mt-2 bg-gradient-to-r from-cyan-500 
          to-blue-500 hover:from-purple-500 hover:to-pink-500 transition cursor-pointer"
        >
          Crear usuario
        </button>
      </form>
    </div>
  );
}
