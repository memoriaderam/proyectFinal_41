import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Menu1 from "../../img/Menu1.jpg";
import Menu2 from "../../img/Menu2.jpg";
import Menu3 from "../../img/Menu3.jpg";
import Sales from "../../img/Sales.jpg";
import Glasses from "../../img/Glasses.jpg";
import Consultations from "../../img/Consultations.jpg";
import Questions from "../../img/Questions.jpg";
import Sarah from "../../img/Sarah.jpg";
import Jimena from "../../img/Jimena.jpg";
import Customers1 from "../../img/Customers1.jpg";
import Customers2 from "../../img/Customers2.jpg";
import Customers3 from "../../img/Customers3.jpg";
import Marcas from "../../img/Marcas.jpg";
import Mundo from "../../img/Mundo.jpg";

import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid border text-center">
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="row border">
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={Menu1} width="1800" height="700" />
            </div>
            <div className="carousel-item ">
              <img src={Menu2} width="1800" height="700" />
            </div>
            <div className="carousel-item ">
              <img src={Menu3} width="1800" height="700" />
            </div>
            <div className="carousel-item ">
              <img src={Menu1} width="1800" height="700" />
            </div>
            <div className="carousel-item ">
              <img src={Menu2} width="1800" height="700" />
            </div>
            <div className="carousel-item ">
              <img src={Menu3} width="1800" height="700" />
            </div>
          </div>
          <button
            className="carousel-control-prev "
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon "
              aria-hidden="true"
            ></span>
            <span className="visually-hidden ">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="row border">
        <div className="container date">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title-left">Agenda tu Cita</h2>
                  <p className="card-text">
                    Aca podra agendar una cita colocar tus formulas en tu lente
                  </p>
                  <a href="/usersAcces" className="btn btn-primary">
                    Reserva
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>

        <h2>Realizamos estos Servicios</h2>
        <br></br>
        <br></br>
        <div className="container ">
          <div className="row">
            <div className="col-4">
              <div className="card">
                <img
                  src={Sales}
                  className="card-img-top"
                  alt="..."
                  width="300"
                  height="500"
                />

                <div className="card-body">
                  <h5 className="card-title">Venta de Monturas</h5>
                  <p className="card-text justify">
                    Escoge la montura que más te guste para que tengas los
                    lentes más in del momento. trae para ti gran variedad de
                    monturas en tendencia, tanto de casas de diseño
                    internacional reconocidas, como sus marcas propias
                    realizadas bajo los más altos estándares de excelencia.
                    Todas nuestras monturas son 100% originales y certificadas.
                  </p>
                  <a href="/sales" className="btn btn-primary">
                    Mas Informacion
                  </a>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card">
                <img
                  src={Glasses}
                  className="card-img-top"
                  alt="..."
                  width="300"
                  height="500"
                />

                <div className="card-body">
                  <h5 className="card-title">Cristales</h5>
                  <p className="card-text justify">
                    Escoge el cristal que más te guste con tu formula, aca
                    podras tener los lentes más in del momento. trae para ti
                    gran variedad de monturas en tendencia, tanto de casas de
                    diseño internacional reconocidas, como sus marcas propias
                    realizadas bajo los más altos estándares de excelencia.
                    Todas nuestras monturas son 100% originales.
                  </p>
                  <a href="/crystals" className="btn btn-primary">
                    Mas Informacion
                  </a>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card">
                <img
                  src={Consultations}
                  className="card-img-top"
                  alt="..."
                  width="300"
                  height="500"
                />

                <div className="card-body">
                  <h5 className="card-title">Consultas</h5>
                  <p className="card-text justify">
                    En nuestra optica, puedes realizarte el examen de la vista
                    Contamos con optometristas capacitados para diagnosticar
                    cuáles son tus afecciones y así poder brindarte un producto
                    de calidad adaptado a tus necesidades. tambien le revisamos
                    para colocarle su montura.
                  </p>
                  <br></br>
                  <a href="/consultations" className="btn btn-primary">
                    Mas Informacion
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="row border">
        <h2>Noticias</h2>
        <br></br>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title left">Ofertas</h5>

                  <p className="card-text left justify">
                    * Obtenga un 20 % de descuentos en monturas y lentes de sol
                    si se registra en nuestra pagina
                  </p>
                  <p className="card-text left justify">
                    * Ahora puede pagar con cashea, esto le permite pagar en
                    cuotas, y puede pagar 50 % de inicial
                  </p>
                  <p className="card-text left justify">
                    * Si necesitas asesoría en tu compra con gusto podemos
                    ayudarte a través de nuestro Whatsapp ¡Escríbenos!
                  </p>
                  <h5 className="card-title left justify">Ultimas Noticias</h5>
                  <p className="card-text left justify">
                    * Nuestros Horarios de atencion, son de lunes a sabado de
                    8am a 6pm de la tarde.
                  </p>
                  <p className="card-text left justify">
                    * Sistema de apartado, En esta modalidad se permite que el
                    cliente pague únicamente un 50% de la compra total, para
                    iniciar el proceso de manufactura de su lente. Una vez
                    cancelado este 50%, existen dos modalidades para cumplir con
                    el pago restante del monto establecido previo a la entrega
                    del producto.
                  </p>

                  <p className="card-text left justify">
                    * Podrá consultar el estado de sus lentes en la sección de
                    “Pedidos” dentro de sistema de reserva de cita. te
                    recomendamos ue te registres en nuestra pagina.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="card">
                <img
                  src={Questions}
                  className="card-img-top"
                  alt="..."
                  width="300"
                  height="560"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="row border">
        <h2>Puedes Tratarte con las Doctoras</h2>
        <br></br>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="card">
                <img
                  src={Sarah}
                  className="card-img-top"
                  alt="..."
                  width="280"
                  height="400"
                />
                <h5 className="card-title left">Doctora Sarah Zimmermann</h5>
                <p className="card-text left justify">
                  Podrá consultar el estado de sus lentes en la sección de
                  “Pedidos” dentro de sistema de reserva de cita. te
                  recomendamos ue te registres en nuestra pagina.
                </p>
              </div>
            </div>

            <div className="col-6">
              <div className="card">
                <img
                  src={Jimena}
                  className="card-img-top"
                  alt="..."
                  width="300"
                  height="400"
                />
                <h5 className="card-title left">Doctora Jimena Lopez</h5>
                <p className="card-text left justify">
                  Podrá consultar el estado de sus lentes en la sección de
                  “Pedidos” dentro de sistema de reserva de cita. te
                  recomendamos ue te registres en nuestra pagina.
                </p>
              </div>
            </div>
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="row border">
        <h2>Marcas</h2>
        <div className="row featurette">
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title"></h5>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <p className="card-text justify">
                Aca en Mundo optico podras escojer la marca que más te guste con
                tu formula, aca podras tener los lentes más in del momento. trae
                para ti gran variedad de monturas en tendencia, tanto de casas
                de diseño internacional reconocidas, como sus marcas propias
                realizadas bajo los más altos estándares de excelencia. Todas
                nuestras monturas son 100% originales y certificadas.
              </p>
              <a href="/brands" className="btn btn-primary">
                Mas Informacion
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <img
              src={Marcas}
              className="card-img-top"
              alt="..."
              width="380"
              height="480"
            />
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="row border">
        <h2>Testimonios</h2>
        <br></br>
        <br></br>
        <div className="container">
          <div id="carouselExampleDark" className="carousel carousel-dark slide">
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="10000">
                <img src={Customers1} className="d-block w-100" />
                <div className="carousel-caption d-none d-md-block">
                  <h5></h5>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img src={Customers2} className="d-block w-100" />
                <div className="carousel-caption d-none d-md-block">
                  <h5></h5>
                </div>
              </div>
              <div className="carousel-item">
                <img src={Customers3} className="d-block w-100" />
                <div className="carousel-caption d-none d-md-block">
                  <h5></h5>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="row border">
        <h2>Sobre Nosotros</h2>
        <div className="row featurette">
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title"></h5>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <p className="card-text justify">
                Somos una empresa de tradición, que busca innovar siendo siempre
                cercana a ti, a los tuyos, entendiendo los problemas que
                conlleva cualquier afección visual.Especialistas en salud visual
                con más de 35 años de experiencia. Somos conocidos por prestar
                servicios de óptica y optometría de alta calidad. Porque nuestra
                prioridad es usted, le presentamos el más variado catálogo de
                monturas oftálmicas a precios accesibles. Visítenos en nuestra
                sede en Caracas.
              </p>
              <a href="/aboutUs" className="btn btn-primary">
                Mas Informacion
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <img
              src={Mundo}
              className="card-img-top"
              alt="..."
              width="380"
              height="400"
            />
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};
