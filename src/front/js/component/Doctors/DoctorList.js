import React from "react";
import { GenericList } from "../shared/GenericList";

export const DoctorList = ({ doctors, onDelete }) => (
    <GenericList
        items={doctors}
        renderItem={(d) => `${d.full_name} (${d.speciality})`}
        onDelete={onDelete}
    />
);