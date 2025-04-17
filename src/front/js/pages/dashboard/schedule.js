import React, { useEffect } from "react";

export const Schedule = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="dashboard-section">
            <h2 className="dashboard-heading">Agendar una Cita</h2>
            <p className="dashboard-description">
                Utiliza el siguiente calendario para seleccionar la fecha y hora que más te convenga.
                Nuestro equipo estará encantado de atenderte y resolver todas tus dudas.
            </p>

            <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/inazariom-vlacademy?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=00796b&text_color=ffffff&primary_color=ffffff"
                style={{ minWidth: "320px", height: "700px" }}
            ></div>
        </div>
    );
};
