import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPatientById } from "../../services/patientService";
import { PatientTabs } from "../../component/Patients/PatientTabs";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

export const ViewPatient = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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
            <div className="d-flex justify-content-between align-items-center">
                <h2>Detalle del Paciente</h2>
                <div>
                    <Button variant="secondary" onClick={() => navigate("/patients")}>← Volver</Button>{' '}
                    <Button variant="warning" onClick={() => navigate(`/patients/${id}/update`)}>✏️ Editar</Button>
                </div>
            </div>
            <hr />
            {patient ? (
                <PatientTabs patient={patient} />
            ) : (
                <p>Cargando datos...</p>
            )}
        </div>
    );
};
