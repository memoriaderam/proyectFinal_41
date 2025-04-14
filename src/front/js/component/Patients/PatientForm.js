import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button } from "react-bootstrap";

// Esquema de validación
const schema = yup.object({
    full_name: yup.string().required("Nombre es requerido"),
    email: yup.string().email("Email inválido").required("Email requerido"),
    dni: yup.string().required("ID requerido"),
    password: yup.string().min(6, "Mínimo 6 caracteres"),
    gender: yup.string().required("Género requerido"),
    age: yup.number().positive("Edad inválida").integer().required("Edad requerida"),
    address: yup.string().required("Dirección requerida"),
    phone: yup.string().required("Teléfono requerido"),
    role_id: yup.number().oneOf([3], "Rol inválido").required()
});

export const PatientForm = ({ onSubmit, defaultValues = {} }) => {
    const isEdit = !!defaultValues.dni;

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema)
    });

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control
                    {...register("full_name")}
                    isInvalid={!!errors.full_name}
                    placeholder="Nombre completo"
                />
                <Form.Control.Feedback type="invalid">{errors.full_name?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    {...register("email")}
                    type="email"
                    isInvalid={!!errors.email}
                    placeholder="Correo electrónico"
                />
                <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
            </Form.Group>

            {!isEdit && (
                <>
                    <Form.Group className="mb-3">
                        <Form.Label>RUT o ID</Form.Label>
                        <Form.Control
                            {...register("dni")}
                            isInvalid={!!errors.dni}
                            placeholder="ID único del paciente"
                        />
                        <Form.Control.Feedback type="invalid">{errors.dni?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            {...register("password")}
                            isInvalid={!!errors.password}
                            placeholder="Contraseña"
                        />
                        <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                    </Form.Group>
                </>
            )}

            <Form.Group className="mb-3">
                <Form.Label>Género</Form.Label>
                <Form.Select {...register("gender")} isInvalid={!!errors.gender}>
                    <option value="">Selecciona una opción</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.gender?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Edad</Form.Label>
                <Form.Control
                    type="number"
                    {...register("age")}
                    isInvalid={!!errors.age}
                    placeholder="Edad"
                />
                <Form.Control.Feedback type="invalid">{errors.age?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                    {...register("address")}
                    isInvalid={!!errors.address}
                    placeholder="Dirección"
                />
                <Form.Control.Feedback type="invalid">{errors.address?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                    {...register("phone")}
                    isInvalid={!!errors.phone}
                    placeholder="Teléfono"
                />
                <Form.Control.Feedback type="invalid">{errors.phone?.message}</Form.Control.Feedback>
            </Form.Group>

            <input type="hidden" {...register("role_id")} value={3} />

            <Button type="submit" variant="primary">Guardar paciente</Button>
        </Form>
    );
};
