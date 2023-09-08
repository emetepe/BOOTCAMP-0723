import "./ScoresByLevel.css";

import { useEffect, useState } from "react";
import { getScoreNivel } from "../../services/API_proyect/scores.service";

const ScoresByLevel = () => {
  const [nivel, setNivel] = useState();
  const [pruebas, setPruebas] = useState();
  useEffect(() => {
    (async () => {
      setPruebas(await getScoreNivel(nivel));
    })();
  }, [nivel]);

  useEffect(() => {
    console.log(pruebas?.data);
  }, [pruebas]);

  return (
    <>
      <div className="pruebaspornivel">
        <h1>Pruebas por nivel</h1>
        <select
          onChange={(e) => {
            setNivel(e.target.value);
          }}
        >
          <option value="Iniciación">Nivel</option>
          <option value="Iniciación">Iniciación</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzado">Avanzado</option>
          <option value="Profesional">Profesional</option>
        </select>
        <div>
          <table className="tablascorespornivel">
            {pruebas?.data?.map((element) => (
              <tbody key={element.score}>
                <tr>
                  <td className="prueba">
                    <p>{element.prueba}</p>
                  </td>
                  <td className="score">
                    <p>{element.score}</p>
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

export default ScoresByLevel;