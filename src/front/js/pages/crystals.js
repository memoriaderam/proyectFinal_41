import React, { useContext } from "react";
import { Context } from "../store/appContext";
import cr39 from "../../img/cr-39.jpg";
import Anti from "../../img/Anti-reflejos.jpg";
import Azules from "../../img/Azules.jpg";
import Fotogromaticos from "../../img/Fotogromaticos.jpg";
import "../../styles/home.css";

export const Crystals = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid border text-center">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="row row-cols-4">
        <div className="col-12">
          <h1>Cristales</h1>
        </div>
      </div>

      <br></br>

      <div className="row row-cols-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body justify">
              <h2 className="card-title"></h2>
              <p className="card-text">
              Acá en mundo óptico, le brindamos los servicios necesitaros
              para que usted, pueda obtener su montura con su cristal, según su fórmula, 
              
              por acá podrá agenda una cita colocar tus formulas en tu lente
              <a href="/usersAcces"> Reserva </a>

              Nosotros contamos distintos tipos de cristales:
              </p>
            </div>
          </div>
        </div>
      </div>

      <br></br>
      
      <h2>Cristales Visión Sencilla</h2>
      <br></br>
      <br></br>
      <div className="row row-cols-4">
        <div className="col-6 justify">
          
      <h4>CR-39</h4> <br></br><br></br>
       Es el material más usado en la fabricación 
       de cristales ópticos. Sustituyó los lentes 
       de vidrio por ser más seguro, liviano y económico. 
       Su gran calidad óptica a bajo precio lo hacen 
       el favorito de optometristas y oftalmólogos 
       en todo el mundo. <br></br> <br></br>

​       CR39 es un acrónimo de "Columbian Resin #39". 
       Es un polímero termoestable, su índice de refracción 
       es 1.498 y su número ABBE (índice de dispersión de luz) 
       58. Este número ABBE es de los más altos en polímeros 
       ópticos, gracias a eso su dispersión de luz es mínima 
       favoreciendo la percepción de colores y una visión más clara.
        </div>
        <div className="col-6">
            <img src={cr39}className="card-img-top" alt="..."width="380"height="380"/>
        </div>                      
        </div>                      
                              
        <br></br>
        <br></br>

      <div className="row row-cols-4">
        <div className="col-6 justify">
          
       <h4>CR-39 Anti-Reflejos</h4> <br></br><br></br>
       El tratamiento anti-reflejos es un película especial de varias
       capas de flúor que impide reflejos de luz en el cristal. 
       Entres sus beneficios obtendrás: <br></br> <br></br>

​       -Protección de brillos y reflejos causados por cualquier 
       iluminación, incluidos pantallas de computadores, tablets 
       y celulares.<br></br> <br></br>

       -Cristal más transparente que reduce la fatiga visual. <br></br> <br></br>
       -Mejoran la visión en cualquier condición lumínica. <br></br> <br></br>
       -Lentes más estéticos, sobre todo en fórmulas altas. <br></br> <br></br>
       -Ideales para conducir de noche y trabajar el computador.<br></br> <br></br>

        </div>
        <div className="col-6">
        <img src={Anti}className="card-img-top" alt="..."width="380"height="410"/>
         </div>
      </div>  

      <br></br>
      <br></br>
        
      <div className="row row-cols-4">
        <div className="col-6 justify">
          
       <h4>CR-39 Blue Cut</h4> <br></br><br></br>
       Cristales "blue cut", "blue block", "anti blue" o "blue filter".
       Todos estos términos se refieren al lente con filtro de luz azul. 
       <br></br> <br></br>

​      La luz azul presente en todo tipo de iluminación led 
      (pantallas de computadores, celulares, tablets, bombillos 
      led, etc.) según diversos estudios afecta nuestra salud 
      visual y general. Su exposición prolongada pueden influir 
      incluso nuestros ciclos circadianos, como consecuencia 
      puede derivar en problemas de sueño y descanso.<br></br> <br></br>

      Nuestros cristales CR39 con filtro de luz azul
      incluyen tratamiento anti-reflejos para 
      la prevención completa de la fatiga visual. <br></br> <br></br>
      Obligatorio para personas que usen varias horas al día computadores. <br></br> <br></br>
      

        </div>
        <div className="col-6">
        <img src={Azules}className="card-img-top" alt="..."width="380"height="410"/>
         </div>
      </div>  

      <br></br>
      <br></br>

      <div className="row row-cols-4">
        <div className="col-6 justify">
          
       <h4>CR-39 Fotocromáticos</h4> <br></br><br></br>
       Proteger nuestros ojos de la radiación ultravioleta
       debe ser una prioridad a cualquier edad. La exposición 
       prolongada a la luz solar es responsable de diversas 
       patologías oculares. <br></br> <br></br>

​       Los cristales fotocromáticos (también conocidos como fotosensibles) 
       poseen filtro solar UV400, que se activa y oscurece según 
       la radiación ultravioleta a la que es expuesto, protegiendo 
       nuestros ojos como lo haría un lente de sol. Se mantiene transparente 
       en la noche y en ambientes internos.<br></br> <br></br>

       Tenemos disponible para usted cristales fotocromáticos con tratamiento 
       anti-reflejos y filtro de luz azul, poniendo en sus manos un lente integral 
       que cuida su salud visual en cualquier circunstancia. <br></br> <br></br>
       

        </div>
        <div className="col-6">
        <img src={Fotogromaticos}className="card-img-top" alt="..."width="380"height="410"/>
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

export default Crystals;
