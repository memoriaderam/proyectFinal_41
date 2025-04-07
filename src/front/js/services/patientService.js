import { API_URL } from "./api";

export const getPatients = async () => {
    const res = await fetch(`${API_URL}/patients`);
    return res.json();
};

export const createPatient = async (data) => {
    return await fetch(`${API_URL}/patients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
};

export const updatePatient = async (id, data) => {
    const res = await fetch(`${API_URL}/patients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const deletePatient = async (id) => {
    const res = await fetch(`${API_URL}/patients/${id}`, { method: "DELETE" });
    return res.json();
};
