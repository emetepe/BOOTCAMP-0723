import "./Header.css";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

export const Header = () => {
  const { user, logout } = useAuth();
  return (
    <>
      <header>
        <div className="titleFatherContainer">
        <NavLink to="/">
          <img
            src="https://res.cloudinary.com/dhninncj6/image/upload/v1693563402/FinalProject/logocanagility_xmz6ym.png"
            alt="logo"
            className="logo"
          />
          <div className="titleContainer">
            <h1 className="titleHeader"></h1>
            <h1 className="titleHeaderBlack"></h1>
          </div>
          </NavLink>
        </div>
        <nav>
          {user == null && (
            <NavLink to="/login">
              <img
                src="https://res.cloudinary.com/dhninncj6/image/upload/v1693577150/FinalProject/whiteuser_wssjee.png"
                alt=""
                className="iconNav"
              />
            </NavLink>
          )}

          {user !== null ? (
            <NavLink to="/dashboard">
              <img
                src="https://res.cloudinary.com/dhninncj6/image/upload/v1693589913/FinalProject/dashboard-2-256_cmx2f9.png"
                alt=""
                className="iconNav iconDashBoard"
              />
            </NavLink>
          ) : null}

          {user !== null ? (
            <NavLink to="/profile">
              <img
                src="https://res.cloudinary.com/dhninncj6/image/upload/v1693755665/FinalProject/settingsicon_qn2jky.png"
                alt=""
                className="iconNav iconDashBoard"
              />
            </NavLink>
          ) : null}

          <NavLink to="/">
            <img
              src="https://res.cloudinary.com/dhninncj6/image/upload/v1693576986/FinalProject/whitehome_q2cuun.png"
              alt=""
              className="iconNav home"
            />
          </NavLink>
          {user !== null && (
            <img
              src="https://res.cloudinary.com/dhninncj6/image/upload/v1693661717/FinalProject/logout_jabdvk.png"
              alt=""
              className="iconNav iconLogout"
              onClick={() => logout()}
            />
          )}
          {user !== null ? (
            <>
              <NavLink to="/profile">
                <img
                  className="profileCircle"
                  src={user.image}
                  alt={user.user}
                />
              </NavLink>
            </>
          ) : null}
          {}
        </nav>
      </header>
      <div className="whiteContainer"></div>
    </>
  );
};
