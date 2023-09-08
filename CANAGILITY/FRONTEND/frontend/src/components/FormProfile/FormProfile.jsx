import "./FormProfile.css";

import Swal from "sweetalert2";
import useUpdateError from "../../hooks/useUpdateError";
import FigureUser from "../FigureUser/FigureUser";
import Uploadfile from "../UploadFile/UploadFile";
import { useAuth } from "../../contexts/authContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";
import { updateUser } from "../../services/API_proyect/user.service";

const FormProfile = () => {
  const { setUser, user } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [changeProfileDataOk, setChangeProfileDataOk] = useState(false);
  const defaultData = {
    name: user?.user,
  };
  const formSubmit = async (formData) => {
    Swal.fire({
      title: "¿Estás seguro que quieres cambiar los datos de tu perfil?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff914d",
      cancelButtonColor: "#d33",
      confirmButtonText: "yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const inputfile = document.getElementById("file-upload").file;
        let customForData;
        if (inputfile.length !== 0) {
          customForData = { ...formData, image: inputfile[0] };
          setSend(true);
          setRes(await updateUser(customForData));
          setSend(false);
        } else {
          customForData = { ...formData };
          setSend(true);
          setRes(await updateUser(customForData));
          setSend(false);
        }
      }
    });
  };
  useEffect(() => {
    useUpdateError(res, setChangeProfileDataOk, setUser);
  }, [res]);

  if (changeProfileDataOk) {
    return <Navigate to="login" />;
  }
  return (
    <>
      <div className="containerProfile">
      <h1>Cambia tus datos de perfil</h1>
        <div className="containerPhotoUser">
          <FigureUser user={user} />
        </div>
        <div className="form-Wrap formProfile">
    
          <h3>Por favor, introduce tus nuevos datos de perfil:</h3>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="containerUser form-group">
              <input
                className="input-profile"
                type="text"
                id="name"
                autoComplete="false"
                defaultValue={defaultData?.name}
                {...register("name", { required: true })}
              />
              <label htmlFor="custom-input" className="custom-placeholder">
                Nombre de usuario
              </label>
            </div>
            <Uploadfile />
            <div className="btn_containeProfile">
              <button
                className="btn"
                type="submit"
                disabled={send}
                style={{ background: send ? "#ff914d" : "#ff914d" }}
              >
                Cambiar datos de usuario
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default FormProfile;