import "./CrearPrueba.css";

import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createPrueba } from "../../services/API_proyect/pruebas.service";

const CrearPrueba = () => {
  const { register, handleSubmit } = useForm();
  const [send, setSend] = useState(false);
  const [res, setRes] = useState({});

  const formSubmit = async (formData) => {
    setSend(true);
    setRes(await createPrueba(formData));
    setSend(false);
  };

  useEffect(() => {
    console.log(res);
    if (res?.status == 200) {
      Swal.fire({
        icon: "success",
        title: "Prueba Creada",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [res]);

  return (
    <>
      <div className="crearprueba">
        <h1>Crear Prueba</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="name-container form-group">
            <input
              className="input-prueba"
              type="text"
              id="name"
              name="name"
              autoComplete="false"
              {...register("name", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Nombre
            </label>
            <div className="year-container form-group">
              <input
                className="input-prueba"
                type="number"
                id="year"
                name="year"
                autoComplete="false"
                {...register("year", { required: true })}
              />
              <label htmlFor="custom-input" className="custom-placeholder">
                Año
              </label>
            </div>
            <div className="nivel-container form-group">
              <input
                className="input-prueba"
                type="text"
                id="nivel"
                name="nivel"
                autoComplete="false"
                {...register("nivel", { required: true })}
              />
              <label htmlFor="custom-input" className="custom-placeholder">
                Nivel
              </label>
            </div>
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
    </>
  );
};

export default CrearPrueba;