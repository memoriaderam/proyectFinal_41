import React, { useState, useEffect } from "react";

export const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/v1/profile", {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error("No se pudo obtener los datos del perfil.");
                }

                const data = await response.json();
                setUserData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Perfil del Usuario</h1>
            {userData ? (
                <div>
                    <p><strong>Nombre Completo:</strong> {userData.full_name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Género:</strong> {userData.gender}</p>
                    <p><strong>Edad:</strong> {userData.age}</p>
                    <p><strong>Dirección:</strong> {userData.address}</p>
                    <p><strong>Teléfono:</strong> {userData.phone}</p>
                    <p><strong>Especialidad:</strong> {userData.speciality || "No especificada"}</p>
                    <p><strong>Estado:</strong> {userData.is_active ? "Activo" : "Inactivo"}</p>
                    <p><strong>Fecha de Creación:</strong> {new Date(userData.create_at).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>No se encontraron datos del usuario.</p>
            )}
        </div>
    );
};