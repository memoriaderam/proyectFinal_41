import React, { useEffect, useState } from "react";
import { getOrders } from "../../services/orderService";
import { useNavigate } from "react-router-dom";
import { OrderTable } from "../../component/Orders/OrderTable";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

export const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        try {
            const data = await getOrders();
            setOrders(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Pedidos</h2>
            <Button variant="primary" onClick={() => navigate("/orders/new")}>➕ Nuevo Pedido</Button>
            <hr />
            {loading ? (
                <Spinner animation="border" className="mt-3" />
            ) : orders.length === 0 ? (
                <p className="text-muted">No hay pedidos registrados.</p>
            ) : (
                <OrderTable
                    orders={orders}
                    onView={(order) => navigate(`/orders/${order.id}`)}
                    onEdit={(order) => navigate(`/orders/${order.id}/edit`)}
                />
            )}
        </div>
    );
};