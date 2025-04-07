import { API_URL } from "./api";

export const getPrescriptions = async () => {
    const res = await fetch(`${API_URL}/prescriptions`);
    return res.json();
};

export const createPrescription = async (data) => {
    const res = await fetch(`${API_URL}/prescriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const updatePrescription = async (id, data) => {
    const res = await fetch(`${API_URL}/prescriptions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};