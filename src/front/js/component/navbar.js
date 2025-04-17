import React from "react";
import Menu from "../../img/Menu.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCircleInfo,
  faTags,
  faGlasses,
  faSearch,
  faStethoscope,
  faCalendarPlus,
  faNewspaper,
  faPenToSquare,
  faRightToBracket,
  faUserPlus,
  faKey,
  faLock,
  faUserShield,
  faUserInjured,
  faBoxOpen,
  faCartPlus,
  faFilePrescription,
  faPrescriptionBottle,
  faUserDoctor,
  faBell,
  faComments,
  faChartBar,
  faTachometerAlt,
  faUser,
  faClipboardList,
  faCalendarCheck,
  faCalendarDays
} from "@fortawesome/free-solid-svg-icons";

const menuItems = [
  ["Inicio", "/", faHouse],
  ["Acerca de Nosotros", "/aboutUs", faCircleInfo],
  ["Marcas", "/brands", faTags],
  ["Monturas", "/sales", faGlasses],
  ["Cristales", "/crystals", faSearch],
  ["Consultas", "/consultations", faStethoscope],
  ["Agendar Cita", "/usersacces", null], //faCalendarPlus
  ["Blog", "/posts", faNewspaper],
  ["Crear Post", "/create/post", faPenToSquare],
  ["Iniciar Sesión", "/login", null], //faRightToBracket
  ["Registrarse", "/register", null], //faUserPlus
  ["Recuperar Contraseña", "/reset", faKey],
  ["Nueva Contraseña", "/new_password", null], //faLock
  ["Acceso Administrador", "/usersadmin", null], //faUserShield
  ["Pacientes", "/patients", faUserInjured],
  //["Nuevo Paciente", "/patients/new", faUserPlus],
  ["Pedidos", "/orders", faBoxOpen],
  //["Nuevo Pedido", "/orders/new", faCartPlus],
  ["Recetas", "/prescriptions", faFilePrescription],
  //["Nueva Receta", "/prescriptions/new", faPrescriptionBottle],
  ["Doctores", "/doctors", null], //faUserDoctor
  ["Notificaciones", "/notifications", null], //faBell
  ["Comentarios", "/comments", null], //faComments
  ["Estadísticas", "/stats", faChartBar],
  ["Dashboard", "/dashboard", null], //faTachometerAlt
  ["Perfil", "/dashboard/profile", null], //faUser
  ["Pedidos Dashboard", "/dashboard/orders", null], //faClipboardList
  ["Citas", "/dashboard/appointments", null], //faCalendarCheck
  ["Agenda", "/dashboard/schedule", null] //faCalendarDays
];

export const Navbar = () => {
  return (
    <nav className="navbar navbar-fixed-top nav">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <h1>Mundo Optico 20/20</h1>
        </Link>

        <a className="nav-link" href="https://www.google.co.ve/maps/place/MUNDO+OPTICO+2020" target="_blank" rel="noopener noreferrer">
          <i className="fa-solid fa-location-dot" /> Ubicación
        </a>

        <a className="nav-link" href="https://api.whatsapp.com/send?phone=584241394440" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-whatsapp" /> WhatsApp
        </a>

        <a className="nav-link" href="https://www.instagram.com/mundooptico2020/" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-square-instagram" /> Instagram
        </a>

        <button className="navbar-toggler button" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar">
          <span><img src={Menu} alt="Menú" /></span>
        </button>

        <div className="offcanvas offcanvas-end text-bg-light" id="offcanvasDarkNavbar">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Mundo Optico 20/20</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" />
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {menuItems.map(([label, path, icon]) => (
                <li className="nav-item" key={path}>
                  <Link className="nav-link d-flex justify-content-between align-items-center" to={path}>
                    {label} <FontAwesomeIcon icon={icon} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
