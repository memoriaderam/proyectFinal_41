import { API_URL } from "./api";

export const getComments = async () => {
    const res = await fetch(`${API_URL}/api/comments`);
    return res.json();
};

export const createComment = async (data) => {
    const res = await fetch(`${API_URL}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};