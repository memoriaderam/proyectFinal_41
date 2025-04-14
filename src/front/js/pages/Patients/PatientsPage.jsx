import React, { useEffect, useState } from "react";
import { PatientTable } from "../../component/Patients/PatientTable";
import { useNavigate } from "react-router-dom";
import { getPatients, deletePatient } from "../../services/patientService";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

export const PatientsPage = () => {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();

    const fetchPatients = async () => {
        const res = await getPatients();
        setPatients(res || []);
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleDelete = async (dni) => {
        if (window.confirm("¿Seguro que deseas eliminar este paciente?")) {
            try {
                await deletePatient(dni);
                toast.success("Paciente eliminado");
                fetchPatients(); // refresca la tabla
            } catch (error) {
                toast.error(`Error al eliminar: ${error.message}`);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Pacientes</h2>
            <Button variant="primary" onClick={() => navigate("/patients/new")}>
                ➕ Agregar Paciente
            </Button>
            <hr />
            <PatientTable
                patients={patients}
                onView={(p) => navigate(`/patients/${p.dni}`)}
                onEdit={(p) => navigate(`/patients/${p.dni}/update`)}
                onDelete={handleDelete}
            />
        </div>
    );
};
