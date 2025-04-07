import React, { useEffect, useState } from "react";
import { PatientForm } from "../../component/Patients/PatientForm";
import { useParams, useNavigate } from "react-router-dom";
import { getPatientById, updatePatient } from "../../services/patientService";
import { toast } from "react-toastify";

export const EditPatient = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        getPatientById(id).then(setPatient);
    }, [id]);

    const onSubmit = async (data) => {
        await updatePatient(id, data);
        toast.success("Paciente actualizado");
        navigate("/pacientes");
    };

    return (
        <div className="container mt-4">
            <h2>Editar Paciente</h2>
            {patient && <PatientForm onSubmit={onSubmit} defaultValues={patient} />}
        </div>
    );
};
