import { createContext, useContext, useState } from "react";

export const DatosCarritoContext = createContext();

export const DatosCarritoProvider = ({ children }) => {
  const [contadorArticulos, setContadorArticulos] = useState([]);

  return (
    <DatosCarritoContext.Provider
      value={{
        contadorArticulos,
        setContadorArticulos,
      }}
    >
      {children}
    </DatosCarritoContext.Provider>
  );
};
