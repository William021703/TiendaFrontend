import { createContext, useState } from "react";

export const PermisosContext = createContext();

export const PermisosId = ({ children }) => {
  const [usuarioId, setUsuarioId] = useState(null);

  return (
    <PermisosContext.Provider value={{ usuarioId, setUsuarioId }}>
      {children}
    </PermisosContext.Provider>
  );
};
