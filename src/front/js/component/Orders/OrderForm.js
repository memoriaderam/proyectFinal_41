import React from "react";
import { GenericForm } from "../shared/GenericForm";

export const OrderForm = ({ onSubmit }) => {
    const fields = [
        { name: "patient_id", placeholder: "ID del paciente" },
        { name: "status", placeholder: "Estado del pedido" },
    ];
    return <GenericForm fields={fields} onSubmit={onSubmit} />;
};