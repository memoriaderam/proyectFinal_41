import React, { useEffect, useState } from "react";
import { getOrders } from "../../services/orderService";
import { useNavigate } from "react-router-dom";
import { OrderTable } from "../../component/Orders/OrderTable";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

export const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        try {
            const data = await getOrders();
            setOrders(data);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Pedidos</h2>
            <Button variant="primary" onClick={() => navigate("/orders/new")}>
                ➕ Nuevo Pedido
            </Button>
            <hr />
            <OrderTable
                orders={orders}
                onView={(order) => navigate(`/orders/${order.order_id}`)}
                onEdit={(order) => navigate(`/orders/${order.order_id}/edit`)}
            />
        </div>
    );
};
