import Swal from "sweetalert2";

const useScoreError = (res) => {
  //! 200 --->  respuesta ok register ok
  if (res?.status == 200) {
    localStorage.setItem("data", JSON.stringify(res));
    Swal.fire({
      icon: "success",
      title: "Puntuación Creada",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export default useScoreError;