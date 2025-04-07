import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById, updateOrder } from "../../services/orderService";
import { OrderForm } from "../../component/Orders/OrderForm";
import { toast } from "react-toastify";

export const EditOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getOrderById(id)
            .then(data => {
                // Adaptar fecha para <input type="date" />
                const formatted = {
                    ...data,
                    dated_at: data.dated_at.split("T")[0]
                };
                setOrder(formatted);
            })
            .catch(() => toast.error("Pedido no encontrado"));
    }, [id]);

    const onSubmit = async (data) => {
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
        }
    };

    return (
        <div className="container mt-4">
            <h2>Editar Pedido</h2>
            {order && <OrderForm onSubmit={onSubmit} defaultValues={order} />}
        </div>
    );
};
