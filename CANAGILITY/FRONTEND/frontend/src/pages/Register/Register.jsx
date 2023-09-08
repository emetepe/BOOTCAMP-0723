import "./Register.css";

import UploadFile from "../../components/UploadFile/UploadFile";
import useRegisterError from "../../hooks/useRegisterError";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { registerUser } from "../../services/API_proyect/user.service";


const Register = () => {
  const { bridgeData } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [registerOk, setRegisterOk] = useState(false);
  const [send, setSend] = useState(false);

  const formSubmit = async (formData) => {
    const inputfile = document.getElementById("file-upload").files;
    let customFormData;

    if (inputfile.length !== 0) {
      customFormData = { ...formData, image: inputfile[0] };
      setSend(true);
      console.log(customFormData);
      setRes(await registerUser(customFormData));
      setSend(false);
    } else {
      customFormData = { ...formData };
      setSend(true);
      console.log(customFormData);
      setRes(await registerUser(customFormData));
      setSend(false);
    }
  };

  useEffect(() => {
    useRegisterError(res, setRegisterOk);
    bridgeData("ALLUSER");
  }, [res]);

  if (registerOk) {
    return <Navigate to="/verifyCode" />;
  }



  return (
    <>
    <div className="fondo fondoRegister">
    <div className="form-wrap">
        <h1>REGÍSTRATE</h1>
        <p>Es necesario tener una cuenta para acceder a tu espacio de Can Agility.</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="name"
              name="name"
              autoComplete="false"
              {...register("name", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Nombre de la mascota
            </label>
          </div>

          <div className="password_container form-group">
            <input
              className="input_user"
              type="password"
              id="password"
              name="password"
              autoComplete="false"
              {...register("password", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Contraseña
            </label>
          </div>

          <div className="email_container form-group">
            <input
              className="input_user"
              type="email"
              id="email"
              name="email"
              autoComplete="false"
              {...register("email", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Email
            </label>

            <div className="sexo">
              <input
                type="radio"
                name="sexo"
                id="masculino"
                value="masculino"
                {...register("gender", { required: true })}
              />
              <label htmlFor="masculino" className="label-radio masculino">
                Macho
              </label>
              <input
                type="radio"
                name="sexo"
                id="femenino"
                value="femenino"
                {...register("gender", { required: true })}
              />
              <label htmlFor="femenino" className="label-radio femenino">
                Hembra
              </label>
            </div>

            <UploadFile />
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#ff914d" : "#ff914d" }}
            >
              Registrar
            </button>
          </div>
        
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;

