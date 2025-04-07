import React from "react";
import { GenericList } from "../shared/GenericList";

export const PrescriptionList = ({ prescriptions, onDelete }) => (
    <GenericList
        items={prescriptions}
        renderItem={(p) => `Receta ID: ${p.id} - Diagnóstico: ${p.diagnosis}`}
        onDelete={onDelete}
    />
);