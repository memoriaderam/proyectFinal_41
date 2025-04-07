import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { PatientTabs } from "../components/Patients/PatientTabs";

const PatientDetailPage = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadPatients();
    }, []);

    const patient = store.patients.find(p => p.identity_number === id);

    if (!patient) return <p>Cargando paciente...</p>;

    return (
        <div>
            <h2>Detalle del Paciente</h2>
            <PatientTabs patient={patient} />
        </div>
    );
};

export default PatientDetailPage;
