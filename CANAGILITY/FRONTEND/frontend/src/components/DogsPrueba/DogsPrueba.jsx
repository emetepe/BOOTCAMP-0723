import "./DogsPrueba.css";

import { getScoresMisDogs } from "../../services/API_proyect/pruebas.service";
import { useEffect, useState } from "react";

const DogsPrueba = () => {
  const [dogs, setDogs] = useState({ data: [] });

  useEffect(() => {
    (async () => {
      setDogs(await getScoresMisDogs());
    })();
  }, []);

  useEffect(() => {
    console.log(dogs?.data);
  }, [dogs]);

  return (
    <>
      <div className="dogsprueba">
        <h1>Perros prueba</h1>
        <h2 className="negro">
          {dogs?.data?.name} {dogs?.data?.nivel}
        </h2>
        <div>
          <table className="tablaDogsPrueba">
            {dogs?.data?.dogsScores?.map((element) => (
              <tbody key={element.name}>
                <tr>
                  <td className="nombre">
                    <p>{element.name}</p>
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

export default DogsPrueba;