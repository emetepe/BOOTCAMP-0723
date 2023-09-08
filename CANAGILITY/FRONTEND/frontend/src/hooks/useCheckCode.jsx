import Swal from "sweetalert2";

const useCheckCode = (res, setDeleteUser, setOkCheck) => {
  // -------404 o un 500  en este caso --------->res.response
  // -------200 ---> entramos directos a la ---->res.data
  //! -------status: 500

  if (res?.response?.status == 500)
    Swal.fire({
      icon: "error",
      title: "¡Vaya!",
      text: "Error interno del servidor ❎!",
      showConfirmButton: false,
      timer: 1500,
    });
  //! -------200:  ok delete user
  if (res?.data?.delete?.includes("ok delete user")) {
    setDeleteUser(() => true);

    Swal.fire({
      icon: "error",
      title: "El código no es correcto ❎.",
      text: "Tu usuario se ha borrado, por favor, regístrate de nuevo",
      showConfirmButton: false,
      timer: 2500,
    });
  }

  //! -------200: error delete user
  if (res?.data?.delete?.includes("error delete user")) {
    Swal.fire({
      icon: "error",
      title: "El código no es correcto ❎.",
      text: "Usuario no borrado, inténtalo de nuevo",
      showConfirmButton: false,
      timer: 2500,
    });
  }
  //! ------200: testCheckOk:
  if (res?.data?.testCheckOk?.toString() == "true") {
    if (localStorage.getItem("user")) {
      const currentUser = localStorage.getItem("user");
      const parseCurrentUser = JSON.parse(currentUser);
      const customUser = {
        ...parseCurrentUser,
        check: true,
      };
      const customUserString = JSON.stringify(customUser);

      //! Hay que actualizar el localstorage y el user el contexto para que la nav se renderice correctamente

      //userlogin(customUserString);
      setUser(() => customUser);
      localStorage.setItem("user", customUserString);
    }
    setOkCheck(() => true);
    Swal.fire({
      icon: "success",
      title: "Ok, código correcto ✅.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  //! ------200: testCheckOk: false

  if (res?.data?.testCheckOk?.toString() == "false") {
    Swal.fire({
      icon: "error",
      title: "Error del servidor ❎.",
      text: "Usuario no borrado, inténtalo de nuevo, por favor",
      showConfirmButton: false,
      timer: 2500,
    });
  }

  //! ------404: User not found && 404: error.message Update One
  if (res?.response?.status == 404)
    Swal.fire({
      icon: "error",
      title: "Error del servidor ❎.",
      text: "Usuario no borrado, inténtalo de nuevo, por favor",
      showConfirmButton: false,
      timer: 1500,
    });
};

export default useCheckCode;