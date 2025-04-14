import React, { useState, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    flexRender,
    createColumnHelper
} from "@tanstack/react-table";
import { Table, FormControl, InputGroup, Button } from "react-bootstrap";
import { FaEdit, FaEye, FaDollarSign, FaIdCard } from "react-icons/fa";
import { OrderStatusBadge } from "./OrderStatusBadge";

export const OrderTable = ({ orders, onView, onEdit }) => {
    const [globalFilter, setGlobalFilter] = useState("");
    const columnHelper = createColumnHelper();

    const columns = useMemo(() => [
        columnHelper.accessor("dni", {
            header: () => (<><FaIdCard className="me-1" />Paciente (RUT)</>)
        }),
        columnHelper.accessor("prescription_id", { header: "ID Receta" }),
        columnHelper.accessor("lens_type", { header: "Tipo Lente" }),
        columnHelper.accessor("frame_type", { header: "Tipo Marco" }),
        columnHelper.accessor("price", {
            header: () => (<><FaDollarSign className="me-1" />Precio</>)
        }),
        columnHelper.accessor("status", {
            header: "Estado",
            cell: ({ getValue }) => <OrderStatusBadge status={getValue()} />
        }),
        columnHelper.display({
            id: "actions",
            header: "Acciones",
            cell: ({ row }) => {
                const order = row.original;
                return (
                    <>
                        <Button variant="info" size="sm" onClick={() => onView(order)}><FaEye /></Button>{' '}
                        <Button variant="warning" size="sm" onClick={() => onEdit(order)}><FaEdit /></Button>
                    </>
                );
            }
        }),
    ], []);

    const table = useReactTable({
        data: orders,
        columns,
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Buscar por RUT, receta, estado..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                />
            </InputGroup>

            <Table striped bordered hover responsive className="shadow-sm">
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