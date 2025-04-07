import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { NotificationList } from "../component/Notifications/NotificationList";

const NotificationsPage = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadNotifications();
    }, []);

    return (
        <div>
            <h2>Notificaciones</h2>
            <NotificationList notifications={store.notifications} onMarkRead={actions.markNotificationAsRead} />
        </div>
    );
};

export default NotificationsPage;