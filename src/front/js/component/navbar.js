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

        {/* Enlaces externos */}
        <a
          className="nav-link"
          href="https://www.google.co.ve/maps/place/MUNDO+OPTICO+2020/@10.5055061,-66.9002482,17z/data=!3m1!4b1!4m6!3m5!1s0x8c2a593d25221417:0xb28ad4a9d3c259a9!8m2!3d10.5055061!4d-66.9002482!16s%2Fg%2F11fky7qmzc?hl=es&entry=ttu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-solid fa-location-dot" /> Ubicación
        </a>

        <a
          className="nav-link"
          href="https://api.whatsapp.com/send?phone=584241394440&fbclid=PAZXh0bgNhZW0CMTEAAaYHvltvGRPTWqshI9XRn7fKpBaHJA49OTtOVY1qpFqQ7IP9h2loWOVVlgs_aem_e2MugYZyve_efZ-UZiQfVg"
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

        {/* Botón del menú lateral */}
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

        {/* Menú lateral */}
        <div
          className="offcanvas offcanvas-end text-bg-dark"
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

              {/* Secciones públicas */}
              <li className="nav-item"><Link className="nav-link" to="/usersacces">Agenda tu cita</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/aboutUs">Acerca de nosotros</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/sales">Monturas</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/crystals">Cristales</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/consultations">Consultas</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/brands">Marcas</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/usersadmin">Acceso Administrador</Link></li>

              {/* Secciones privadas / administrativas */}
              <li className="nav-item"><Link className="nav-link" to="/patients">Pacientes</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/orders">Pedidos</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/prescriptions">Recetas</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/doctors">Doctores</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/notifications">Notificaciones</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/comments">Comentarios</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/stats">Estadísticas</Link></li>

              {/* Blog */}
              <li className="nav-item"><Link className="nav-link" to="/posts">Blog</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/create/post">Crear Post</Link></li>

            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
