import Swal from "sweetalert2";

const useUpdateError = (res, setChangeProfileDataOk, setUser) => {
  let contador;
  if (res?.data) {
    contador = 0;
    res?.data?.testUpdate?.map((item) => {
      for (let clave in item) {
        if (item[clave] == false) {
          contador++;
        }
      }
    });
  }
  if (contador == 0) {
    let check = "";
    res?.data?.testUpdate?.forEach((item) => {
      for (let clave in item) {
        if (item[clave] == true) {
          check += `- ${clave} -`;
        }
      }
    });
    setUser(() => null);
    localStorage.removeItem("user");
    setChangeProfileDataOk(() => true);
    Swal.fire({
      icon: "success",
      title: `Datos de usuario actualizados ✅`,
      text: ` Update: ${check} `,
      showConfirmButton: false,
      timer: 4000,
    });
  }
  if (contador > 0) {
    let error = "";
    res?.data?.testUpdate?.forEach((item) => {
      for (let clave in item) {
        if (item[clave] == false) {
          error += `- ${clave} - `;
        }
      }
    });
    Swal.fire({
      icon: "error",
      title: `Error al actualizar datos de usuario: ${error} ❎`,
      text: "Por favor, inténtalo de nuevo.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if (res?.response?.status == 500 || res?.response?.status == 404)
    Swal.fire({
      icon: "error",
      title: "¡Vaya!",
      text: "Error interno del servidor. No se ha actualizado el usuario ❎ ",
      showConfirmButton: false,
      timer: 1500,
    });
};

export default useUpdateError;