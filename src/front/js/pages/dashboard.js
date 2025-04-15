import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const Dashboard = () => {
    const clientId = "VwsF1l11Qq790rz9JC00cMT4tKLmEj-JoG7yTgUkEyk";
    const redirectUri = "http://localhost:3000/oauth/callback";
    const calendlyAuthUrl = `https://auth.calendly.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;


    return (
        <div className="dashboard">
            <nav className="dashboard-nav">
                <NavLink to="profile">Perfil</NavLink>
                <NavLink to="orders">Pedidos</NavLink>
                <NavLink to="appointments">Citas</NavLink>
                <NavLink to="schedule">Agendar</NavLink>
            </nav>

            <div className="dashboard-content">
                <Outlet />
            </div>
        </div>
    );
};