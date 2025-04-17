import React, { useEffect, useContext } from "react";
import { Context } from "../../../js/store/appContext";
import { User, Mail, Phone, MapPin, Cake, BadgeCheck, Heart, CalendarDays, UserCheck } from "lucide-react";
import "../../../styles/dashboard.css";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const { userData, userLoading, userError } = store;

    useEffect(() => {
        actions.getUser();
    }, []);

    if (userLoading) return <p className="dashboard-loading">Cargando perfil...</p>;
    if (userError) return <p className="text-red-500">Error: {userError}</p>;

    return (
        <div className="dashboard-section-profile">
            <h2 className="dashboard-heading">Perfil del Usuario</h2>
            {userData ? (
                <div>
                    <div className="profile-item">
                        <User size={20} />
                        <span className="profile-label">Nombre Completo:</span>
                        <span>{userData.full_name}</span>
                    </div>
                    <div className="profile-item">
                        <Mail size={20} />
                        <span className="profile-label">Email:</span>
                        <span>{userData.email}</span>
                    </div>
                    <div className="profile-item">
                        <Heart size={20} />
                        <span className="profile-label">Género:</span>
                        <span>{userData.gender}</span>
                    </div>
                    <div className="profile-item">
                        <Cake size={20} />
                        <span className="profile-label">Edad:</span>
                        <span>{userData.age}</span>
                    </div>
                    <div className="profile-item">
                        <MapPin size={20} />
                        <span className="profile-label">Dirección:</span>
                        <span>{userData.address}</span>
                    </div>
                    <div className="profile-item">
                        <Phone size={20} />
                        <span className="profile-label">Teléfono:</span>
                        <span>{userData.phone}</span>
                    </div>
                    <div className="profile-item">
                        <BadgeCheck size={20} />
                        <span className="profile-label">Especialidad:</span>
                        <span>{userData.speciality || "No especificada"}</span>
                    </div>
                    <div className="profile-item">
                        <UserCheck size={20} />
                        <span className="profile-label">Estado:</span>
                        <span>{userData.is_active ? "Activo" : "Inactivo"}</span>
                    </div>
                    <div className="profile-item">
                        <CalendarDays size={20} />
                        <span className="profile-label">Fecha de Creación:</span>
                        <span>{new Date(userData.create_at).toLocaleDateString()}</span>
                    </div>
                </div>
            ) : (
                <p className="dashboard-loading">No se encontraron datos del usuario.</p>
            )}
        </div>
    );
};