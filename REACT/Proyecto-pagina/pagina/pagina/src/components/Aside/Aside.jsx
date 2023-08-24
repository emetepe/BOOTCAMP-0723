import Buscador from "../Buscador/Buscador";
import Crear from "../Crear/Crear";

const Aside = () => {
  return (
    <aside className="lateral">
      <Buscador />
      <Crear />
    </aside>
  );
};

export default Aside;
