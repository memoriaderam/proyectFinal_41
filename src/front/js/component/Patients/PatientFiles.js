import React from "react";

export const PatientFiles = ({ patientId }) => {
    return (
        <div>
            <p>Archivos adjuntos del paciente ID: {patientId}</p>
            {/* Aquí irían los archivos asociados */}
        </div>
    );
};