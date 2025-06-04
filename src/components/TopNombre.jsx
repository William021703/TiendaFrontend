import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function TopNombre({ usuarioInfo }) {
  const [siglas, setSiglas] = useState("");

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

  return (
    <div>
      <button onClick={HandleCerrarSesion}>{siglas}</button>
    </div>
  );
}
