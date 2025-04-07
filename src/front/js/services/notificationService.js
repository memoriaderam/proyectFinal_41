import { API_URL } from "./api";

export const getNotifications = async () => {
    const res = await fetch(`${API_URL}/notifications`);
    return res.json();
};

export const markNotificationAsRead = async (id) => {
    const res = await fetch(`${API_URL}/notifications/${id}/read`, {
        method: "PATCH"
    });
    return res.json();
};

