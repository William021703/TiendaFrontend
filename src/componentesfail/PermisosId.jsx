import { createContext, useState, useEffect } from "react";

export const PermisosContext = createContext();

export const PermisosId = ({ children }) => {
  const [usuarioId, setUsuarioId] = useState(() => {
    //  esto sirve para leer del localStorage al iniciar porque el use context solo sirve en memoria
    return localStorage.getItem("usuarioId") || null;
  });

  useEffect(() => {
    if (usuarioId) {
      localStorage.setItem("usuarioId", usuarioId);
    } else {
      localStorage.removeItem("usuarioId");
    }
  }, [usuarioId]);

  return (
    <PermisosContext.Provider value={{ usuarioId, setUsuarioId }}>
      {children}
    </PermisosContext.Provider>
  );
}