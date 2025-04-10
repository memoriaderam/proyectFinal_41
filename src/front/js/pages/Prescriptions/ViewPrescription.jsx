import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getPrescriptionById, downloadPrescriptionPDF } from "../../services/prescriptionService";
import {
    Card, Row, Col, Button, Badge
} from "react-bootstrap";
import {
    FaEye, FaUser, FaCalendarAlt, FaCircle, FaDotCircle,
    FaArrowsAltH, FaStickyNote, FaPrint
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import { Context } from "../../store/appContext";

export const ViewPrescription = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const [prescription, setPrescription] = useState(null);
    const componentRef = useRef(null); // ✅ useRef correcto

    useEffect(() => {
        actions.loadPatients();
        getPrescriptionById(id)
            .then(setPrescription)
            .catch(() => toast.error("Receta no encontrada"));
    }, [id]);

    const isSevereMyopia = (sph) => parseFloat(sph) <= -4;

    const getPatientName = () => {
        const patient = store.patients.find(p => p.identity_number === prescription?.identity_number);
        return patient ? patient.full_name : null;
    };

    const handlePrint = useReactToPrint({
        contentRef: componentRef, // ✅ uso correcto para react-to-print@3.0.0
        documentTitle: `receta_${prescription?.prescrip_id || "sin_id"}`,
        onAfterPrint: () => toast.success("Impresión completa"),
        onPrintError: () => toast.error("Error al imprimir")
    });

    if (!prescription) return <p className="mt-4">Cargando receta...</p>;

    return (
        <div className="container mt-4">
            <h2><FaEye className="me-2" />Detalle de Receta</h2>

            <div className="d-flex justify-content-end my-3">
                <Button variant="info" onClick={handlePrint} className="me-2">
                    <FaPrint /> Imprimir
                </Button>

                <Button variant="secondary" onClick={() => downloadPrescriptionPDF(prescription.prescrip_id)}>
                    📄 Descargar PDF
                </Button>
            </div>

            {/* ✅ ref debe estar en un nodo HTML real */}
            <div ref={componentRef}>
                <Card className="shadow-sm">
                    <Card.Body>
                        <Row className="mb-3">
                            <Col md={4}><strong>ID:</strong> {prescription.prescrip_id}</Col>
                            <Col md={4}>
                                <FaUser className="me-2" />
                                <strong>Paciente:</strong> {prescription.identity_number}
                                {getPatientName() && ` - ${getPatientName()}`}
                            </Col>
                            <Col md={4}>
                                <FaCalendarAlt className="me-2" />
                                <strong>Fecha:</strong> {prescription.dated_at?.split("T")[0]}
                            </Col>
                        </Row>

                        <hr />

                        <Row>
                            <Col md={6}>
                                <h5>👁️ Ojo Izquierdo</h5>
                                <ul>
                                    <li><FaCircle className="me-2" />Esfera (SPH): {prescription.left_eye_sph}{" "}
                                        {isSevereMyopia(prescription.left_eye_sph) && <Badge bg="danger">Miopía Alta</Badge>}
                                    </li>
                                    <li><FaDotCircle className="me-2" />Cilindro (CYL): {prescription.left_eye_cyl}</li>
                                    <li><FaArrowsAltH className="me-2" />Eje (AXIS): {prescription.left_eye_axis}</li>
                                </ul>
                            </Col>
                            <Col md={6}>
                                <h5>👁️ Ojo Derecho</h5>
                                <ul>
                                    <li><FaCircle className="me-2" />Esfera (SPH): {prescription.right_eye_sph}{" "}
                                        {isSevereMyopia(prescription.right_eye_sph) && <Badge bg="danger">Miopía Alta</Badge>}
                                    </li>
                                    <li><FaDotCircle className="me-2" />Cilindro (CYL): {prescription.right_eye_cyl}</li>
                                    <li><FaArrowsAltH className="me-2" />Eje (AXIS): {prescription.right_eye_axis}</li>
                                </ul>
                            </Col>
                        </Row>

                        <hr />
                        <p><FaStickyNote className="me-2" /><strong>Notas:</strong> {prescription.notes || "Sin notas"}</p>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};
