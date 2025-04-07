import React from "react";
import { GenericList } from "../shared/GenericList";

export const OrderList = ({ orders, onDelete }) => (
    <GenericList
        items={orders}
        renderItem={(o) => `Pedido ID: ${o.id} - Estado: ${o.status}`}
        onDelete={onDelete}
    />
);