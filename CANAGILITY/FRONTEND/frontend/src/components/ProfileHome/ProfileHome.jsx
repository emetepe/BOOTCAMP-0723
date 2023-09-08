import "./ProfileHome.css";

import { useAuth } from "../../contexts/authContext";

const ProfileHome = () => {
  const { user } = useAuth();
  return (
    <div className="fondo">
    <div className="fraseProfileHome">
      <h3 className="saludoProfile">
        Bienvenido a tu perfil, {user.user}. Aquí podrás cambiar tus datos
        personales
      </h3>
    </div>
    </div>
  );
};

export default ProfileHome;