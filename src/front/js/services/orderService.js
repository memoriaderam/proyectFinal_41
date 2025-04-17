import { API_URL } from "./api";

export const getOrders = async () => {
    try {
        const res = await fetch(`${API_URL}/api/orders`);
        if (!res.ok) throw await res.json();
        return await res.json();
    } catch (error) {
        throw new Error(error.message || "Error al obtener pedidos");
    }
};

export const getOrderById = async (id) => {
    try {
        const res = await fetch(`${API_URL}/api/orders/${id}`);
        if (!res.ok) throw await res.json();
        return await res.json();
    } catch (error) {
        throw new Error(error.message || "Pedido no encontrado");
    }
};

export const createOrder = async (data) => {
    try {
        const res = await fetch(`${API_URL}/api/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return res;
    } catch (error) {
        throw new Error("Error de red al crear pedido");
    }
};

export const updateOrder = async (id, data) => {
    try {
        const res = await fetch(`${API_URL}/api/orders/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return res;
    } catch (error) {
        throw new Error("Error de red al actualizar pedido");
    }
};
