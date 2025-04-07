import React from "react";
import { useNavigate } from "react-router-dom";
import { OrderForm } from "../../component/Orders/OrderForm";
import { createOrder } from "../../services/orderService";
import { toast } from "react-toastify";

export const CreateOrder = () => {
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const adjustedData = {
            ...data,
            dated_at: `${data.dated_at}T00:00:00` // Asegura formato ISO con hora
        };

        try {
            const res = await createOrder(adjustedData);
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message);
            }
            toast.success("Pedido creado");
            navigate("/orders");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Nuevo Pedido</h2>
            <OrderForm onSubmit={onSubmit} />
        </div>
    );
};
