import "./Profile.css";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useWidth from "../../hooks/useWidth";

const Profile = () => {
  const { ancho } = useWidth();
  const navigate = useNavigate();

  const gotoroute = (value) => {
    const ruta = `/profile/${value}`;
    navigate(ruta);
  };

  return (
    <>
      <div className="fondo">
        {ancho > 1050 ? (
          <div className="profile">
            <div className="options">
              <ul>
                <li>
                  <NavLink to="/profile/formProfile">
                    <p>Actualizar datos de perfil</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile/changePassword">
                    <p>Cambiar Contraseña</p>
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="content">
              <Outlet />
            </div>
          </div>
        ) : (
          <div className="profile2">
            <div className="select-mobile">
              <select onChange={(e) => gotoroute(e.target.value)}>
                <option value="formProfile">Actualizar perfil</option>
                <option value="changePassword">Cambiar Contraseña</option>
              </select>
            </div>
            <div className="content-mobile">
              <Outlet />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;