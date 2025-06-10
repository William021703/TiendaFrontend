import { createContext, useState } from "react";

export const PermisosContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuarioId, setUsuarioId] = useState(null);

  return (
    <UserContext.Provider value={{ usuarioId, setUsuarioId }}>
      {children}
    </UserContext.Provider>
  );
};
