import "./App.css";
import { Rutas } from "./rutas/Rutas";
import { DatosCarritoProvider } from "./componentesfail/DatosParaCarrito";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <DatosCarritoProvider>
          <Rutas />
        </DatosCarritoProvider>
      </Router>
    </div>
  );
}

export default App;
