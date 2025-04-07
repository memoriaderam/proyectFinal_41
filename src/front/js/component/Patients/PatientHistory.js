import React from "react";

export const PatientHistory = ({ patientId }) => {
    return (
        <div>
            <p>Recetas del paciente ID: {patientId}</p>
            {/* Aquí irían recetas relacionadas */}
        </div>
    );
};