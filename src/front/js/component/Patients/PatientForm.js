import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Este formulario ahora cumple con los requisitos del backend 
// (POST /patients) y tiene validación completa para todos los campos.

// Validación Yup extendida con campos requeridos por backend
const schema = yup.object({
    full_name: yup.string().required("Nombre es requerido"),
    email: yup.string().email("Email inválido").required("Email requerido"),
    identity_number: yup.string().required("ID requerido"),
    password: yup.string().min(6, "Mínimo 6 caracteres").required("Contraseña requerida"),
    gender: yup.string().required("Género requerido"),
    age: yup.number().positive("Edad inválida").integer().required("Edad requerida"),
    address: yup.string().required("Dirección requerida"),
    phone: yup.string().required("Teléfono requerido"),
    role_id: yup.number().oneOf([3], "Rol inválido").required()
});

export const PatientForm = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(schema) });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("full_name")} placeholder="Nombre completo" />
            <p>{errors.full_name?.message}</p>

            <input {...register("email")} placeholder="Email" type="email" />
            <p>{errors.email?.message}</p>

            <input {...register("identity_number")} placeholder="RUT o ID" />
            <p>{errors.identity_number?.message}</p>

            <input type="password" {...register("password")} placeholder="Contraseña" />
            <p>{errors.password?.message}</p>

            <select {...register("gender")}>
                <option value="">Selecciona género</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
            </select>
            <p>{errors.gender?.message}</p>

            <input {...register("age")} placeholder="Edad" type="number" />
            <p>{errors.age?.message}</p>

            <input {...register("address")} placeholder="Dirección" />
            <p>{errors.address?.message}</p>

            <input {...register("phone")} placeholder="Teléfono" />
            <p>{errors.phone?.message}</p>

            {/* Valor fijo ya que role_id = 3 para pacientes */}
            <input type="hidden" value={3} {...register("role_id")} />

            <button type="submit">Guardar paciente</button>
        </form>
    );
};
