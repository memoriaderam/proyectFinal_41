import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Consultas from "../../img/Consultas.jpg";
import Consultas2 from "../../img/Consultas2.jpg";

import "../../styles/home.css";

export const Consultations = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid border text-center">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="row row-cols-4">
        <div className="col-12">
          <h1>Consultas Medicas de la Vista</h1>
        </div>
      </div>

      <br></br>

      <div className="row row-cols-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body justify">
              <h2 className="card-title"></h2>
              <p className="card-text">
              Acá en mundo óptico, le brindamos n examen de la vista, o examen oftalmológico, 
              es una evaluación integral de la visión que ayuda a detectar posibles problemas 
              y enfermedades oculares, realizado por un oftalmólogo o optometrista. 

              <a href="/usersAcces"> Agenda tu cita aca </a>

              Nosotros contamos distintos tipos de consultas medicas:
              </p>
            </div>
          </div>
        </div>
      </div>

      <br></br>
      
      <h2>Consultas</h2>
      <br></br>
      <br></br>
      <div className="row row-cols-4">
        <div className="col-6 justify">
          
      <h4>¿Qué se hace en una consulta oftalmológica? </h4> <br></br>
       -Se evalúa el estado general de los ojos  <br></br><br></br>
       -Se detectan posibles causas de síntomas <br></br> <br></br>
       -Se realizan pruebas para comprobar la visión <br></br> <br></br>
       -Se revisa el aparato visual <br></br> <br></br>
       -Se detectan defectos visuales que requieran anteojos <br></br> <br></br>
       -Se detectan enfermedades que pueden ocasionar pérdida de la visión <br></br> <br></br>
​      
        </div>
        <div className="col-6">
            <img src={Consultas}className="card-img-top" alt="..."width="380"height="380"/>
        </div>                      
        </div>                      
                              
        <br></br>
        <br></br>

      <div className="row row-cols-4">
        <div className="col-6 justify">
          
       <h4>¿Cuándo acudir a una consulta oftalmológica? </h4> <br></br>
       -Si se experimentan cambios en la visión, 
       como disminución, distorsión de imágenes o reducción del campo periférico  <br></br><br></br>
       -Si se presentan molestias en los ojos, como resequedad, acumulación 
       excesiva de lagañas o picazón persistente <br></br> <br></br>
       -Si se tiene condiciones médicas preexistentes, como diabetes, hipertensión 
       o problemas metabólicos <br></br> <br></br>  
       <h4>¿Qué se puede tratar en una consulta oftalmológica?  </h4> <br></br>
       Cataratas, Glaucoma, Retinopatía diabética, Degeneración macular, Estrabismo, Contactología. <br></br> <br></br>
      

        </div>
        <div className="col-6">
        <img src={Consultas2}className="card-img-top" alt="..."width="380"height="410"/>
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

export default Consultations;
