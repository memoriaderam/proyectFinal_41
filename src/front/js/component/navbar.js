import React from "react";
import Menu from "../../img/Menu.jpg";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-fixed-top nav">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <h1>Mundo Optico 20/20</h1>
        </Link>

        <a
          className="nav-link"
          href="https://www.google.co.ve/maps/place/MUNDO+OPTICO+2020/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-solid fa-location-dot" /> Ubicación{" "}
        </a>

        <a
          className="nav-link"
          href="https://api.whatsapp.com/send?phone=584241394440"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-whatsapp" /> WhatsApp
        </a>

        <a
          className="nav-link"
          href="https://www.instagram.com/mundooptico2020/"
          target="_blank"
          rel="noopener noreferrer"
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
            <img src={Menu} alt="Menú" />
          </span>
        </button>

        <div
          className="offcanvas offcanvas-end text-bg-light"
          tabIndex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
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
              {/* Rutas públicas */}
              <li className="nav-item">
                <Link className="nav-link" to="/usersacces">Agenda tu cita</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/aboutUs">Acerca de nosotros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sales">Monturas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/crystals">Cristales</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/consultations">Consultas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/brands">Marcas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/usersadmin">Acceso Administrador</Link>
              </li>

              {/* Secciones privadas o de administración */}
              <li className="nav-item">
                <Link className="nav-link" to="/patients">Pacientes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">Pedidos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/prescriptions">Recetas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/doctors">Doctores</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/notifications">Notificaciones</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/comments">Comentarios</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/stats">Estadísticas</Link>
              </li>

              {/* Blog */}
              <li className="nav-item">
                <Link className="nav-link" to="/posts">Blog</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create/post">Crear Post</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
