import "./DeleteScore.css";

import Swal from "sweetalert2";
import PositionCard from "../PositionCard/PositionCard";
import { useEffect, useState } from "react";
import { getScoresMisDogs } from "../../services/API_proyect/pruebas.service";
import { deleteScores } from "../../services/API_proyect/scores.service";


const DeleteScore = () => {
  const [scores, setScores] = useState({ data: { ScoresDogs: [] } });
  const [dogCurrent, setDogCurrent] = useState("");
  const [res, setRes] = useState({});

  const borrar = async () => {
    setRes(await deleteScores(dogCurrent));
  };

  useEffect(() => {
    (async () => {
      setScores(await getScoresMisDogs());
    })();
  }, []);

  useEffect(() => {
    console.log(dogCurrent);
  }, [dogCurrent]);

  useEffect(() => {
    console.log(scores?.data.ScoresDogs);
  }, [scores]);

  useEffect(() => {
    console.log(res);
    if (res?.status == 200) {
      Swal.fire({
        icon: "success",
        title: "Puntuación Borrada",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [res]);

  return (
    <>
      <div className="borrarScore">
        <h1>Borrar Nota</h1>
        <div className="div-BorrarScore">
          <div>
            <h2 className="h2BorrarScore">
              {scores?.data?.name} {scores?.data?.nivel}
            </h2>
          </div>
          <div>
            <PositionCard
              data={scores?.data.ScoresDogs}
              setAlumn={setDogCurrent}
            />
          </div>
          <button className="buttonBorrarScore" onClick={() => borrar()}>
            Borrar
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteScore;