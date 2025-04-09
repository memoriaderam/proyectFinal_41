import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button } from "react-bootstrap";
import { Context } from "../../store/appContext";
import { toast } from "react-toastify";

const schema = yup.object().shape({
    identity_number: yup.number().required("Paciente requerido"),
    left_eye_sph: yup.number().required(),
    right_eye_sph: yup.number().required(),
    left_eye_cyl: yup.number().required(),
    right_eye_cyl: yup.number().required(),
    left_eye_axis: yup.number().required(),
    right_eye_axis: yup.number().required(),
    notes: yup.string(),
    dated_at: yup.string().required("Fecha requerida")
});

export const PrescriptionForm = ({ onSubmit, defaultValues = {} }) => {
    const { store, actions } = useContext(Context);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if (store.patients.length === 0) {
            actions.loadPatients();
        }
    }, []);

    useEffect(() => {
        if (Object.keys(defaultValues).length > 0) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    const handleFormSubmit = async (data) => {
        try {
            await onSubmit(data);
        } catch (err) {
            toast.error("Error al enviar receta");
        }
    };

    return (
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <Form.Group>
                <Form.Label>Paciente</Form.Label>
                <Form.Select {...register("identity_number")}>
                    <option value="">Seleccione un paciente</option>
                    {store.patients.map((p) => (
                        <option key={p.identity_number} value={p.identity_number}>
                            {p.full_name}
                        </option>
                    ))}
                </Form.Select>
                <p className="text-danger">{errors.identity_number?.message}</p>
            </Form.Group>

            {[
                "left_eye_sph",
                "right_eye_sph",
                "left_eye_cyl",
                "right_eye_cyl",
                "left_eye_axis",
                "right_eye_axis"
            ].map((field) => (
                <Form.Group key={field}>
                    <Form.Label>{field.replace(/_/g, " ")}</Form.Label>
                    <Form.Control type="number" step="any" {...register(field)} />
                    <p className="text-danger">{errors[field]?.message}</p>
                </Form.Group>
            ))}

            <Form.Group>
                <Form.Label>Notas</Form.Label>
                <Form.Control as="textarea" {...register("notes")} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Fecha</Form.Label>
                <Form.Control type="date" {...register("dated_at")} />
                <p className="text-danger">{errors.dated_at?.message}</p>
            </Form.Group>

            <Button type="submit" className="mt-3">Guardar Receta</Button>
        </Form>
    );
};
