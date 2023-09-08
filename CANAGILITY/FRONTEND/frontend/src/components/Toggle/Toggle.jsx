import "./Toggle.css";

import { NavLink } from "react-router-dom";

export const Toggle = ({ rol, curso }) => {
  switch (rol) {
    case "dog":
      return (
        <>
          <ul>
            <li>
              <NavLink to="/dashboard/CurrentScores" className="link">
                <p>Puntuaciones temporada {curso}</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/ScoresByLevel" className="link">
                <p>Puntuaciones por nivel</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/ScoresByPrueba" className="link">
                <p>Puntuaciones por prueba</p>
              </NavLink>
            </li>
          </ul>
        </>
      );

    case "coach":
      return (
        <>
          <ul>
            <li>
              <NavLink to="/dashboard/DogsPrueba" className="link">
                <p>Perros y pruebas</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/CrearScore" className="link">
                <p>Crear puntuación</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/DeleteScore" className="link">
                <p>Borrar puntuación</p>
              </NavLink>
            </li>
          </ul>
        </>
      );

    case "admin":
      return (
        <>
          <ul>
            <li>
              <NavLink to="/dashboard/CrearPrueba" className="link">
                <p>Crear prueba</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/AddDogCoach" className="link">
                <p>Añadir perro o monitor a la prueba</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/Monitores" className="link">
                <p>Monitores</p>
              </NavLink>
            </li>
          </ul>
        </>
      );
    default:
      return (
        <>
          <p>Ha habido algún problema. El toggle de rol no ha funcionado</p>
        </>
      );
  }
};