import React from "react";

export const StatsSummary = ({ stats }) => (
    <div>
        <h3>Usuarios</h3>
        <ul>
            <li>Pacientes: {stats?.usuarios?.pacientes}</li>
            <li>Doctores: {stats?.usuarios?.doctores}</li>
            <li>Administradores: {stats?.usuarios?.administradores}</li>
        </ul>
        <h3>Totales</h3>
        <ul>
            <li>Citas: {stats?.citas}</li>
            <li>Pedidos: {stats?.pedidos}</li>
            <li>Recetas: {stats?.recetas}</li>
            <li>Notificaciones: {stats?.notificaciones}</li>
            <li>Comentarios: {stats?.comentarios}</li>
        </ul>
    </div>
);