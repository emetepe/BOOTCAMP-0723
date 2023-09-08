import { useNavigate } from "react-router-dom";

export const Nav = ({ rol, curso }) => {
  
  const navigate = useNavigate();

  const gotoroute = (value) => {
    const ruta = `/dashboard/${value}`;
    navigate(ruta);
  };

  switch (rol) {
    case "dog":
      return (
        <>
          <div>
            <select onChange={(e) => gotoroute(e.target.value)}>
              <option value="scoresActual">Puntuación temporada {curso}</option>
              <option value="scoreNivel">Puntuación por nivel</option>
              <option value="scorePrueba">Puntuación por prueba</option>
            </select>
          </div>
        </>
      );
    case "coach":
      return (
        <>
          <div>
            <select onChange={(e) => gotoroute(e.target.value)}>
              <option value="dogsPrueba">Perros prueba</option>
              <option value="crearPuntuación">Crear puntuación</option>
              <option value="deletePuntuación">Borrar puntuación</option>
            </select>
          </div>
        </>
      );
    case "admin":
      return (
        <>
          <div>
            <select onChange={(e) => gotoroute(e.target.value)}>
              <option value="crearPrueba">Crear prueba</option>
              <option value="AddDogCoach">
                Añadir perro o monitor a la asignatura
              </option>
              <option value="coaches">Monitores</option>
            </select>
          </div>
        </>
      );
  }
};