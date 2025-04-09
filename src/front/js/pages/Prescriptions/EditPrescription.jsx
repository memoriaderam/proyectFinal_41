import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPrescriptionById, updatePrescription } from "../../services/prescriptionService";
import { PrescriptionForm } from "../../component/Prescriptions/PrescriptionForm";
import { toast } from "react-toastify";

export const EditPrescription = () => {
    const { id } = useParams();
    const [prescription, setPrescription] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getPrescriptionById(id)
            .then(data => {
                const formatted = {
                    ...data,
                    dated_at: data.dated_at?.split("T")[0]
                };
                setPrescription(formatted);
            })
            .catch(() => toast.error("Receta no encontrada"));
    }, [id]);

    const onSubmit = async (data) => {
        const adjustedData = {
            ...data,
            dated_at: `${data.dated_at}T00:00:00`
        };

        try {
            const result = await updatePrescription(id, adjustedData);

            if (result.message !== "Receta actualizada correctamente") {
                throw new Error(result.message || "Error al actualizar");
            }

            toast.success("Receta actualizada");
            navigate("/prescriptions");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Editar Receta</h2>
            {prescription && <PrescriptionForm onSubmit={onSubmit} defaultValues={prescription} />}
        </div>
    );
};
