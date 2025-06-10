import { Rutas } from "./rutas/Rutas";
import { DatosCarritoProvider } from "./componentesfail/DatosParaCarrito";
import { PermisosId } from "./componentesfail/PermisosId";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <PermisosId>
          <DatosCarritoProvider>
            <Rutas />
          </DatosCarritoProvider>
        </PermisosId>
      </Router>
    </div>
  );
}

export default App;
