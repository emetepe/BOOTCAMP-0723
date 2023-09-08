import { Navigate } from "react-router-dom";
import { autoLoginUser } from "../services/API_proyect/user.service";

const useAutoLogin = async (allUser, userlogin) => {
  try {
    const { password, email } = allUser?.data?.user;
    const custoFormData = {
      email,
      password,
    };
    const setData = await autoLoginUser(custoFormData);
    if (setData.status == 200) {
      const dataCustom = {
        token: setData.data.token,
        id: setData.data._id,
        user: setData.data.user.name,
        email: setData.data.user.email,
        image: setData.data.user.image,
        check: setData.data.user.check,
        nivel: setData.data.user.nivel,
        rol: setData.data.user.rol,
      };

      const dataSting = JSON.stringify(dataCustom);
      userlogin(dataSting);
    } else {
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.log(error);
  }
};

export default useAutoLogin;