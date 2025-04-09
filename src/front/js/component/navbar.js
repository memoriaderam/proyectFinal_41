import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					Gestor Oftalmológico
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className="nav-link" to="/doctors">Doctores</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/patients">Pacientes</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/prescriptions">Recetas</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/orders">Pedidos</Link>
						</li>
						{/* 
						<li className="nav-item">
							<Link className="nav-link" to="/appointments">Citas</Link>
						</li>
						*/}


						<li className="nav-item">
							<Link className="nav-link" to="/notifications">Notificaciones</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/comments">Comentarios</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/stats">Estadísticas</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};