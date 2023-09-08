import "./CurrentScores.css";

import { useAuth } from "../../contexts/authContext";
import { getScoresAñoActual } from "../../services/API_proyect/scores.service";
import { useEffect, useState } from "react";

const CurrentScores = () => {
  const [anno, setAnno] = useState();
  const [pruebas, setPruebas] = useState({ data: [] });
  const { user } = useAuth();

  useEffect(() => {
    const date = new Date();
    setAnno(date.getFullYear());
    (async () => {
      setPruebas(await getScoresAñoActual());
    })();
  }, []);

  useEffect(() => {
    console.log(pruebas.data);
  }, [pruebas]);
  return (
    <>
      <div className="scoresactual">
        <h1>Puntuaciones temporada {anno}</h1>
        <div>
          <h3>{user?.user}</h3>
          <table>
            {pruebas.data.map((element) => (
              <tbody key={element._id}>
                <tr>
                  <td className="prueba">
                    <p>{element.prueba.name}</p>
                  </td>
                  <td className="nivel">
                    <p>{element.prueba.nivel}</p>
                  </td>
                  <td className="prueba">
                    <p>{element.prueba}</p>
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

export default CurrentScores;