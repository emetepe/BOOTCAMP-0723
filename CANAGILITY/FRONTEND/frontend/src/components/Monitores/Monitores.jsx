import "./Monitores.css";

import { useEffect, useState } from "react";
import { getAllMonitores } from "../../services/API_proyect/user.service";

const Profesorado = () => {
  const [monitores, setMonitores] = useState({ data: [] });

  useEffect(() => {
    (async () => {
      setMonitores(await getAllMonitores());
    })();
  }, []);

  return (
    <>
      <div className="monitores">
        <h1>Monitores</h1>
        <div>
          <table>
            {monitores.data.map((element) => (
              <tbody key={element._id}>
                <tr>
                  <td className="nombre">
                    <p>{element.name}</p>
                  </td>
                  <td className="prueba">
                    <p>
                      {element?.pruebas[0]?.name}
                    </p>
                  </td>
                  <td className="nivel">
                    <p>{element?.pruebas[0]?.nivel}</p>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default Profesorado;