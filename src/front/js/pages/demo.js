import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Demo = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid">
      <br></br>
      <br></br>

      <p>
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={Menu1} width="1800"
                height="800" />
            </div>
            <div className="carousel-item ">
              <img src={Menu2} width="1800"
                height="800" />
            </div>
            <div className="carousel-item ">
              <img src={Menu3} width="1800"
                height="800" />
            </div>
            <div className="carousel-item ">
              <img src={Menu1} width="1800"
                height="800" />
            </div>
            <div className="carousel-item ">
              <img src={Menu2} width="1800"
                height="800" />
            </div>
            <div className="carousel-item ">
              <img src={Menu3} width="1800"
                height="800" />
            </div>
          </div>
          <button
            className="carousel-control-prev "
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon " aria-hidden="true"></span>
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
      </p>

      <p>
        <div className="container date">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title-left">Agenda tu Cita</h2>
                  <p className="card-text">
                    Aca podra agendar una cita colocar tus formulas en tu lente
                  </p>
                  <a href="#" className="btn btn-primary">
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
                  <p className="card-text">
                    Escoge la montura que más te guste para que tengas los
                    lentes más in del momento. trae para ti gran variedad de
                    monturas en tendencia, tanto de casas de diseño
                    internacional reconocidas, como sus marcas propias
                    realizadas bajo los más altos estándares de excelencia.
                    Todas nuestras monturas son 100% originales y certificadas.
                  </p>
                  <a href="#" className="btn btn-primary">
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
                  height="300"
                />

                <div className="card-body">
                  <h5 className="card-title">Cristales</h5>
                  <p className="card-text">
                    Escoge el cristal que más te guste con tu formula, aca
                    podras tener los lentes más in del momento. trae para ti
                    gran variedad de monturas en tendencia, tanto de casas de
                    diseño internacional reconocidas, como sus marcas propias
                    realizadas bajo los más altos estándares de excelencia.
                    Todas nuestras monturas son 100% originales y certificadas.
                  </p>
                  <a href="#" className="btn btn-primary">
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
                  height="300"
                />

                <div className="card-body">
                  <h5 className="card-title">Consultas</h5>
                  <p className="card-text">
                    En nuestra optica, puedes realizarte el examen de la vista
                    Contamos con optometristas capacitados para diagnosticar
                    cuáles son tus afecciones y así poder brindarte un producto
                    de calidad adaptado a tus necesidades. tambien le revisamos
                    para colocarle su montura.
                  </p>
                  <br></br>
                  <a href="#" className="btn btn-primary">
                    Mas Informacion
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <h2>Noticias</h2>
        <br></br>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title left">Ofertas</h5>

                  <p className="card-text left">
                    * Obtenga un 20 % de descuentos en monturas y lentes de sol
                    si se registra en nuestra pagina
                  </p>
                  <p className="card-text left">
                    * Ahora puede pagar con cashea, esto le permite pagar en
                    cuotas, y puede pagar 50 % de inicial
                  </p>
                  <p className="card-text left">
                    * Si necesitas asesoría en tu compra con gusto podemos
                    ayudarte a través de nuestro Whatsapp ¡Escríbenos!
                  </p>
                  <h5 className="card-title left">Ultimas Noticias</h5>
                  <p className="card-text left">
                    * Nuestros Horarios de atencion, son de lunes a sabado de
                    8am a 6pm de la tarde.
                  </p>
                  <p className="card-text left">
                    * Sistema de apartado, En esta modalidad se permite que el
                    cliente pague únicamente un 50% de la compra total, para
                    iniciar el proceso de manufactura de su lente. Una vez
                    cancelado este 50%, existen dos modalidades para cumplir con
                    el pago restante del monto establecido previo a la entrega
                    del producto.
                  </p>

                  <p className="card-text left">
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

        <br></br>
        <br></br>
        <br></br>
        <br></br>

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
                <p className="card-text left">
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
                <p className="card-text left">
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

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <h2>Testimonios</h2>
        <br></br>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="card">
                <img
                  src={Customers1}
                  className="card-img-top"
                  alt="..."
                  width="200"
                  height="200"
                />
                <p className="card-text left">
                  "Podrá consultar el estado de sus lentes en la sección de
                  “Pedidos” dentro de sistema de reserva de cita. te
                  recomendamos ue te registres en nuestra pagina."
                </p>
              </div>
            </div>

            <div className="col-4">
              <div className="card">
                <img
                  src={Customers2}
                  className="card-img-top"
                  alt="..."
                  width="200"
                  height="200"
                />

                <p className="card-text left">
                  "Podrá consultar el estado de sus lentes en la sección de
                  “Pedidos” dentro de sistema de reserva de cita. te
                  recomendamos ue te registres en nuestra pagina."
                </p>
              </div>
            </div>

            <div className="col-4">
              <div className="card">
                <img
                  src={Customers3}
                  className="card-img-top"
                  alt="..."
                  width="200"
                  height="200"
                />

                <p className="card-text left">
                  "Podrá consultar el estado de sus lentes en la sección de
                  “Pedidos” dentro de sistema de reserva de cita. te
                  recomendamos ue te registres en nuestra pagina."
                </p>
              </div>
            </div>
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <svg
                className="bd-placeholder-img rounded-circle"
                width="140"
                height="140"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect
                  width="100%"
                  height="100%"
                  fill="var(--bs-secondary-color)"
                ></rect>
              </svg>
              <h2 className="fw-normal">Heading</h2>
              <p>
                Some representative placeholder content for the three columns of
                text below the carousel. This is the first column.
              </p>
              <p>
                <a className="btn btn-secondary" href="#">
                  View details »
                </a>
              </p>
            </div>
          </div>
        </div>
      </p>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};
