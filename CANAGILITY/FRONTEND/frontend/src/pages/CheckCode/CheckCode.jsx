import "./CheckCode.css";

import useCheckCode from "../../hooks/useCheckCode";
import useAutoLogin from "../../hooks/useAutoLogin";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/authContext";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkCode } from "../../services/API_proyect/user.service";

const CheckCode = () => {
  const { allUser, userlogin } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [okCheck, setOkCheck] = useState(false);

  const formSubmit = async (formData) => {
    const userlocal = localStorage.getItem("user");

    if (userlocal == null) {
      const custFormData = {
        code: parseInt(formData.code),
      };
      console.log(custFormData);
      const id = allUser.data.user._id;
      setSend(true);
      console.log(id);
      setRes(await checkCode(custFormData, id));
      setSend(false);
    } else {
      const parse = JSON.parse(userlocal);
      const custFormData = {
        code: parseInt(formData.code),
      };
      const id = parse.id;
      console.log(parse);
      setSend(true);
      console.log(id);
      setRes(await checkCode(custFormData, id));
      setSend(false);
    }
  };
  useEffect(() => {
    useCheckCode(res, setDeleteUser, setOkCheck);
  }, [res]);

  if (deleteUser) {
    return <Navigate to="/register" />;
  }
  if (okCheck) {
    if (!localStorage.getItem("user")) {
      useAutoLogin(allUser, userlogin);
    } else {
      return <Navigate to="/dashboard" />;
    }
  }
  return (
    <>
    <div className="fondo">
    <div className="form-wrap">
        <h1>Verificación de código</h1>
        <p>Escribe el código que has recibido en tu correo electrónico</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="name"
              name="name"
              autoComplete="false"
              {...register("code", { required: false })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Código de registro
            </label>
          </div>

          <div className="btn_container">
            <button
              id="btnCheck"
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#ff914d" : "#ff914d" }}
            >
              Código de verificación
            </button>
          </div>
          <div className="btn_container">
            <button
              id="btnResend"
              className="btn"
              disabled={send}
              style={{ background: send ? "#ff914d" : "#ff914d" }}
              onClick={() => handleReSend()}
            >
              Reenviar código
            </button>
          </div>

          <p className="bottom-text">
            <small>
              Si el código introducido no es correcto, el usuario será eliminado
              de la base de datos y tendrás que registrarst de nuevo.{" "}
            </small>
          </p>
        </form>
      </div>
    </div>
    </>
  );
};

export default CheckCode;