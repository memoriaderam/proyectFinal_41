import React, { useState } from "react";

export const GenericForm = ({ fields, onSubmit }) => {
    const [form, setForm] = useState({});

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            {fields.map((field) => (
                <input
                    key={field.name}
                    name={field.name}
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    value={form[field.name] || ""}
                    onChange={handleChange}
                    required
                />
            ))}
            <button type="submit">Guardar</button>
        </form>
    );
};