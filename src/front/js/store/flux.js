import {
	getPatients,
	createPatient,
	deletePatient
} from "../services/patientService";
import {
	getOrders,
	createOrder,
	updateOrder
} from "../services/orderService";
import {
	getDoctors,
	createDoctor,
	deleteDoctor
} from "../services/doctorService";
import {
	getPrescriptions,
	createPrescription,
	updatePrescription
} from "../services/prescriptionService";
import {
	getAppointments,
	createAppointment,
	updateAppointment
} from "../services/appointmentService";
import {
	getNotifications,
	markNotificationAsRead
} from "../services/notificationService";
import {
	getComments
} from "../services/commentService";
import { API_URL } from "../services/api";

const getState = ({ getStore, getActions, setStore }) => ({
	store: {
		patients: [],
		orders: [],
		doctors: [],
		prescriptions: [],
		appointments: [],
		notifications: [],
		comments: [],
		stats: {},
		message: null
	},

	actions: {
		loadPatients: async () => {
			const data = await getPatients();
			setStore({ patients: data });
		},
		createPatient: async (patient) => {
			try {
				const res = await createPatient(patient);
				if (!res.ok) {
					const errorData = await res.json().catch(() => ({}));
					const message = errorData.message || "Error al crear paciente";
					throw new Error(message);
				}
				await getActions().loadPatients();
				return true;
			} catch (err) {
				console.error("[createPatient error]", err);
				throw err;
			}
		},
		deletePatient: async (id) => {
			await deletePatient(id);
			getActions().loadPatients();
		},

		loadOrders: async () => {
			const data = await getOrders();
			setStore({ orders: data });
		},
		createOrder: async (order) => {
			await createOrder(order);
			getActions().loadOrders();
		},
		updateOrderStatus: async (id) => {
			await updateOrder(id, { status: "Entregado" });
			getActions().loadOrders();
		},

		loadDoctors: async () => {
			const data = await getDoctors();
			setStore({ doctors: data });
		},
		createDoctor: async (doctor) => {
			await createDoctor(doctor);
			getActions().loadDoctors();
		},
		deleteDoctor: async (id) => {
			await deleteDoctor(id);
			getActions().loadDoctors();
		},

		loadPrescriptions: async () => {
			const data = await getPrescriptions();
			setStore({ prescriptions: data });
		},
		createPrescription: async (rx) => {
			try {
				const res = await createPrescription(rx);
				if (!res.ok) {
					const errorData = await res.json().catch(() => ({}));
					const message = errorData.message || "Error al crear receta";
					throw new Error(message);
				}
				await getActions().loadPrescriptions();
				return true;
			} catch (err) {
				console.error("[createPrescription error]", err);
				throw err;
			}
		},
		deletePrescription: async (id) => {
			await fetch(`${API_URL}/prescriptions/${id}`, { method: "DELETE" });
			getActions().loadPrescriptions();
		},

		loadAppointments: async () => {
			const data = await getAppointments();
			setStore({ appointments: data });
		},
		createAppointment: async (appt) => {
			await createAppointment(appt);
			getActions().loadAppointments();
		},
		deleteAppointment: async (id) => {
			await fetch(`${API_URL}/appointments/${id}`, { method: "DELETE" });
			getActions().loadAppointments();
		},

		loadNotifications: async () => {
			const data = await getNotifications();
			setStore({ notifications: data });
		},
		markNotificationAsRead: async (id) => {
			await markNotificationAsRead(id);
			getActions().loadNotifications();
		},

		loadComments: async () => {
			const data = await getComments();
			setStore({ comments: data });
		},

		loadStats: async () => {
			const res = await fetch(`${API_URL}/stats/summary`);
			const data = await res.json();
			setStore({ stats: data });
		},

		getMessage: async () => {
			try {
				const resp = await fetch(`${API_URL}/api/hello`);
				const data = await resp.json();
				setStore({ message: data.message });
				return data;
			} catch (error) {
				console.log("Error loading message from backend", error);
			}
		},

		// Función de ejemplo visual
		exampleFunction: () => {
			const store = getStore();
			const demo = store.demo?.map((elm, i) => ({ ...elm, background: i === 0 ? "green" : elm.background }));
			setStore({ demo });
		},

		createPost: async (newPost) => {
			try {
				const res = await fetch(`${process.env.BACKEND_URL}/api/add/post`, {
					method: "POST",
					body: newPost
				});
				if (!res.ok) {
					const errorText = await res.text();
					throw new Error(errorText || "Error al crear el post");
				}
				return { success: true };
			} catch (error) {
				console.error("Error al crear post:", error);
				return { success: false, error: error.message };
			}
		},

		getPost: async () => {
			try {
				const res = await fetch(`${process.env.BACKEND_URL}/api/post/list`);
				if (!res.ok) {
					const errorText = await res.text();
					throw new Error(errorText || "Error al obtener posts");
				}
				const data = await res.json();
				return data;
			} catch (error) {
				console.error("Error al obtener posts:", error);
				return [];
			}
		},

		updatePost: async (postId, updatedData) => {
			try {
				const res = await fetch(`${process.env.BACKEND_URL}/api/edit/post/${postId}`, {
					method: "PUT",
					body: updatedData
				});
				if (!res.ok) {
					const text = await res.text();
					throw new Error(text || "Error al actualizar post");
				}
				const data = await res.json();
				return { success: true, message: data.message };
			} catch (error) {
				console.error("Error al actualizar post:", error);
				return { success: false, error: error.message };
			}
		},

		deletePost: async (postId) => {
			try {
				const res = await fetch(`${process.env.BACKEND_URL}/api/delete/post/${postId}`, {
					method: "DELETE"
				});
				if (!res.ok) {
					const text = await res.text();
					throw new Error(text || "Error al eliminar post");
				}
				const data = await res.json();
				return { success: true, message: data.message };
			} catch (error) {
				console.error("Error al eliminar post:", error);
				return { success: false, error: error.message };
			}
		}
	}
});

export default getState;
