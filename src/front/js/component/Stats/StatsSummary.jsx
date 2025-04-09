import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaUserMd, FaUser, FaUsers, FaClipboardList, FaComment, FaBell, FaEye } from "react-icons/fa";

export const StatsSummary = ({ stats }) => (
    <div className="mt-4">
        <h4>📋 Resumen Informativo</h4>
        <Row className="mt-3">
            <Col md={4}>
                <Card className="mb-3 shadow-sm">
                    <Card.Body>
                        <Card.Title><FaUsers className="me-2" />Usuarios</Card.Title>
                        <ul>
                            <li><FaUser className="me-2" />Pacientes: {stats?.usuarios?.pacientes}</li>
                            <li><FaUserMd className="me-2" />Doctores: {stats?.usuarios?.doctores}</li>
                            <li><FaEye className="me-2" />Administradores: {stats?.usuarios?.administradores}</li>
                        </ul>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={8}>
                <Card className="mb-3 shadow-sm">
                    <Card.Body>
                        <Card.Title><FaClipboardList className="me-2" />Totales</Card.Title>
                        <ul>
                            <li><FaClipboardList className="me-2" />Citas: {stats?.citas}</li>
                            <li><FaClipboardList className="me-2" />Pedidos: {stats?.pedidos}</li>
                            <li><FaClipboardList className="me-2" />Recetas: {stats?.recetas}</li>
                            <li><FaBell className="me-2" />Notificaciones: {stats?.notificaciones}</li>
                            <li><FaComment className="me-2" />Comentarios: {stats?.comentarios}</li>
                        </ul>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
);
