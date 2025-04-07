import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button } from "react-bootstrap";

const schema = yup.object({
    identity_number: yup.number().required("RUT del paciente requerido"),
    prescrip_id: yup.number().required("ID de receta requerido"),
    lens_type: yup.string().required("Tipo de lente requerido"),
    frame_type: yup.string().required("Tipo de marco requerido"),
    price: yup.number().required("Precio requerido"),
    dated_at: yup.string().required("Fecha requerida"),
    status: yup.string().required("Estado requerido")
});

export const OrderForm = ({ onSubmit, defaultValues = {} }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues
    });

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
                <Form.Label>RUT del paciente</Form.Label>
                <Form.Control type="number" {...register("identity_number")} />
                <p className="text-danger">{errors.identity_number?.message}</p>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>ID de Receta</Form.Label>
                <Form.Control type="number" {...register("prescrip_id")} />
                <p className="text-danger">{errors.prescrip_id?.message}</p>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Tipo de lente</Form.Label>
                <Form.Select {...register("lens_type")}>
                    <option value="">Selecciona tipo</option>
                    <option value="monofocal">Monofocal</option>
                    <option value="bifocal">Bifocal</option>
                    <option value="progresivo">Progresivo</option>
                </Form.Select>
                <p className="text-danger">{errors.lens_type?.message}</p>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Tipo de marco</Form.Label>
                <Form.Select {...register("frame_type")}>
                    <option value="">Selecciona marco</option>
                    <option value="metal">Metal</option>
                    <option value="plastico">Plástico</option>
                    <option value="mixto">Mixto</option>
                </Form.Select>
                <p className="text-danger">{errors.frame_type?.message}</p>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control type="number" step="any" {...register("price")} />
                <p className="text-danger">{errors.price?.message}</p>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Fecha del pedido</Form.Label>
                <Form.Control type="date" {...register("dated_at")} />
                <p className="text-danger">{errors.dated_at?.message}</p>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Select {...register("status")}>
                    <option value="">Selecciona estado</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="en_proceso">En proceso</option>
                    <option value="listo">Listo para retiro</option>
                    <option value="entregado">Entregado</option>
                </Form.Select>
                <p className="text-danger">{errors.status?.message}</p>
            </Form.Group>

            <Button type="submit" variant="primary">Guardar Pedido</Button>
        </Form>
    );
};
