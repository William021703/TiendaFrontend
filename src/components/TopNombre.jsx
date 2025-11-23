import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function TopNombre({ usuarioInfo }) {
  const [siglas, setSiglas] = useState("");
  const [cerrarSesion, setCerrarSesion] = useState(true);

  const navigate = useNavigate();
  function HandleCerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    navigate("/");
  }

  useEffect(() => {
    let name = usuarioInfo.nombre + " " + usuarioInfo.apellido;
    let juntar = "";

    for (let i = 0; i < name.length; i++) {
      if (i == 0 || name[(i, i - 1)] == " ") {
        juntar += name[i];
      }
    }

    setSiglas(juntar.toUpperCase());
  }, [usuarioInfo]);

  const ponerCerrarSesion = ()=>{
    setCerrarSesion(false)
  }
   const ponerSigla = ()=>{
    setCerrarSesion(true)
  }

  return (
    <div>
      <button
        className="hover:border-b-2 border-b-0 cursor-pointer
      hover:border-indigo-500 px-4 py-2 transition-color duration-300"
        onClick={HandleCerrarSesion}
        onMouseEnter={ponerCerrarSesion}
        onMouseLeave={ponerSigla}
      >
        {cerrarSesion? siglas : "Cerrar Sesion"}
      </button>
    </div>
  );
}
