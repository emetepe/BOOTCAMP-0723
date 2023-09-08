import Swal from "sweetalert2";

const useChangePasswordError = (res, setChangePasswordOk, setUser) => {
  if (res?.data?.updateUser?.toString() == "true") {
    setUser(() => null);
    localStorage.removeItem("user");
    setChangePasswordOk(() => true);
    Swal.fire({
      icon: "success",
      title: "Cambio de contraseña correcto ✅",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  if (res?.data?.updateUser?.toString() == "false") {
    Swal.fire({
      icon: "error",
      title: "Error interno del servidor ❎",
      text: "Por favor, inténtelo de nuevo",
      showConfirmButton: false,
      timer: 2500,
    });
  }
  if (
    !res?.response?.data?.includes("password dont match") &&
    res?.response?.status == 404
  )
    Swal.fire({
      icon: "error",
      title: "Error interno del servidor ❎",
      text: "Por favor, inténtelo de nuevo",
      showConfirmButton: false,
      timer: 3000,
    });
  if (res?.response?.data?.includes("password dont match"))
    Swal.fire({
      icon: "error",
      title: "¡Vaya!",
      text: "La contraseña no coincide, ❎ Por favor, inténtelo de nuevo",
      showConfirmButton: false,
      timer: 3000,
    });
  if (res?.response?.status == 500)
    Swal.fire({
      icon: "error",
      title: "¡Vaya!",
      text: "Error interno del servidor ❎",
      showConfirmButton: false,
      timer: 1500,
    });
};

export default useChangePasswordError;