import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../services/orderService";
import { Card, Row, Col } from "react-bootstrap";
import { FaIdBadge, FaUser, FaPrescriptionBottle, FaGlasses, FaDollarSign, FaCalendar, FaTags } from "react-icons/fa";
import { toast } from "react-toastify";
import { OrderStatusBadge } from "../../component/Orders/OrderStatusBadge";
import { Context } from "../../store/appContext";

export const ViewOrder = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const [order, setOrder] = useState(null);

    useEffect(() => {
        getOrderById(id)
            .then(setOrder)
            .catch(() => toast.error("Pedido no encontrado"));
    }, [id]);

    const formatPrice = (price) => new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP"
    }).format(price);

    const formatDate = (dateStr) => {
        if (!dateStr) return "No disponible";
        const date = new Date(dateStr);
        return isNaN(date) ? "Fecha inválida" : date.toLocaleDateString("es-CL");
    };

    if (!order) return <p className="mt-4">Cargando pedido...</p>;

    return (
        <div className="container mt-4">
            <h2><FaIdBadge className="me-2" />Detalle del Pedido</h2>
            <Card className="shadow-sm mt-3">
                <Card.Body>
                    <Row className="mb-2">
                        <Col md={6}><FaUser className="me-2" /><strong>RUT Paciente:</strong> {order.identity_number}</Col>
                        <Col md={6}><FaPrescriptionBottle className="me-2" /><strong>ID Receta:</strong> {order.prescrip_id}</Col>
                    </Row>

                    <Row className="mb-2">
                        <Col md={6}><FaGlasses className="me-2" /><strong>Tipo de lente:</strong> {order.lens_type}</Col>
                        <Col md={6}><FaGlasses className="me-2" /><strong>Tipo de marco:</strong> {order.frame_type}</Col>
                    </Row>

                    <Row className="mb-2">
                        <Col md={6}><FaDollarSign className="me-2" /><strong>Precio:</strong> {formatPrice(order.price)}</Col>
                        <Col md={6}><FaCalendar className="me-2" /><strong>Fecha:</strong> {formatDate(order.dated_at)}</Col>
                    </Row>

                    <Row className="mb-2">
                        <Col md={12}><FaTags className="me-2" /><strong>Estado:</strong> <OrderStatusBadge status={order.status} /></Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};
