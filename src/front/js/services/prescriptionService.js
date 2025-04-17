import { API_URL } from "./api";

export const getPrescriptions = async () => {
    const res = await fetch(`${API_URL}/api/prescriptions`);
    return res.json();
};

export const getPrescriptionById = async (id) => {
    const res = await fetch(`${API_URL}/api/prescriptions/${id}`);
    if (!res.ok) throw new Error("No se pudo cargar la receta");
    return res.json();
};


export const createPrescription = async (data) => {
    const res = await fetch(`${API_URL}/api/prescriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const updatePrescription = async (id, data) => {
    const res = await fetch(`${API_URL}/api/prescriptions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const downloadPrescriptionPDF = (id) => {
    window.open(`${API_URL}/api/prescriptions/${id}/download`, "_blank");
};
