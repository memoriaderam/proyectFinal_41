import React, { useState, useRef } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../../styles/form.css";

export const Login = ({ register }) => {
    const [inputValue, setInputValue] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const formRef = useRef();
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const loginData = {
            email: inputValue,
            password
        };
    
        const result = await actions.loginUser(loginData);
    
        if (result.success) {
            console.log("✅ Login exitoso");
            navigate("/");
        } else {
            alert("❌ " + result.error);
        }
    };

    return (
        <div className="container">
            <div className="title text-center">
                <h1>Iniciar Sesión</h1>
            </div>
            <div className="form">
                <form onSubmit={handleSubmit} ref={formRef}>
                    <label>Usuario o Correo Electrónico: <span className="required"> * </span></label>
                    <input className="form-input" type="text" placeholder="Usuario o Correo" value={inputValue} onChange={(e) => setInputValue(e.target.value)} required />
                    <label>Contraseña: <span className="required"> * </span></label>
                    <div className="password-input-container-login">
                        <input className="form-input" type={showPassword ? "text" : "password"} placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="button" className="show-password" onClick={() => setShowPassword(!showPassword)}><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}></FontAwesomeIcon></button>
                    </div>
                    <span className="link mt-5">¿Olvidó su contraseña?</span>
                </form>
            </div>
            <div className="container text-center">
                <button type="button" className="send-button" onClick={() => formRef.current?.requestSubmit()}>Iniciar Sesión</button>
                <hr></hr>
                <h2>¿No es cliente?</h2>
                <p><span onClick={register} className="link">Cree su cuenta</span></p>
            </div>
        </div>
    );
};