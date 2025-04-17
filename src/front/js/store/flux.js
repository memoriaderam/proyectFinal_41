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
		loginUser: async (credentials) => {
			try {
				const res = await fetch("http://127.0.0.1:3001/api/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(credentials)
				});

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.message || "Credenciales incorrectas");
				}

				localStorage.setItem("access_token", data.access_token);

				return { success: true, token: data.access_token };

			} catch (error) {
				console.error("Error en login:", error.message);
				return { success: false, error: error.message };
			}
		},

		loadPatients: async () => {
			const data = await getPatients();
			setStore({ patients: data });
		},
		createUser: async (userData) => {
			try {
				const response = await fetch("http://127.0.0.1:3001/api/add/user", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(userData)
				});

				const result = await response.json();

				if (!response.ok) {
					throw new Error(result.details || result.error || "Error al crear usuario");
				}

				return { success: true, message: result.message };

			} catch (error) {
				console.error("Error creando usuario:", error);
				return { success: false, error: error.message };
			}
		},

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

	// Órdenes
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

	// Doctores
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

	// Recetas
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

	// Citas
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

	// Notificaciones
	loadNotifications: async () => {
		const data = await getNotifications();
		setStore({ notifications: data });
	},
	markNotificationAsRead: async (id) => {
		await markNotificationAsRead(id);
		getActions().loadNotifications();
	},

	// Comentarios
	loadComments: async () => {
		const data = await getComments();
		setStore({ comments: data });
	},

	// Estadísticas
	loadStats: async () => {
		const res = await fetch(`${API_URL}/stats/summary`);
		const data = await res.json();
		setStore({ stats: data });
	},

	// Mensaje de prueba
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

	// Ejemplo
	exampleFunction: () => {
		const store = getStore();
		const demo = store.demo?.map((elm, i) => ({
			...elm,
			background: i === 0 ? "green" : elm.background
		}));
		setStore({ demo });
	},

	// Publicaciones
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
	},

	//Parte: Ivan
	handleSubmitReset: async (e, email) => {
		e.preventDefault();
		console.log("Se ha solicitado la recuperación de contraseña para el siguiente correo:", email);
		const response = await getActions().ResetPassword(email);
		if (response) {
			alert("Correo enviado exitosamente.");
		} else {
			alert("Hubo un error. Intenta de nuevo.");
		}
	},
	ResetPassword: async (email) => {
		console.log(`${API_URL} reset passwword`);
		try {
			const response = await fetch(`${API_URL}/reset`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email })
			});
			const data = await response.json();
			if (!response.ok) throw new Error(data?.msg || "Error en el servidor");
			return data;
		} catch (error) {
			console.log("Error al enviar email de recuperación:", error);
			return false;
		}
	},
	handleNewPassword: async (e, token, password, confirm, navigate, setError) => {
		try {
			e.preventDefault();
			if (!token) return setError("Debes ingresar el token");
			if (password !== confirm) return setError("Las contraseñas no coinciden");

			const resp = await fetch(`${API_URL}/new_password`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ token, password })
			});
			const data = await resp.json();
			if (!resp.ok) return setError(data?.msg || "Error al restablecer la contraseña");

			alert("Contraseña actualizada correctamente");
			navigate("/login");
		} catch (error) {
			console.error("Error en handleNewPassword:", error);
			setError("Hubo un problema, intenta más tarde");
		}
	},
	verifyResetToken: async (token) => {
		try {
			const resp = await fetch(`${process.env.BACKEND_URL}/api/v1/new_password`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ token })
			});
			if (!resp.ok) {
				const error = await resp.json();
				console.error("Token inválido o expirado:", error.msg);
				return { valid: false, message: error.msg };
			}
			const data = await resp.json();
			console.log("Token válido:", data.msg);
			return { valid: true, message: data.msg };
		} catch (error) {
			console.error("Error al verificar token:", error);
			return { valid: false, message: "Error del servidor" };
		}
	},
	cancelarCita: async (event_uri, email) => {
		try {
			const resp = await fetch(`${API_URL}/calendly/cancel`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ event_uri, email })
			});
			const data = await resp.json();
			if (!resp.ok) alert(data.msg || "Error al cancelar cita");
			else alert("Cita cancelada correctamente");
			return data;
		} catch (error) {
			console.error("Error al cancelar cita:", error);
			alert("Error del servidor al cancelar cita");
		}
	}

}
);

export default getState;
