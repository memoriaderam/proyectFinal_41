import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Schedule = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleCalendlyEvent = (event) => {
            if (
                event.origin === "https://calendly.com" &&
                event.data?.event === "calendly.event_scheduled"
            ) {
                console.log("¡Cita agendada!");

                // Redirigir después de 4 segundos
                setTimeout(() => {
                    navigate("/dashboard/appointment");
                }, 4000);
            }
        };

        window.addEventListener("message", handleCalendlyEvent);

        const existingScript = document.querySelector(
            "script[src='https://assets.calendly.com/assets/external/widget.js']"
        );
        if (!existingScript) {
            const script = document.createElement("script");
            script.src = "https://assets.calendly.com/assets/external/widget.js";
            script.async = true;
            document.body.appendChild(script);
        }

        return () => {
            window.removeEventListener("message", handleCalendlyEvent);
        };
    }, [navigate]);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Agendar una Cita</h2>
            <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/inazariom-vlacademy"
                style={{ minWidth: "320px", height: "700px" }}
            ></div>
        </div>
    );
};