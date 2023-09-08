import "./Login.css";

import useLoginError from "../../hooks/useLoginError";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/authContext";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { login } from "../../services/API_proyect/user.service";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [loginOk, setLoginOk] = useState(false);
  const { userlogin } = useAuth();

  const formSubmit = async (formData) => {
    setSend(true);
    setRes(await login(formData));
    setSend(false);
  };

  useEffect(() => {
    useLoginError(res, setLoginOk, userlogin);
  }, [res]);

  if (loginOk) {
    if (res.data.user.check == false) {
      return <Navigate to="/verifyCode" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }

  return (
    <>
    <div className="fondo fondoLogin">
    <div className="form-container">
        <h1>Acceso</h1>
        <p>Bienvenidos a Can Agility</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="email-container form-group">
            <input
              className="input-login"
              type="email"
              id="name"
              name="name"
              autoComplete="false"
              {...register("email", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Email
            </label>
          </div>
          <div className="password-container form-group">
            <input
              className="input-login"
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

          <div className="btn-container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#ff914d" : "#ff914d" }}
            >
              Acceso
            </button>
          </div>
          <p className="buttom-text">
            <small>
              ¿Has olvidado tu contraseña?
              <Link to="/forgotpassword" className="anchorCustom">
                {" "}
                Cambio de contraseña
              </Link>
            </small>
          </p>
          <p className="buttom-text">
            <small>
            ¿Aún no estás registrado?
              <Link to="/register" className="anchorCustom">
                {" "}
                Registra aquí a tu perro
              </Link>
            </small>
          </p>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;