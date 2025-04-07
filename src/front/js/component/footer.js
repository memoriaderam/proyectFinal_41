import React from "react";

export const Footer = () => (
	<footer className="footer bg-dark text-light text-center py-3 mt-auto">
		<div className="container">
			<span>© {new Date().getFullYear()} Sistema de Gestión Oftalmológica</span>
		</div>
	</footer>
);
