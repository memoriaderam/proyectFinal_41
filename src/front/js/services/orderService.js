import { API_URL } from "./api";

export const getOrders = async () => {
    const res = await fetch(`${API_URL}/orders`);
    return res.json();
};

export const createOrder = async (data) => {
    const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const updateOrder = async (id, data) => {
    const res = await fetch(`${API_URL}/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};