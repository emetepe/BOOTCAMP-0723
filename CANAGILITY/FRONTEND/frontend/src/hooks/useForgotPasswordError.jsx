import Swal from "sweetalert2";

const useForgotPasswordError = (res, setForgetOk) => {
  if (res?.status == 200) {
    if (res?.data?.sendPassword == true && res?.data?.updateUser == true) {
      setForgetOk(() => true);
      return Swal.fire({
        icon: "success",
        title: "Cambio de contraseña correcto",
        text: "Email enviado con tu nueva contraseña ✅",
        showConfirmButton: false,
        timer: 3000,
      });
    }
    if (res?.data?.sendPassword == true && res?.data?.updateUser == false) {
      return Swal.fire({
        icon: "error",
        title: "Error al enviar el correo",
        text: "No se cambió tu contraseña porque tu email no es válido ❎",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
  if (
    res?.response?.data?.includes("User no register") &&
    res?.response?.status == 404
  )
    Swal.fire({
      icon: "error",
      title: "¡Vaya!",
      text: "Usuario no registrado ❎. Introduce un email válido",
      showConfirmButton: false,
      timer: 3000,
    });

  if (res?.response?.status == 500)
    Swal.fire({
      icon: "error",
      title: "¡Vaya!",
      text: "Error interno del servidor ❎. Por favor, inténtalo de nuevo ",
      showConfirmButton: false,
      timer: 1500,
    });

  if (
    res?.response?.data?.includes("dont send email and dont update user") &&
    res?.response?.status == 404
  )
    Swal.fire({
      icon: "error",
      title: "¡Vaya!",
      text: "No se cambió la contraseña.  ❎ Por favor, inténtalo de nuevo",
      showConfirmButton: false,
      timer: 3000,
    });
};

export default useForgotPasswordError;