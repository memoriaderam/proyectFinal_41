import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { PrescriptionList } from "../component/Prescriptions/PrescriptionList";
import { PrescriptionForm } from "../component/Prescriptions/PrescriptionForm";

const PrescriptionsPage = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadPrescriptions();
    }, []);

    return (
        <div>
            <h2>Recetas</h2>
            <PrescriptionForm onSubmit={actions.createPrescription} />
            <PrescriptionList prescriptions={store.prescriptions} onDelete={actions.deletePrescription} />
        </div>
    );
};

export default PrescriptionsPage;
