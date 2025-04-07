import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../services/orderService";
import { OrderStatusBadge } from "../../component/Orders/OrderStatusBadge";
import { toast } from "react-toastify";

export const ViewOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        getOrderById(id).then(setOrder).catch(() => toast.error("Pedido no encontrado"));
    }, [id]);

    return (
        <div className="container mt-4">
            <h2>Detalle del Pedido</h2>
            {order ? (
                <div>
                    <p><strong>ID:</strong> {order.id}</p>
                    <p><strong>RUT Paciente:</strong> {order.identity_number}</p>
                    <p><strong>ID Receta:</strong> {order.prescrip_id}</p>
                    <p><strong>Tipo de lente:</strong> {order.lens_type}</p>
                    <p><strong>Tipo de marco:</strong> {order.frame_type}</p>
                    <p><strong>Precio:</strong> ${order.price}</p>
                    <p><strong>Fecha:</strong> {order.dated_at}</p>
                    <p><strong>Estado:</strong> <OrderStatusBadge status={order.status} /></p>
                </div>
            ) : (
                <p>Cargando datos...</p>
            )}
        </div>
    );
};
