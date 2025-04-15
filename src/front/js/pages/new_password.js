import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const New_Password = () => {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { actions } = useContext(Context);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!token) {
            setError("Por favor ingresa el token.");
            return;
        }
        if (password !== confirm) {
            setError("Las contraseñas no coinciden.");
            return;
        }
        actions.handleNewPassword(e, token, password, confirm, navigate, setError);
    };

    return (
        <div className="container mt-4">
            <h1>Crear nueva contraseña</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Token:</label>
                <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                />
                <label>Nueva contraseña:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label>Confirmar contraseña:</label>
                <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                />
                <button type="submit">Guardar Contraseña</button>
            </form>
        </div>
    );
};
