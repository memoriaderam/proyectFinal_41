import React from "react";
import { GenericForm } from "../shared/GenericForm";

export const DoctorForm = ({ onSubmit }) => {
    const fields = [
        { name: "full_name", placeholder: "Nombre completo" },
        { name: "email", placeholder: "Email" },
        { name: "identity_number", placeholder: "ID" },
        { name: "password", placeholder: "Contraseña", type: "password" },
        { name: "speciality", placeholder: "Especialidad" },
    ];
    return <GenericForm fields={fields} onSubmit={onSubmit} />;
};