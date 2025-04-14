import React from "react";
import { Table, Button } from "react-bootstrap";

export const PrescriptionTable = ({ prescriptions, onView, onEdit }) => (
    <Table striped bordered hover responsive>
        <thead>
            <tr>
                <th>ID</th>
                <th>Paciente</th>
                <th>Fecha</th>
                <th>Notas</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {prescriptions.map((rx) => (
                <tr key={rx.id}>
                    <td>{rx.id}</td>
                    <td>{rx.dni}</td>
                    <td>{rx.dated_at?.split("T")[0]}</td>
                    <td>{rx.notes || "N/A"}</td>
                    <td>
                        <Button size="sm" variant="info" onClick={() => onView(rx)}>👁️</Button>{' '}
                        <Button size="sm" variant="warning" onClick={() => onEdit(rx)}>✏️</Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
);

