import { API_URL } from "./api";

export const getDoctors = async () => {
    const res = await fetch(`${API_URL}/doctors`);
    return res.json();
};

export const createDoctor = async (data) => {
    const res = await fetch(`${API_URL}/doctors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const updateDoctor = async (id, data) => {
    const res = await fetch(`${API_URL}/doctors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const deleteDoctor = async (id) => {
    const res = await fetch(`${API_URL}/doctors/${id}`, { method: "DELETE" });
    return res.json();
};