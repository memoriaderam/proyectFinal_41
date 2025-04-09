import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Row, Col, Card } from "react-bootstrap";
import { StatsSummary } from "../component/Stats/StatsSummary.jsx";
import { AppointmentsChart } from "../component/Stats/AppointmentsChart";
import { OrdersChart } from "../component/Stats/OrdersChart";
import { PatientsChart } from "../component/Stats/PatientsChart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const StatsPage = () => {
    const { store, actions } = useContext(Context);
    const stats = store.stats || {};

    useEffect(() => {
        actions.loadStats();
    }, []);

    const resumenData = [
        { name: "Pacientes", value: stats?.usuarios?.pacientes || 0 },
        { name: "Doctores", value: stats?.usuarios?.doctores || 0 },
        { name: "Admins", value: stats?.usuarios?.administradores || 0 },
        { name: "Citas", value: stats?.citas || 0 },
        { name: "Pedidos", value: stats?.pedidos || 0 },
        { name: "Recetas", value: stats?.recetas || 0 },
        { name: "Notificaciones", value: stats?.notificaciones || 0 },
        { name: "Comentarios", value: stats?.comentarios || 0 }
    ];

    const pacientesChartData = [
        { name: "Pacientes", value: stats?.usuarios?.pacientes || 0 },
        { name: "Doctores", value: stats?.usuarios?.doctores || 0 },
        { name: "Administradores", value: stats?.usuarios?.administradores || 0 }
    ];

    const citasData = [{ name: "Citas", value: stats?.citas || 0 }];
    const pedidosData = [{ name: "Pedidos", value: stats?.pedidos || 0 }];

    return (
        <div className="container mt-4">
            <h2>📊 Panel de Estadísticas del Sistema</h2>
            <hr />

            <Row className="mb-4">
                {resumenData.map((item, idx) => (
                    <Col key={idx} md={3} sm={6} xs={12} className="mb-3">
                        <Card className="shadow-sm text-center">
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <h3>{item.value}</h3>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row className="mb-5">
                <Col md={6}>
                    <h5 className="text-center">Usuarios por Rol</h5>
                    <PatientsChart data={pacientesChartData} />
                </Col>
                <Col md={6}>
                    <h5 className="text-center">Resumen Global</h5>
                    <BarChart width={500} height={300} data={resumenData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#007bff" />
                    </BarChart>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <h5 className="text-center">Citas</h5>
                    <AppointmentsChart data={citasData} />
                </Col>
                <Col md={6}>
                    <h5 className="text-center">Pedidos</h5>
                    <OrdersChart data={pedidosData} />
                </Col>
            </Row>

            <hr />
            <StatsSummary stats={stats} />
        </div>
    );
};

export default StatsPage;
