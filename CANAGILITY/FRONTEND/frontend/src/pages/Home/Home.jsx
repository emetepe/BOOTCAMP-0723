import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import "./Home.css";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="fondo">
      <div className="homeContainer">
      {user !== null ? (
        <h1 className="titleHome">Bienvenido/a a CAN AGILITY, {user.user}</h1>
      ) : (
        <>
          <h1 className="titleHome">
            Registra a tu mascota o haz login para acceder a la página
          </h1>
          <button className="btn" onClick={() => navigate("/login")}>
            LOGIN
          </button>
          <button className="btn" onClick={() => navigate("/register")}>
            REGISTRO
          </button>
        </>
      )}
    </div>
    </div>
  );
};

export default Home;

