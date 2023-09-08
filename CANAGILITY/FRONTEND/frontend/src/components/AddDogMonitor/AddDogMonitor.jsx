import "./AddDogMonitor.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPruebas } from "../../services/API_proyect/pruebas.service";

const AddDogCoach = () => {
  const [pruebas, setPruebas] = useState({ data: [] });
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      setPruebas(await getAllPruebas());
    })();
  }, []);

  useEffect(() => {
    console.log(pruebas?.data);
  }, [pruebas]);
  return (
    <>
      <div className="añadirdogcoach">
        <h1>Añadir Perros y Monitores</h1>
        <div className="wrapPrueba">
          {pruebas?.data?.map((element) => (
            <figure
              key={element._id}
              className="cardPrueba"
              onClick={() =>
                navigate(`/dashboard/AddDogCoach/${element._id}`)
              }
            >
              <h3 className="color">
                {element.name} {element.nivel} {element.year}
              </h3>
            </figure>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddDogCoach;