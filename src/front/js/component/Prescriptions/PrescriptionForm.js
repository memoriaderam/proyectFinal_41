import React from "react";
import { GenericForm } from "../shared/GenericForm";

export const PrescriptionForm = ({ onSubmit }) => {
    const fields = [
        { name: "patient_id", placeholder: "ID del paciente" },
        { name: "diagnosis", placeholder: "Diagnóstico" },
        { name: "prescription", placeholder: "Receta" },
    ];
    return <GenericForm fields={fields} onSubmit={onSubmit} />;
};