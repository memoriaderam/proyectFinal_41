import React from "react";
import { GenericForm } from "../shared/GenericForm";

export const AppointmentForm = ({ onSubmit }) => {
    const fields = [
        { name: "patient_id", placeholder: "ID del paciente" },
        { name: "doctor_id", placeholder: "ID del doctor" },
        { name: "date", placeholder: "Fecha" },
    ];
    return <GenericForm fields={fields} onSubmit={onSubmit} />;
};