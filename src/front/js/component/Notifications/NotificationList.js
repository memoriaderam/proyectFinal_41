import React from "react";
import { GenericList } from "../shared/GenericList";

export const NotificationList = ({ notifications, onMarkRead }) => (
    <GenericList
        items={notifications}
        renderItem={(n) => `${n.message} (${n.is_read ? "Leída" : "Nueva"})`}
        onDelete={onMarkRead}
    />
);
