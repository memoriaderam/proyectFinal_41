import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Sales2 from "../../img/Sales2.jpg";
import Sales3 from "../../img/Sales3.jpg";
import Sales4 from "../../img/Sales4.jpg";


import "../../styles/home.css";

export const Sales = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid border text-center">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="row row-cols-4">
        <div className="col-12">
          <h2>Monturas</h2>
        </div>
      </div>

      <br></br>
      <br></br>

      <div className="row row-cols-4">
        <div className="col-4">
          <img
            src={Sales2}
            className="card-img-top"
            alt="..."
            width="250"
            height="480"
          />
          <h3>Lentes para Mujeres </h3>
        </div>
        <div className="col-4">
          <img
            src={Sales3}
            className="card-img-top"
            alt="..."
            width="250"
            height="480"
          />
          <h3>Lentes para Hombres </h3>
        </div>
        <div className="col-4">
          <img
            src={Sales4}
            className="card-img-top"
            alt="..."
            width="250"
            height="480"
          />
          <h3>Lentes para Niños </h3>
        </div>
      </div>

      <br></br>
      <br></br>


      <div className="row row-cols-4">
        <div className="col-12 justify">
          <p>Escoge la montura que más te guste y luego
            selecciona el cristal de tu preferencia para
            que tengas los lentes más in del momento. Óptica
            trae para ti gran variedad de monturas en tendencia,
            tanto de casas de diseño internacional reconocidas,
            como sus marcas propias realizadas bajo los más altos
            estándares de excelencia. Todas nuestras monturas son
            100% originales y certificadas. Si necesitas asesoría
            en tu compra con gusto podemos ayudarte a través de nuestro
            Whatsapp ¡Escríbenos!

          </p>
        </div>
      </div>

      <br></br>
      <br></br>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};



export default Sales;