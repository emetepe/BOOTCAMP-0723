import { useEffect, useState } from "react";

const useWidth = () => {
  const [ancho, setAncho] = useState(window.innerWidth);

  const handleResize = () => {
    setAncho(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { ancho };
};

export default useWidth;