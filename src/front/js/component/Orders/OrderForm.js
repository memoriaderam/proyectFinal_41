import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Spinner } from "react-bootstrap";
import { FaUser, FaPrescriptionBottle, FaGlasses, FaDollarSign, FaCalendar, FaTags } from "react-icons/fa";

const schema = yup.object({
    dni: yup.number().required("RUT del paciente requerido"),
    prescription_id: yup.number().required("ID de receta requerido"),
    lens_type: yup.string().required("Tipo de lente requerido"),
    frame_type: yup.string().required("Tipo de marco requerido"),
    price: yup.number().required("Precio requerido"),
    dated_at: yup.string().required("Fecha requerida"),
    status: yup.string().required("Estado requerido")
});

export const OrderForm = ({ onSubmit, defaultValues = {}, loading = false, isEdit = false, patients = [], prescriptions = [] }) => {
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
                <Form.Label><FaUser className="me-2" />Paciente</Form.Label>
                <Form.Select {...register("dni")} isInvalid={!!errors.dni} autoFocus disabled={isEdit}>
                    <option value="">Selecciona paciente</option>
                    {patients.map(p => (
                        <option key={p.dni} value={p.dni}>
                            {p.dni} - {p.first_name} {p.last_name}
                        </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.dni?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label><FaPrescriptionBottle className="me-2" />Receta</Form.Label>
                <Form.Select {...register("prescription_id")} isInvalid={!!errors.prescription_id} disabled={isEdit}>
                    <option value="">Selecciona receta</option>
                    {prescriptions.map(r => (
                        <option key={r.id} value={r.id}>
                            Receta #{r.id} - {r.lens_type}
                        </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.prescription_id?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label><FaGlasses className="me-2" />Tipo de lente</Form.Label>
                <Form.Select {...register("lens_type")} isInvalid={!!errors.lens_type}>
                    <option value="">Selecciona tipo</option>
                    <option value="monofocal">Monofocal</option>
                    <option value="bifocal">Bifocal</option>
                    <option value="progresivo">Progresivo</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.lens_type?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label><FaGlasses className="me-2" />Tipo de marco</Form.Label>
                <Form.Select {...register("frame_type")} isInvalid={!!errors.frame_type}>
                    <option value="">Selecciona marco</option>
                    <option value="metal">Metal</option>
                    <option value="plastico">Plástico</option>
                    <option value="mixto">Mixto</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.frame_type?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label><FaDollarSign className="me-2" />Precio</Form.Label>
                <Form.Control type="number" step="any" {...register("price")} isInvalid={!!errors.price} />
                <Form.Control.Feedback type="invalid">{errors.price?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label><FaCalendar className="me-2" />Fecha del pedido</Form.Label>
                <Form.Control type="date" {...register("dated_at")} isInvalid={!!errors.dated_at} />
                <Form.Control.Feedback type="invalid">{errors.dated_at?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label><FaTags className="me-2" />Estado</Form.Label>
                <Form.Select {...register("status")} isInvalid={!!errors.status}>
                    <option value="">Selecciona estado</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="en_proceso">En proceso</option>
                    <option value="listo">Listo para retiro</option>
                    <option value="entregado">Entregado</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.status?.message}</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="primary" disabled={loading}>
                {loading ? <><Spinner size="sm" animation="border" className="me-2" /> Guardando...</> : "Guardar Pedido"}
            </Button>
        </Form>
    );
};
