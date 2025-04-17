import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/form.css";

export const New_Password = () => {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const { actions } = useContext(Context);

    return (
        <div className="container">
            <div className="title text-center">
                <h1>Crear nueva contraseña</h1>
            </div>
            <div className="second-form">
                <form onSubmit={(e) => actions.submitToken(e, token, password, confirm, navigate)}>
                    <label>Token:</label>
                    <input type="text" className="form-input" placeholder="Token" value={token} onChange={(e) => setToken(e.target.value)} required />
                    <label>Nueva Contraseña:</label>
                    <input type="password" className="form-input" placeholder="Nueva Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <label>Confirmar Contraseña:</label>
                    <input type="password" className="form-input mb-3" placeholder="Confirmar Contraseña" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
                    <button type="submit" className="send-button2">Guardar Contraseña</button>
                </form>
            </div>
        </div>
    );
};