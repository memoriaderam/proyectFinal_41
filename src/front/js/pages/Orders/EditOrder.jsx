import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById, updateOrder } from "../../services/orderService";
import { OrderForm } from "../../component/Orders/OrderForm";
import { toast } from "react-toastify";

export const EditOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            toast.error("ID no válido");
            navigate("/orders");
            return;
        }

        getOrderById(id)
            .then(data => {
                const formatted = {
                    ...data,
                    dated_at: data.dated_at.split("T")[0]
                };
                setOrder(formatted);
            })
            .catch(() => toast.error("Pedido no encontrado"));
    }, [id, navigate]);

    const onSubmit = async (data) => {
        setLoading(true);
        const adjustedData = {
            ...data,
            dated_at: `${data.dated_at}T00:00:00`
        };

        try {
            const res = await updateOrder(id, adjustedData);
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message);
            }
            toast.success("Pedido actualizado");
            navigate("/orders");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Editar Pedido</h2>
            {order ? (
                <OrderForm onSubmit={onSubmit} defaultValues={order} loading={loading} isEdit={true} />
            ) : (
                <p className="text-muted">Cargando pedido...</p>
            )}
        </div>
    );
};