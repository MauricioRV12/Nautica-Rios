import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function DetalleAccesorio() {
  const { id } = useParams();
  const [accesorio, setAccesorio] = useState(null);

  useEffect(() => {
    const fetchAccesorio = async () => {
      const accesorioDoc = doc(db, "accesorios", id);
      const accesorioSnapshot = await getDoc(accesorioDoc);

      if (accesorioSnapshot.exists()) {
        setAccesorio({
          id: accesorioSnapshot.id,
          ...accesorioSnapshot.data(),
        });
      }
    };

    fetchAccesorio();
  }, [id]);

  if (!accesorio) {
    return <p>Cargando...</p>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
   <div className="flex-center">

<div className="mb-5 mx-auto max-w-screen-lg  border-slate-200 p-5 shadow-[0_5px_40px_1px_rgba(0,0,0,2)]">
      {accesorio.variaciones && accesorio.variaciones.length > 0 && (
        <div className="mb-8">
          <br />
          <br />
          <br />
          <br />
          <br />
          {accesorio.variaciones.map((variacion, variacionIndex) => (
            <div key={variacionIndex}>
              {variacion.imagenes && variacion.imagenes.length > 0 && (
                <Slider {...settings} className="w-full">
                  {variacion.imagenes.map((imagen, imagenIndex) => (
                    <div
                      key={imagenIndex}
                      className="w-full h-64 flex items-center justify-center"
                    >
                      <img
                        src={imagen}
                        alt={`Imagen ${imagenIndex + 1}`}
                        className="object-contain w-full h-full rounded-3xl"
                      />
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          ))}
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2">{accesorio.nombre}</h3>
      <p className="text-lg text-gray-600">{accesorio.marca}</p>
      <p className="text-lg">{accesorio.descripcion}</p>
      <br />
      <div className="flex justify-between items-center bg-">
        <h4 className="text-xl font-semibold">
          {accesorio.material} - {accesorio.color}
        </h4>
        <p className="text-4xl font-bold mt-16 mb-4">${accesorio.precio}</p>
      </div>
      <p className="text-gray-600">{accesorio.peso}</p>
      <NavLink to="/accesorios">
        <button  className="ml-4 p-2 bg-[#3b82f6] text-center text-white mt-8 h-[40px] w-[130px]">Regresar</button>
      </NavLink>
    </div>
   </div>

   
   
  
  );
}