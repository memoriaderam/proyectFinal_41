import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Acerca from "../../img/Acerca.jpg";
import Acerca2 from "../../img/Acerca2.jpg";

import "../../styles/home.css";

export const About = () => {
  return (
    <div class="container-fluid border text-center">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div class="row row-cols-4">
        <div class="col-12">
          <h1>Acerca de Nosotros</h1>
        </div>
      </div>

      <br></br>
      <br></br>
      <div class="row row-cols-4">
        <div class="col-12 justify">
          <p>
            Especialistas en salud visual con más de 35 años de experiencia.
            Somos conocidos por prestar servicios de óptica y optometría de alta
            calidad. Porque nuestra prioridad es usted, le presentamos el más
            variado catálogo de monturas oftálmicas a precios accesibles.
            Visítenos en nuestra sede en Caracas.
          </p>
        </div>
      </div>

      <br></br>
      <br></br>
      <div class="row row-cols-4">
        <div class="col-1"></div>
        <div class="col-10">
          <img
            src={Acerca}
            class="card-img-top"
            alt="..."
            width="1000"
            height="250"
          />
        </div>

        <div class="col-1"></div>
      </div>

      <br></br>
      <br></br>
      <div class="row row-cols-4">
        <div class="col-6">
          <h3>
            <i className="fa-solid fa-bullseye"></i>Misión
          </h3>
        </div>
        <div class="col-6">
          <h3>
            <i class="fa-solid fa-lightbulb"></i>Visión
          </h3>
        </div>
      </div>

      <div class="row row-cols-4">
        <div class="col-6">
          Somos una familia, apasionados con la excelencia y la innovación,
          comprometidos con nuestros clientes y su salud visual.
        </div>
        <div class="col-6">
          Superar las expectativas de nuestros clientes, sustentados en la
          innovación y trayectoria única de la Familia, para profundizar el
          liderazgo en Venezuela.
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div class="row row-cols-4">
        <div class="col-6">
          <h3>
            <i class="fa-solid fa-atom"></i>Valores
          </h3>
          <br></br>
          <ol type="1">
            <li>Responsabilidad: Cuidamos tu visión.</li>
            <li>Trabajo en equipo: Juntos logramos todo.</li>
            <li>Compromiso: Pasión por lo que hacemos.</li>
            <li>Solidaridad: Apoyamos a nuestra gente.</li>
            <li>Creatividad: Somos diferentes.</li>
            <li>Honestidad: Somos lo que ves.</li>
            <li>Eficacia: Todo lo que hacemos lo hacemos bien.</li>
          </ol>

        </div>
        <div class="col-6">
          <img
            src={Acerca2}
            class="card-img-top"
            alt="..."
            width="300"
            height="250"
          />
        </div>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default About;
