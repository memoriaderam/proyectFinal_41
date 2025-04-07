import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { AppointmentList } from "../component/Appointments/AppointmentList";
import { AppointmentForm } from "../component/Appointments/AppointmentForm";

const AppointmentsPage = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadAppointments();
    }, []);

    return (
        <div>
            <h2>Citas</h2>
            <AppointmentForm onSubmit={actions.createAppointment} />
            <AppointmentList appointments={store.appointments} onDelete={actions.deleteAppointment} />
        </div>
    );
};

export default AppointmentsPage;
