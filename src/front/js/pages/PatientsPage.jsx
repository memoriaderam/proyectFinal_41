import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { PatientList } from "../component/Patients/PatientList";
import { PatientForm } from "../component/Patients/PatientForm";
import { toast } from "react-toastify";

const PatientsPage = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadPatients();
    }, []);

    const handleCreatePatient = async (data) => {
        try {
            await actions.createPatient(data);
            toast.success("✅ Paciente creado correctamente");
        } catch (err) {
            toast.error(`❌ ${err.message || "Error al crear paciente"}`);
        }
    };

    return (
        <div>
            <h2>Pacientes</h2>
            <PatientForm onSubmit={handleCreatePatient} />
            <PatientList patients={store.patients || []} onDelete={actions.deletePatient} />
        </div>
    );
};

export default PatientsPage;