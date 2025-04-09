import React from "react";
import { Card, Button } from "react-bootstrap";

export const PrescriptionList = ({ prescriptions, onDelete }) => (
    <div className="row">
        {prescriptions.map((rx) => (
            <div key={rx.prescrip_id} className="col-md-6 mb-3">
                <Card>
                    <Card.Body>
                        <Card.Title>Receta #{rx.prescrip_id}</Card.Title>
                        <Card.Text>
                            Paciente: {rx.identity_number}<br />
                            Fecha: {new Date(rx.dated_at).toLocaleDateString()}<br />
                            Ojo Izq: {rx.left_eye_sph} / {rx.left_eye_cyl} / {rx.left_eye_axis}<br />
                            Ojo Der: {rx.right_eye_sph} / {rx.right_eye_cyl} / {rx.right_eye_axis}<br />
                            Notas: {rx.notes || "Sin notas"}
                        </Card.Text>
                        <Button variant="danger" onClick={() => onDelete(rx.prescrip_id)}>Eliminar</Button>
                    </Card.Body>
                </Card>
            </div>
        ))}
    </div>
);
