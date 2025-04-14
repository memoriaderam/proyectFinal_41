import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrderForm } from "../../component/Orders/OrderForm";
import { createOrder } from "../../services/orderService";
import { getPatients } from "../../services/patientService";
import { getPrescriptions } from "../../services/prescriptionService";
import { toast } from "react-toastify";

export const CreateOrder = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [patients, setPatients] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [patientsData, prescriptionsData] = await Promise.all([
                    getPatients(),
                    getPrescriptions()
                ]);
                setPatients(patientsData);
                setPrescriptions(prescriptionsData);
            } catch (error) {
                toast.error("Error al cargar datos iniciales");
            }
        };
        loadData();
    }, []);

    const onSubmit = async (data) => {
        setLoading(true);
        const adjustedData = {
            ...data,
            dated_at: `${data.dated_at}T00:00:00`
        };

        try {
            const res = await createOrder(adjustedData);
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message);
            }
            toast.success("Pedido creado exitosamente");
            navigate("/orders");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Nuevo Pedido</h2>
            <OrderForm
                onSubmit={onSubmit}
                loading={loading}
                patients={patients}
                prescriptions={prescriptions}
            />
        </div>
    );
};
