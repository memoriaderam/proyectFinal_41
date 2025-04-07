// pages/Patients/ViewPatient.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPatientById } from "../../services/patientService";
import { PatientTabs } from "../../component/Patients/PatientTabs";
import { toast } from "react-toastify";

export const ViewPatient = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const data = await getPatientById(id);
                setPatient(data);
            } catch (error) {
                toast.error("Paciente no encontrado");
            }
        };
        fetchPatient();
    }, [id]);

    return (
        <div className="container mt-4">
            <h2>Detalle del Paciente</h2>
            {patient ? (
                <PatientTabs patient={patient} />
            ) : (
                <p>Cargando datos...</p>
            )}
        </div>
    );
};
