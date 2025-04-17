import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../../js/store/appContext";
import "../../../styles/dashboard.css";
import { Eye, Package, DollarSign, CalendarDays, BadgeCheck, Clock, ArchiveRestore, CheckCircle } from "lucide-react";

export const Orders = () => {
    const { store, actions } = useContext(Context);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const getStatus = (status = "") => actions.getStatus(status);

    useEffect(() => {
        if (store.user?.DNI) {
            actions.loadOrders();
        }
    }, [store.user?.DNI]);

    useEffect(() => {
        setOrders(store.orders || []);
    }, [store.orders]);

    return (
        <div className="dashboard-section">
            <h2 className="dashboard-heading">Mis Pedidos</h2>
            {loading ? (
                <p className="dashboard-loading">Cargando pedidos...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : orders.length > 0 ? (
                <ul className="appointments-container">
                    {orders.map((order, index) => {
                        const { label, icon } = getStatus(order.status);
                        return (
                            <li key={index}>
                                <h3>Pedido #{index + 1}</h3>
                                <div className="appointment-info">
                                    <div>
                                        <p> <Eye size={20} /> <span className="font-medium">Tipo de lente:</span> {order.lens_type} </p>
                                        <p> <Package size={20} /> <span className="font-medium">Montura:</span> {order.frame_type} </p>
                                        <p> <DollarSign size={20} /> <span className="font-medium">Precio:</span> ${order.price.toFixed(2)} </p>
                                        <p> <CalendarDays size={20} /> <span className="font-medium">Fecha:</span> {new Date(order.dated_at).toLocaleDateString()} </p>
                                        <p> {icon} <span className="font-medium">Estado:</span> {label} </p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className="dashboard-loading">No se encontraron pedidos para este DNI.</p>
            )}
        </div>
    );
};