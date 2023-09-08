import "./PruebaSelect.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PositionCard from "../PositionCard/PositionCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { paginacion } from "../../util/paginacion";
import Swal from "sweetalert2";
import { addDog, addNewCoach, getPruebaById } from "../../services/API_proyect/pruebas.service";
import { getAllDogs, getAllMonitores } from "../../services/API_proyect/user.service";

const PruebaSelect = () => {
  const [prueba, setPrueba] = useState({ data: [] });
  const [dogs, setdogs] = useState({ data: [] });
  const [coaches, setCoaches] = useState({ data: { coach: [] } });
  const [coachCurrent, setCoachCurrent] = useState("");
  const [numeroP, setNumeroP] = useState(0);
  const [filterData, setFilterData] = useState([]);
  const { id } = useParams();
  const [resCoach, setResCoach] = useState({});
  const [resDog, setResDog] = useState({});

  const handleChange = (e, value) => {
    const tope = value * 3;
    const inicio = tope - 3;
    const data = dogs.data.slice(inicio, tope);
    setFilterData(data);
  };
  const addDog = async (iddog) => {
    console.log(iddog._id);
    const formData = { idDog: iddog._id };
    setResDog(await addDog(id, formData));
  };
  const addCoach = async () => {
    const formData = { idcoach: coachCurrent };
    setResCoach(await addNewCoach(id, formData));
  };
  useEffect(() => {
    (async () => {
      setPrueba(await getPruebaById(id));
      setCoaches(await getAllMonitores());
      setdogs(await getAllDogs());
    })();
  }, []);
  useEffect(() => {
    console.log(prueba?.data);
  }, [prueba]);
  useEffect(() => {
    console.log(coaches?.data?.coach);
  }, [coaches]);
  useEffect(() => {
    console.log(dogs?.data);
    setNumeroP(paginacion(dogs?.data, 3));
  }, [dogs]);

  useEffect(() => {
    console.log(resCoach);
    if (resCoach?.status == 200) {
      Swal.fire({
        icon: "success",
        title: "Monitor Añadido",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [resCoach]);

  useEffect(() => {
    console.log(resDog);
    if (resDog?.status == 200) {
      Swal.fire({
        icon: "success",
        title: "Perro Añadido",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [resDog]);

  return (
    <div className="pruebaselect">
      <h1>
        {prueba?.data.name} {prueba?.data.nivel} {prueba?.data.year}
      </h1>
      <div className="flexWrapMonitores">
        {JSON.stringify(prueba?.data.coach) == "[]" && (
          <div className="carruselMonitores">
            <figure>
              <h3 className="negro">Monitores</h3>
              <PositionCard
                data={coaches?.data}
                setDog={setCoachCurrent}
              />
            </figure>
            <button onClick={() => addCoach()}>Añadir Monitor</button>
          </div>
        )}
      </div>
      <div className="flexDogs">
        <h3 className="negro">Perros</h3>
        <div className="flexWrapDogs">
          {filterData.length > 0
            ? filterData?.map((element) => (
                <figure key={element._id} className="figureDogs">
                  <img src={element.image} alt={element.name} />
                  <p className="negro">{element.name}</p>
                  <button onClick={() => addDog(element)}>
                    Añadir Perro
                  </button>
                </figure>
              ))
            : dogs.data.slice(0, 3).map((element) => (
                <figure key={element._id} className="figureDogs">
                  <img src={element.image} alt={element.name} />
                  <p className="negro">{element.name}</p>
                  <button onClick={() => addDog(element)}>
                    Añadir Perro
                  </button>
                </figure>
              ))}
        </div>
        <Stack spacing={2}>
          <Pagination count={numeroP} onChange={handleChange} />
        </Stack>
      </div>
    </div>
  );
};

export default PruebaSelect;