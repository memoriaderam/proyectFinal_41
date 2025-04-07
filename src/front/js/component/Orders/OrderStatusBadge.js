import React from "react";
import { Badge } from "react-bootstrap";

export const OrderStatusBadge = ({ status }) => {
    const variant = {
        pendiente: "secondary",
        en_proceso: "warning",
        listo: "info",
        entregado: "success",
    }[status] || "dark";

    return <Badge bg={variant}>{status}</Badge>;
};