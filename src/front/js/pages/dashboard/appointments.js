import React, { useContext, useEffect } from "react";
import { Context } from "../../../js/store/appContext";
import "../../../styles/dashboard.css";
import { XCircle, CalendarCheck2, Clock4, Mail } from "lucide-react";

export const Appointments = () => {
    const { store, actions } = useContext(Context);
    const appointments = store.appointments || [];
    const loading = store.loadingAppointments;
    const canceling = store.cancelingAppointment;

    useEffect(() => {
        if (store.user?.email) {
            actions.loadAppointments();
        }
    }, [store.user]);

    const cancelButton = actions.cancelButton;

    return (
        <div className="dashboard-section">
            <h2 className="dashboard-heading">Mis Citas</h2>
            {loading ? (
                <p className="dashboard-loading">Cargando citas...</p>
            ) : appointments.length > 0 ? (
                <ul className="appointments-container">
                    {appointments.map((appointment, index) => (
                        <li key={index}>
                            <h3>Cita #{index + 1}</h3>
                            <div className="appointment-info">
                                <div>
                                    <p>
                                        <CalendarCheck2 size={20} />
                                        <span className="font-medium"> Evento:</span> {appointment.name}
                                    </p>
                                    <p>
                                        <Clock4 size={20} />
                                        <span className="font-medium"> Inicio:</span>{" "}
                                        {new Date(appointment.start_time).toLocaleString()}
                                    </p>
                                    <p>
                                        <Mail size={20} />
                                        <span className="font-medium"> Correo electrónico:</span> {appointment.email}
                                    </p>
                                </div>
                                <div className="appointment-actions">
                                    <button
                                        onClick={() => actions.cancelandloadAppointments(appointment.event_uri)}
                                        disabled={
                                            canceling === appointment.event_uri || appointment.status === "canceled"
                                        }
                                        className={`appointment-button ${cancelButton(
                                            appointment.status,
                                            canceling === appointment.event_uri
                                        )}`}
                                    >
                                        <XCircle size={20} />
                                        <span>
                                            {appointment.status === "canceled"
                                                ? "Cancelado"
                                                : canceling === appointment.event_uri
                                                    ? "Cancelando..."
                                                    : "Cancelar"}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="dashboard-loading">No tienes citas programadas.</p>
            )}
        </div>
    );
};