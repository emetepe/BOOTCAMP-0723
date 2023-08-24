import { useEffect, useState } from "react";

export const Listado = () => {
  const [listState, setListState] = useState([]);

  useEffect(() => {
    console.log("Componente cargado");
    getDogs();
  }, []);

  const getDogs = () => {
    let dogs = JSON.parse(localStorage.getItem("dogs"));

    setListState(dogs);
  };

  return (
    <>
      {listState != null ? 
        listState.map(dog => {

        return (
            //{/*aqui van los perros*/}
            <article key={dog.id} className="dog-item">
              <h3 className="title">{dog.name}</h3>
              <p className="description">{dog.breed}</p>
              <button className="edit">Editar</button>
              <button className="delete">Borrar</button>
            </article>
        );
      })
      : <h2>No hay perros para mostrar</h2>
      }
    </>
  );
};

export default Listado;
