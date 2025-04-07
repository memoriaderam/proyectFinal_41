import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Explicación: Usamos Recharts para mostrar datos clave del sistema 
// en un gráfico de barras.

const StatsPage = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadStats();
    }, []);

    const data = [
        { name: "Pacientes", value: store.stats?.usuarios?.pacientes || 0 },
        { name: "Doctores", value: store.stats?.usuarios?.doctores || 0 },
        { name: "Admins", value: store.stats?.usuarios?.administradores || 0 },
        { name: "Citas", value: store.stats?.citas || 0 },
        { name: "Pedidos", value: store.stats?.pedidos || 0 },
        { name: "Recetas", value: store.stats?.recetas || 0 }
    ];

    return (
        <div>
            <h2>Estadísticas del sistema</h2>
            <BarChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#007bff" />
            </BarChart>
        </div>
    );
};

export default StatsPage;
