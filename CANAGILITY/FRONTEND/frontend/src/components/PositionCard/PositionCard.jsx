import "./PositionCard.css";

import { useEffect, useState } from "react";

const PositionCard = ({ dog, setDog }) => {
  const [position, setPosition] = useState(0);
  const large = dog.length;

  const suma = () => {
    if (position < large - 1) {
      console.log("entro");
      setPosition(position + 1);
      setDog(dog[position + 1]?._id);
    }
  };

  const resta = () => {
    if (position > 0) {
      console.log("entro");
      setPosition(position - 1);
      setDog(dog[position - 1]?._id);
    }
  };

  useEffect(() => {
    setDog(dog[position]?._id);
  }, []);

  useEffect(() => {
    console.log(position);
  }, [position]);

  return (
    <div className="carrusel">
      <img
        className="flecha"
        src="https://res.cloudinary.com/dhninncj6/image/upload/v1694070076/FinalProject/left_vgwaum_ahzd06.png"
        alt="left"
        onClick={() => resta()}
      />
      <figure className="carta" id={dog[position]?._id}>
        <img className="fotoCarta" src={dog[position]?.image} alt={dog[position]?.name} />
        <h3 className="negro">{dog[position]?.name}</h3>
        {dog[position]?.score ? (
          <p className="pScore">Puntuación: {dog[position]?.score}</p>
        ) : null}
      </figure>
      <img
        className="flecha"
        src="https://res.cloudinary.com/dhninncj6/image/upload/v1694070076/FinalProject/right_hnqa08_ud9dmx.png"
        alt="right"
        onClick={() => suma()}
      />
    </div>
  );
};

export default PositionCard;