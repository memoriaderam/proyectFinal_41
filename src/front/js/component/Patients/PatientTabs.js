import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { PatientHistory } from "./PatientHistory";
import { PatientFiles } from "./PatientFiles";

export const PatientTabs = ({ patient }) => (
    <Tabs defaultActiveKey="info">
        <Tab eventKey="info" title="Información">
            <p><strong>Nombre:</strong> {patient.full_name}</p>
            <p><strong>Email:</strong> {patient.email}</p>
            <p><strong>ID:</strong> {patient.identity_number}</p>
        </Tab>
        <Tab eventKey="historial" title="Historial Médico">
            <PatientHistory patientId={patient.identity_number} />
        </Tab>
        <Tab eventKey="archivos" title="Archivos Adjuntos">
            <PatientFiles patientId={patient.identity_number} />
        </Tab>
    </Tabs>
);