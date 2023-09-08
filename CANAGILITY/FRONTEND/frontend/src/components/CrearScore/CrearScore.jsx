import "./CrearScore.css";

import Swal from "sweetalert2";
import PositionCard from "../PositionCard/PositionCard";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getMisDogs } from "../../services/API_proyect/user.service";
import { createScore } from "../../services/API_proyect/scores.service";

const CrearScore = () => {
  const [dogs, setDogs] = useState({ data: { dog: [] } });
  const [dogCurrent, setDogCurrent] = useState("");
  const { register, handleSubmit } = useForm();
  const [send, setSend] = useState(false);
  const [res, setRes] = useState({});
  const formSubmit = async (FormData) => {
    setSend(true);
    const data = { ...FormData, dog: dogCurrent };
    setRes(await createScore(data));
    setSend(false);
  };

  useEffect(() => {
    (async () => {
      setDogs(await getMisDogs());
    })();
  }, []);

  useEffect(() => {
    console.log(res);
    if (res?.status == 200) {
      Swal.fire({
        icon: "success",
        title: "Puntuación Creada",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [res]);

  useEffect(() => {
    console.log(dogs);
  }, [dogs]);

  return (
    <div className="crearscore">
      <h1 className="tituloCrearScore">Crear Puntuación</h1>
      <div className="div-crearScore">
        <h2 className="negro">
          {dogs?.data?.name} {dogs?.data?.nivel} {dogs?.data?.year}
        </h2>
        <div>
          {dogs?.data?.dog?.length > 0 ? (
            <PositionCard
              data={dogs?.data?.dog}
              setDogs={setDogCurrent}
            />
          ) : (
            <p className="negro">Cargando</p>
          )}
        </div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="name-container1 form-group">
            <label htmlFor="custom-input" className="custom-placeholder">
              <p className="pCrearScore">Agregar puntuación al perro</p>
            </label>
            <input
              className="input-score"
              type="text"
              id="score"
              name="score"
              autoComplete="false"
              {...register("score", { required: true })}
            />

            <div className="btn-container">
              <button
                className="btn"
                type="submit"
                disabled={send}
                style={{ background: send ? "#ff914d" : "#ff914d" }}
              >
                Crear
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearScore;