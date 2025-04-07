import { API_URL } from "./api";

export const getAppointments = async () => {
    const res = await fetch(`${API_URL}/appointments`);
    return res.json();
};

export const createAppointment = async (data) => {
    const res = await fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const updateAppointment = async (id, data) => {
    const res = await fetch(`${API_URL}/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};