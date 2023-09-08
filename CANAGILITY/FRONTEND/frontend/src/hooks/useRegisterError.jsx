import Swal from "sweetalert2";

const useUserError = (res, setRegisterOk) => {
  //! 200 --->  respuesta ok register ok
  if (res?.status == 200) {
    localStorage.setItem("data", JSON.stringify(res));
    setRegisterOk(() => true);
    Swal.fire({
      icon: "success",
      title: "Bienvenido a Can Agility 💌",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //! res --> 409 --> Usuario ya registrado

  if (res?.response?.status == 409)
    Swal.fire({
      icon: "error",
      title: "¡Vaya!",
      text: "El usuario ya existe!❎",
      showConfirmButton: false,
      timer: 1500,
    });
  //! res --> 500 --> Error general del server

  if (res?.response?.status == 500)
    Swal.fire({
      icon: "error",
      title: "¡Vaya!",
      text: "Error interno del servidor ❎",
      showConfirmButton: false,
      timer: 1500,
    });

  //! res --> 404 --> codigo en el envio del codigo

  //! error --> nombre de usuario ya exista // error ---> correo ya existe

  if (
    res?.response?.data?.includes(
      "duplicate key error collection: userProyect.users index: name_1 dup key: { name }"
    )
  )
    Swal.fire({
      icon: "error",
      title: "¡Vaya!",
      text: "Por favor, elige otro nombre ❎.",
      showConfirmButton: false,
      timer: 1500,
    });

  //! error ---> validacion de la contraseña

  if (res?.response?.data?.includes("validation failed: password"))
    Swal.fire({
      icon: "error",
      title: "¡Vaya!",
      text: "Mínimo 8 caracteres, 1 letra mayúscula, 1 letra minúscula y un caracter especial ❎.",
      showConfirmButton: false,
      timer: 1500,
    });
};

export default useUserError;