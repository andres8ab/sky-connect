import { useEffect, useState } from "react";

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      // Aumentamos el breakpoint a 1024px para incluir tablets
      setIsMobile(window.innerWidth <= 1024);
    };

    checkIsMobile(); // Ejecutar al montar el componente

    // Agregar un listener para cambios en el tamaño de la ventana
    window.addEventListener("resize", checkIsMobile);

    // Limpiar el listener al desmontar el componente
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
};

export default useIsMobile;
