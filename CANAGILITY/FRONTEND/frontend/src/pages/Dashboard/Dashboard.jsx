import "./Dashboard.css";

import useWidth from "../../hooks/useWidth";
import { useEffect, useState } from "react";
import { Toggle } from "../../components/Toggle/Toggle";
import { useAuth } from "../../contexts/authContext";
import { Nav } from "../../components/Nav/Nav";

const Dashboard = () => {
  const [anno, setAnno] = useState();
  const { user } = useAuth();
  const { ancho } = useWidth();

  useEffect(() => {
    const date = new Date();
    setAnno(date.getFullYear());
  }, []);

  return (
    <>
      {ancho > 1050 ? (
        <div className="dashboard">
          <div className="optionsD">
            <Toggle rol={user?.rol} curso={anno} />
          </div>
          <div className="contentD">
          {/* Crear componente para el dashboard */}
          </div>
        </div>
      ) : (
        <div className="dashboard2">
          <div className="nav-select">
            <Nav rol={user?.rol} curso={anno} />
          </div>
          <div className="contentD-mobile">
           {/* Crear componente para el dashboard */}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;