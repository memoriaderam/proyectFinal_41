import React from "react";
import Menu from "../../img/Menu.jpg";
import { Link } from "react-router-dom";
import Home from "../pages/home.js";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-fixed-top nav">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <h1>Mundo Optico 20/20</h1>
        </a>

        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <a
          class="nav-link"
          href="https://www.google.co.ve/maps/place/MUNDO+OPTICO+2020/@10.5055061,-66.9002482,17z/data=!3m1!4b1!4m6!3m5!1s0x8c2a593d25221417:0xb28ad4a9d3c259a9!8m2!3d10.5055061!4d-66.9002482!16s%2Fg%2F11fky7qmzc?hl=es&entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"
          target="_blank"
        >
          <i className="fa-solid fa-location-dot" /> Ubicación{" "}
        </a>

        <a
          class="nav-link"
          href="https://api.whatsapp.com/send?phone=584241394440&fbclid=PAZXh0bgNhZW0CMTEAAaYHvltvGRPTWqshI9XRn7fKpBaHJA49OTtOVY1qpFqQ7IP9h2loWOVVlgs_aem_e2MugYZyve_efZ-UZiQfVg"
          target="_blank"
        >
          <i className="fa-brands fa-whatsapp" /> Whatapp
        </a>

        <a
          class="nav-link"
          href="https://www.instagram.com/mundooptico2020/"
          target="_blank"
        >
          <i className="fa-brands fa-square-instagram" /> Instagram
        </a>

        <button
          className="navbar-toggler button"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation"
        >
          <span>
            <img src={Menu} />
          </span>
        </button>

        <div
          className="offcanvas offcanvas-end text-bg-light"
          tabindex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel border"
        >
          <div className="offcanvas-header ">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              Mundo Optico 20/20
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/usersAcces">
                  Agenda tu cita
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/aboutUs">
                  Acerca de nosotros
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/sales">
                  Monturas
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/crystals">
                  Cristales
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/consultations">
                  Consultas
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/brands">
                  Marcas
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/testimony">
                  Testimonios
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/usersadmin">
                  Acceso Administrador
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

  );
};

