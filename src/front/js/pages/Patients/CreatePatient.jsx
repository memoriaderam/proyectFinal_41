// pages/Patients/CreatePatient.jsx
import React from "react";
import { PatientForm } from "../../component/Patients/PatientForm";
import { useNavigate } from "react-router-dom";
import { createPatient } from "../../services/patientService";
import { toast } from "react-toastify";

export const CreatePatient = () => {
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await createPatient(data);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error desconocido");
            }

            toast.success("Paciente creado exitosamente");
            navigate("/patients");
        } catch (error) {
            if (error.message.includes("ya existe")) {
                toast.error("Ya existe un paciente con ese email o RUT.");
            } else if (error.message.includes("role_id")) {
                toast.error("Error: el rol debe ser 3 para pacientes.");
            } else if (error.message.includes("rol especificado")) {
                toast.error("El rol no existe en el sistema.");
            } else {
                toast.error(`Error inesperado: ${error.message}`);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Nuevo Paciente</h2>
            <PatientForm onSubmit={onSubmit} />
        </div>
    );
};
