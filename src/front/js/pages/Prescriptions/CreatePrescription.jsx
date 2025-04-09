import React from "react";
import { useNavigate } from "react-router-dom";
import { PrescriptionForm } from "../../component/Prescriptions/PrescriptionForm";
import { createPrescription } from "../../services/prescriptionService";
import { toast } from "react-toastify";

export const CreatePrescription = () => {
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const adjustedData = {
            ...data,
            dated_at: `${data.dated_at}T00:00:00`
        };

        try {
            const result = await createPrescription(adjustedData);

            // Puedes validar algún campo si deseas, como msg o errores
            if (result.msg !== "Receta creada exitosamente") {
                throw new Error(result.msg || "Error desconocido");
            }

            toast.success("Receta creada");
            navigate("/prescriptions");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Nueva Receta</h2>
            <PrescriptionForm onSubmit={onSubmit} />
        </div>
    );
};
