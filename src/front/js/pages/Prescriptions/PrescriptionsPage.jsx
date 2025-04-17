
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPrescriptions } from "../../services/prescriptionService";
import { Button } from "react-bootstrap";
import { PrescriptionTable } from "../../pages/Prescriptions/PrescriptionTable";
import { toast } from "react-toastify";

export const PrescriptionsPage = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const navigate = useNavigate();

    const fetchPrescriptions = async () => {
        try {
            const data = await getPrescriptions();
            setPrescriptions(data);
        } catch (error) {
            toast.error("Error al cargar recetas");
        }
    };

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Recetas</h2>
            <Button variant="primary" onClick={() => navigate("/prescriptions/new")}>
                ➕ Nueva Receta
            </Button>
            <hr />
            <PrescriptionTable
                prescriptions={prescriptions}
                onView={(p) => navigate(`/prescriptions/${p.id}`)}
                onEdit={(p) => navigate(`/prescriptions/${p.id}/edit`)}
            />
        </div>
    );
};
