import { API_URL } from "./api";

export const getPatients = async () => {
    try {
        const res = await fetch(`${API_URL}/api/patients`);
        if (!res.ok) throw await res.json();
        return await res.json();
    } catch (error) {
        console.error("Error al obtener pacientes:", error.message);
        return [];
    }
};

export const getPatientById = async (id) => {
    try {
        const res = await fetch(`${API_URL}/api/patients/${id}`);
        if (!res.ok) throw await res.json();
        return await res.json();
    } catch (error) {
        throw new Error(error.message || "Error al obtener el paciente");
    }
};

export const createPatient = async (patientData) => {
    try {
        const res = await fetch(`${API_URL}/api/patients`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patientData)
        });
        return res;
    } catch (error) {
        throw new Error("Error de red al crear paciente");
    }
};

export const updatePatient = async (id, updatedData) => {
    try {
        const res = await fetch(`${API_URL}/api/patients/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        });
        return res;
    } catch (error) {
        throw new Error("Error de red al actualizar paciente");
    }
};

export const deletePatient = async (id) => {
    try {
        const res = await fetch(`${API_URL}/api/patients/${id}`, {
            method: "DELETE"
        });
        if (!res.ok) throw await res.json();
        return await res.json();
    } catch (error) {
        throw new Error(error.message || "Error al eliminar paciente");
    }
};