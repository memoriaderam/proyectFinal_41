import React, { useState, useRef, useContext } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../../styles/form.css";

export const Register = ({ create }) => {
    const formRef = useRef();
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");
    const navigate = useNavigate();
    const { actions } = useContext(Context);

    const [data, setData] = useState({
        id: 0,
        dni: "",
        full_name: "",
        email: "",
        password: "",
        gender: "",
        age: 0,
        address: "",
        phone: "",
        speciality: "",
        role_id: 1
    });
    

    const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await actions.createUser(data);

    if (result.success) {
        console.log("✅ Usuario creado correctamente");
        formRef.current.reset(); // limpia el formulario si quieres
        navigate("/login"); // redirige al login
    } else {
        console.error("❌ Error:", result.error);
    }
};

    const handleChange = (e) => {  //Estas funciones las puedes pasar al actions
        const { name, value } = e.target;
        setData({ ...data, [name]: value });

        if (name === "password") {
            setPasswordStrength(getPasswordStrength(value));
        }
    };

    const getPasswordStrength = (password) => {
        if (password.length < 6) return "Low";
        if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8) return "Strong";
        return "Medium";
    };

    
    return (
        <div className="container mt-4">
            <div className="title text-center">
                <h1>Crear una nueva Cuenta</h1>
            </div>
            <div className="second-form">
                <form onSubmit={handleSubmit} ref={formRef} className="register-form">
                    <div>
                        <label>Nombre Completo: <span className="required">*</span></label>
                        <input type="text" className="form-input" placeholder="Nombre completo" name="full_name" value={data.full_name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Número de Identificación: <span className="required">*</span></label>
                        <input type="text" className="form-input" placeholder="Número de Identificación" name="dni" value={data.dni} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Correo Electrónico: <span className="required">*</span></label>
                        <input type="email" className="form-input" placeholder="Correo Electrónico" name="email" value={data.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Edad: <span className="required">*</span></label>
                        <input type="number" className="form-input" placeholder="Edad" name="age" value={data.age} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Género: <span className="required">*</span></label>
                        <select className="form-input" name="gender" value={data.gender} onChange={handleChange} required>
                            <option value="Female">Femenino</option>
                            <option value="Male">Masculino</option>
                            <option value="Other">Otro</option>
                        </select>
                    </div>
                    <div>
                        <label>Especialidad: <span className="required">*</span></label>
                        <select className="form-input" name="speciality" value={data.speciality} onChange={handleChange} required>
                            <option value="Patient">Paciente</option>
                            <option value="Ophthalmologist">Oftalmólogo</option>
                            <option value="Optometrist">Optometrista</option>
                        </select>
                    </div>
                    <div>
                        <label>Teléfono: <span className="required">*</span></label>
                        <input type="tel" className="form-input" placeholder="Teléfono" name="phone" value={data.phone} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Dirección de domicilio: <span className="required">*</span></label>
                        <input type="text" className="form-input" placeholder="Dirección de domicilio" name="address" value={data.address} onChange={handleChange} required />
                    </div>
                    <div className="column">
                        <label>Contraseña: <span className="required">*</span></label>
                        <div className="password-input-container">
                            <input className="form-input" type={showPassword ? "text" : "password"} placeholder="Contraseña" name="password" value={data.password} onChange={handleChange} required />
                            <button type="button" className="show-password" onClick={() => setShowPassword(!showPassword)}><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} /></button>
                        </div>
                        {data.password && (<div className={`password-bar ${passwordStrength}`}><span className="text-bar">Fuerza: {passwordStrength}</span></div>)}
                    </div>
                </form>
            </div>
            <div className="container text-center">
                <button type="button" className="send-button" onClick={() => formRef.current.requestSubmit()}>Crear su Cuenta</button>
                <p className="paragraph">Sus datos personales se utilizarán para respaldar su experiencia en <br></br>
                    este sitio web, para administrar el acceso a su cuenta y para<br></br>
                    otros fines descritos en nuestras <span className="link">Políticas de Privacidad</span>
                </p>
                <hr></hr>
                <h2>¿Ya soy cliente?</h2>
                <p><span onClick={create} className="link">Iniciar Sesión Aquí</span></p>
            </div>
        </div>
    );
};