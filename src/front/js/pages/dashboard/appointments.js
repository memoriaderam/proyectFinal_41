import React, { useState } from 'react';
import { Context } from "../../../js/store/appContext";
import { useContext } from "react";
import "../../../styles/form.css";

export const Appointments = () => {
    const { actions } = useContext(Context);
    const [appointments, setAppointments] = useState([]);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [canceling, setCanceling] = useState(null);

    const getAppointments = async () => {
        if (!email) {
            setError("Por favor, introduce un correo electrónico.");
            return;
        }

        setError('');
        setLoading(true);

        try {
            const resp = await fetch(`http://localhost:3001/api/v1/calendly/appointments?email=${email}`);
            const data = await resp.json();

            if (!resp.ok) {
                setError(data.msg || "Error al obtener las citas");
                setAppointments([]);
            } else {
                setAppointments(data.items || []);
            }

        } catch (error) {
            console.error('Error al obtener las citas', error);
            setError("Error de conexión con el servidor");
            setAppointments([]);
        }

        setLoading(false);
    };

    const cancelarCita = async (event_uri, invitee_uri) => {
        setCanceling(invitee_uri);

        try {
            const resp = await fetch(`http://localhost:3001/api/v1/calendly/cancel`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    event_uri: event_uri,
                    email: email
                })
            });

            const data = await resp.json();

            if (!resp.ok) {
                alert(data.msg || "Error al cancelar cita");
            } else {
                alert("Cita cancelada correctamente");
                // Refrescar lista de citas
                getAppointments();
            }

        } catch (error) {
            console.error("Error al cancelar cita:", error);
            alert("Error del servidor al cancelar cita");
        }

        setCanceling(null);
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Mis Citas de Calendly</h2>

            <div className="mb-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Introduce tu correo"
                    className="border p-2 w-full sm:w-auto"
                />
                <button
                    onClick={getAppointments}
                    className="ml-2 p-2 bg-blue-500 text-white rounded"
                    disabled={loading}
                >
                    {loading ? "Buscando..." : "Obtener Citas"}
                </button>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div>
                {appointments.length > 0 ? (
                    <ul>
                        {appointments.map((appointment, index) => (
                            <li key={index} className="mb-4 p-4 border rounded shadow">
                                <p><strong>Evento:</strong> {appointment.name}</p>
                                <p><strong>Inicio:</strong> {new Date(appointment.start_time).toLocaleString()}</p>
                                <p><strong>Invitado:</strong> {appointment.email}</p>
                                <button
                                    onClick={async () => {
                                        console.log("Botón clickeado", appointment.event_uri);
                                        setCanceling(appointment.event_uri);
                                        await actions.cancelarCita(appointment.event_uri, email);
                                        await getAppointments(); // Recarga las citas
                                        setCanceling(null);
                                    }}
                                    className={`mt-2 px-3 py-1 rounded ${appointment.status === "canceled" ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 text-white"}`}
                                    disabled={canceling === appointment.event_uri || appointment.status === "canceled"}
                                >
                                    {appointment.status === "canceled"
                                        ? "Cancelado"
                                        : canceling === appointment.event_uri
                                            ? "Cancelando..."
                                            : "Cancelar Cita"}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    !loading && <p>No tienes citas programadas.</p>
                )}
            </div>
        </div>
    );
};