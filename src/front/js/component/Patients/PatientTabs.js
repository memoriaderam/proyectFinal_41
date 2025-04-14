import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { PatientHistory } from "./PatientHistory";
import { PatientFiles } from "./PatientFiles";
import { FaInfoCircle, FaFileMedical, FaFolderOpen } from "react-icons/fa";

export const PatientTabs = ({ patient }) => (
    <Tabs defaultActiveKey="info" className="mt-3">
        <Tab eventKey="info" title={<span><FaInfoCircle /> Información</span>}>
            <div className="p-3">
                <p><strong>Nombre:</strong> {patient.full_name}</p>
                <p><strong>Email:</strong> {patient.email}</p>
                <p><strong>RUT / ID:</strong> {patient.dni}</p>
                <p><strong>Edad:</strong> {patient.age}</p>
                <p><strong>Género:</strong> {patient.gender}</p>
                <p><strong>Teléfono:</strong> {patient.phone}</p>
                <p><strong>Dirección:</strong> {patient.address}</p>
            </div>
        </Tab>
        <Tab eventKey="historial" title={<span><FaFileMedical /> Historial Médico</span>}>
            <div className="p-3">
                <PatientHistory patientId={patient.dni} />
            </div>
        </Tab>
        <Tab eventKey="archivos" title={<span><FaFolderOpen /> Archivos Adjuntos</span>}>
            <div className="p-3">
                <PatientFiles patientId={patient.dni} />
            </div>
        </Tab>
    </Tabs>
);
