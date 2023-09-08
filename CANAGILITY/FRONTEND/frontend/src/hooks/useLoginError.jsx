import Swal from "sweetalert2";

const useLoginError = (res, setLoginOk, userlogin) => {
  if (res?.status == 200) {
    const dataCustom = {
      token: res.data.token,
      id: res.data.user._id,
      user: res.data.user.name,
      email: res.data.user.email,
      image: res.data.user.image,
      check: res.data.user.check,
      nivel: res.data.user.nivel,
      rol: res.data.user.rol,
    };

    const dataString = JSON.stringify(dataCustom);
    userlogin(dataString);
    setLoginOk(() => true);
    Swal.fire({
      icon: "success",
      title: "Bienvenido a Can Agility",
      text: "Login ok ✅",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  if (res?.response?.status == 500)
    Swal.fire({
      icon: "error",
      title: "¡Vaya!",
      text: "Error interno del servidor ❎",
      showConButton: false,
      timer: 1500,
    });

  //! ---------- 404: password no coinciden
  if (res?.response?.data?.includes("password dont match"))
    Swal.fire({
      icon: "error",
      title: "¡Vaya!",
      text: "La contraseña no coincide ❎",
      showConfirmButton: false,
      timer: 1500,
    });

  //! ---------- 404: User no register

  if (res?.response?.data?.includes("User no register"))
    Swal.fire({
      icon: "error",
      title: "¡Vaya!",
      text: "Usuario no registrado ❎",
      showConfirmButton: false,
      timer: 1500,
    });
};

export default useLoginError;