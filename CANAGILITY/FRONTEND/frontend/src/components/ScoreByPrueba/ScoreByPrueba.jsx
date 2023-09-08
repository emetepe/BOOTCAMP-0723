import "./ScoreByPrueba.css";

import { getAllPruebasDog } from "../../services/API_proyect/pruebas.service";
import { getOneScore } from "../../services/API_proyect/scores.service";
import { useEffect, useState } from "react";

const ScorePorPrueba = () => {
  const [pruebas, setPruebas] = useState({ data: [] });
  const [prueba, setPrueba] = useState();
  const [pruebaver, setPruebaver] = useState();

  useEffect(() => {
    (async () => {
      setPruebas(await getAllPruebasDog());
    })();
  }, []);

  useEffect(() => {
    console.log(prueba);
    if (prueba !== undefined) {
      (async () => {
        setPruebaver(await getOneScore(prueba));
      })();
    }
  }, [prueba]);

  useEffect(() => {
    console.log(pruebas);
    console.log(prueba);
  }, [prueba, pruebas]);

  useEffect(() => {
    console.log(pruebaver);
  }, [pruebaver]);
  return (
    <>
      <div className="scoreporprueba">
        <h1>Puntuación por prueba</h1>
        <select
          onChange={(e) => {
            setPrueba(e.target.value);
          }}
        >
          <option value={pruebas?.data[0]?._id}>Prueba</option>
          {pruebas?.data?.length > 0 &&
            pruebas.data.map((element) => (
              <option key={element._id} value={element._id}>
                {element.name} {element.nivel}
              </option>
            ))}
          {pruebas?.data?.length === 0 && <option>Cargando</option>}
        </select>
        {prueba !== undefined && (
          <table>
            <tbody>
              <tr>
                <td className="prueba3">
                  <p>{pruebaver?.data?.name}</p>
                </td>
                <td className="score3">
                  <p>{pruebaver?.data?.nivel}</p>
                </td>
                <td className="score4">
                  <p>{pruebaver?.data?.score}</p>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ScorePorPrueba;