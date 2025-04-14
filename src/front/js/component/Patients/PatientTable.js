import React, { useMemo, useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import { Table, InputGroup, FormControl, Button } from "react-bootstrap";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export const PatientTable = ({ patients, onEdit, onView, onDelete }) => {
    const [globalFilter, setGlobalFilter] = useState("");

    const columnHelper = createColumnHelper();

    const columns = useMemo(() => [
        columnHelper.accessor("full_name", { header: "Nombre" }),
        columnHelper.accessor("email", { header: "Email" }),
        columnHelper.accessor("age", { header: "Edad" }),
        columnHelper.accessor("phone", { header: "Teléfono" }),
        columnHelper.display({
            id: "actions",
            header: "Acciones",
            cell: ({ row }) => {
                const patient = row.original;
                return (
                    <>
                        <Button variant="info" size="sm" onClick={() => onView(patient)}><FaEye /></Button>{' '}
                        <Button variant="warning" size="sm" onClick={() => onEdit(patient)}><FaEdit /></Button>{' '}
                        <Button variant="danger" size="sm" onClick={() => onDelete(patient.dni)}><FaTrash /></Button>                    </>
                );
            },
        }),
    ], []);

    const table = useReactTable({
        data: patients,
        columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Buscar paciente..."
                    value={globalFilter ?? ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                />
            </InputGroup>

            <Table striped bordered hover>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};
