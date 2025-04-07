import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { DoctorList } from "../component/Doctors/DoctorList";
import { DoctorForm } from "../component/Doctors/DoctorForm";

const DoctorsPage = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadDoctors();
    }, []);

    return (
        <div>
            <h2>Doctores</h2>
            <DoctorForm onSubmit={actions.createDoctor} />
            <DoctorList doctors={store.doctors} onDelete={actions.deleteDoctor} />
        </div>
    );
};

export default DoctorsPage;
