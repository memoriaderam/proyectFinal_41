import React from "react";
import { GenericList } from "../shared/GenericList";

export const PatientList = ({ patients, onDelete }) => (
    <GenericList
        items={patients}
        renderItem={(p) => `${p.full_name} (${p.email})`}
        onDelete={onDelete}
    />
);