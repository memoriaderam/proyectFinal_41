import React, { useState, useRef, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/form.css";

export const Reset = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const formRef = useRef();

    return (
        <div className="container">
            <div className="title text-center">
                <h1>¿Olvidó su contraseña?</h1>
            </div>
            <div className="form">
                <form onSubmit={(e) => actions.submitReset(e, email)} ref={formRef}>
                    <label>Usuario o Correo Electrónico:</label>
                    <input type="text" className="form-input" placeholder="Usuario o Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </form>
            </div>
            <div className="container text-center">
                <button type="button" className="send-button" onClick={() => formRef.current.requestSubmit()}>Restablecer Contraseña</button>
                <p className="paragraph">¿Perdiste tu contraseña? Por favor, introduce tu nombre de usuario o<br></br> correo electrónico.
                    Recibirás un enlace para crear una contraseña<br></br> nueva por correo electrónico.</p>
            </div>
        </div>
    );
};