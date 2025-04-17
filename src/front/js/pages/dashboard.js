import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../styles/dashboard.css";
import { FaUser, FaShoppingCart, FaCalendarAlt, FaClock } from "react-icons/fa";

export const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <aside className="dashboard-sidebar">
                <h2 className="dashboard-title">Panel Premium</h2>
                <nav className="dashboard-nav">
                    <NavLink to="profile" className="dashboard-link"><FaUser /> Perfil</NavLink>
                    <NavLink to="orders" className="dashboard-link"><FaShoppingCart /> Pedidos</NavLink>
                    <NavLink to="appointments" className="dashboard-link"><FaCalendarAlt /> Citas</NavLink>
                    <NavLink to="schedule" className="dashboard-link"><FaClock /> Agendar</NavLink>
                </nav>
            </aside>
            <main className="dashboard-content">
                <Outlet />
            </main>
        </div>
    );
};
