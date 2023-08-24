import { useState } from "react";
import { SaveInStorage } from "../../services/saveInStorage";

export const Crear = () => {
  const titleBox = "Añadir Perro";

  const [ dogState, setDogState ] = useState({
    name: "",
    breed: ""
  })

  const { name, breed } = dogState;

  const getFormData = e => {
    
    e.preventDefault(); // evitamos que se recargue la página
    // get form data
    let target = e.target; // para conseguir el evento
    let name = target.name.value;
    let breed = target.breed.value;

    // Create dog object to save
    let dog = {
      id: new Date().getTime(),
      name: name,
      breed: breed,
    }
    // Guardar estado
    setDogState(dog);


    // Guardar en el localstorage
    SaveInStorage("dogs", dog);


  };


  return (
    <div className="add">
      <h3 className="title">{titleBox}</h3>
      {(name && breed) && "Se ha creado corectamente el perro"}
      <form onSubmit={getFormData}>
        <input type="text" id="name" name="name" placeholder="Nombre" />
        <textarea
          id="breed"
          name="breed"
          placeholder="Raza"
        ></textarea>
        <input type="submit" id="save" value="Guardar" />
      </form>
    </div>
  );
};

export default Crear;
