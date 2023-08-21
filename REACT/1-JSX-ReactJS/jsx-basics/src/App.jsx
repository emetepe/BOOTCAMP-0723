import { useState } from "react";
import "./App.css";

const App = () => {
  /* Apartado 2 - Usamos useState para controlar los estados */
  const [time, setTime] = useState(0);
  /* Apartados 3 y 4 - Declaramos un array para recorrerlo después */
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
  const listNumbers = numbers.map((numbers) => <li key={numbers.toString()}>{numbers}</li>);

  return (
    <>
      {/* Apartado 2 - Renderizamos según el condicional múltiple */}
      <input type="number" onChange={(e) => setTime(e.target.value)}></input>
      <div>
        {time >= 6 && time <= 12
          ? "Buenos días"
          : time >= 13 && time <= 19
          ? "Buenas tardes"
          : (time >= 0 && time <= 6) || (time >= 20 && time <= 24)
          ? "Buenas noches"
          : "Usa una hora entre 0 y 24."}
      </div>
      {/* Apartados 3 y 4 - Recorremos los elementos de un array y los renderizamos */}
      <ul>{listNumbers}</ul>

    </>
  );
};

export default App;
