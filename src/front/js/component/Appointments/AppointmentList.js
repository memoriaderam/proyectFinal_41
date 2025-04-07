import React from "react";
import { GenericList } from "../shared/GenericList";

export const AppointmentList = ({ appointments, onDelete }) => (
    <GenericList
        items={appointments}
        renderItem={(a) => `Cita ID: ${a.id} - Fecha: ${a.date}`}
        onDelete={onDelete}
    />
);