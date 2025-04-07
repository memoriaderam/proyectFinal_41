import React, { useState, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    flexRender,
    createColumnHelper
} from "@tanstack/react-table";
import { Table, FormControl, InputGroup, Button } from "react-bootstrap";
import { FaEdit, FaEye } from "react-icons/fa";
import { OrderStatusBadge } from "./OrderStatusBadge";

export const OrderTable = ({ orders, onView, onEdit }) => {
    const [globalFilter, setGlobalFilter] = useState("");
    const columnHelper = createColumnHelper();

    const columns = useMemo(() => [
        columnHelper.accessor("identity_number", { header: "Paciente (RUT)" }),
        columnHelper.accessor("prescrip_id", { header: "ID Receta" }),
        columnHelper.accessor("lens_type", { header: "Tipo Lente" }),
        columnHelper.accessor("frame_type", { header: "Tipo Marco" }),
        columnHelper.accessor("price", { header: "Precio" }),
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
                    placeholder="Buscar pedido..."
                    value={globalFilter}
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
