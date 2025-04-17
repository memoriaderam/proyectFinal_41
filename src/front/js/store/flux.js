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
import { toast } from 'react-toastify';
import { New_Password } from "../pages/new_password";
import { faL } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Clock, CheckCircle, ArchiveRestore, BadgeCheck } from "lucide-react";

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
		message: null,
		user: {
			email: "ivanroman1498@gmail.com",
			DNI: "2233445566"
		},
		userData: null,
		userLoading: true,
		userError: null,
		loadingAppointments: false,
		cancelingAppointment: null,
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
			const res = await fetch(`${API_URL}/api/stats/summary`);
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
				const res = await fetch(`${process.env.BACKEND_URL}/api/posts`, {
					method: "POST",
					body: newPost // debe ser FormData
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
				const res = await fetch(`${process.env.BACKEND_URL}/api/posts`);
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
				const res = await fetch(`${process.env.BACKEND_URL}/api/posts/${postId}`, {
					method: "PUT",
					body: updatedData // también debe ser FormData
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
				const res = await fetch(`${process.env.BACKEND_URL}/api/posts/${postId}`, {
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
		// Reestablecer Contraseña
		// Parte: Ivan Listo
		submitReset: async (e, email) => {
			e.preventDefault();
			const response = await getActions().resetPassword(email);
			if (response.success) {
				toast.success(response.message);
			} else {
				toast.error(response.message);
			}
		},
		resetPassword: async (email) => {
			try {
				const response = await fetch(`${API_URL}/api/reset`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email })
				});
				const data = await response.json();
				return {
					success: response.ok,
					message: data?.msg || "Error en el servidor"
				};
			} catch (error) {
				return {
					success: false,
					message: "Error al enviar el correo de recuperación de contraseña"
				};
			}
		},
		newPassword: async (e, token, password, confirm, navigate) => {
			try {
				e.preventDefault();
				if (!token) return toast.error("Debes ingresar el token");
				if (password !== confirm) return toast.error("Las contraseñas no coinciden");
				const response = await fetch(`${API_URL}/api/new_password`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ token, password })
				});
				const data = await response.json();
				if (!response.ok) return toast.error(data?.msg || "Error al restablecer la contraseña");
				toast.success("Contraseña actualizada correctamente");
				navigate("/login");
			} catch (error) {
				console.log("Error al cambiar la contraseña, debido a:", error);
				toast.error("Hubo un problema al cambiar la contraseña, intenta más tarde");
			}
		},
		submitToken: async (e, token, password, confirm, navigate) => {
			e.preventDefault();
			if (!token) {
				toast.error("Por favor ingresa el token.");
				return;
			}
			if (password !== confirm) {
				toast.error("Las contraseñas no coinciden.");
				return;
			}
			getActions().newPassword(e, token, password, confirm, navigate);
		},
		verifyToken: async (token) => {
			try {
				const response = await fetch(`${process.env.BACKEND_URL}/api/new_password`, {
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
	// Reestablecer Contraseña
	// Parte: Ivan Listo
	submitReset: async (e, email) => {
		e.preventDefault();
		const response = await getActions().resetPassword(email);
		if (response.success) {
			toast.success(response.message);
		} else {
			toast.error(response.message);
		}
	},
	resetPassword: async (email) => {
		try {
			const response = await fetch(${ API_URL } / api / reset, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email })
			});
			const data = await response.json();
			return {
				success: response.ok,
				message: data?.msg || "Error en el servidor"
			};
		} catch (error) {
			return {
				success: false,
				message: "Error al enviar el correo de recuperación de contraseña"
			};
		}
	},
	newPassword: async (e, token, password, confirm, navigate) => {
		try {
			e.preventDefault();
			if (!token) return toast.error("Debes ingresar el token");
			if (password !== confirm) return toast.error("Las contraseñas no coinciden");
			const response = await fetch(${ API_URL } / api / new_password, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ token, password })
			});
			const data = await response.json();
			if (!response.ok) return toast.error(data?.msg || "Error al restablecer la contraseña");
			toast.success("Contraseña actualizada correctamente");
			navigate("/login");
		} catch (error) {
			console.log("Error al cambiar la contraseña, debido a:", error);
			toast.error("Hubo un problema al cambiar la contraseña, intenta más tarde");
		}
	},
	submitToken: async (e, token, password, confirm, navigate) => {
		e.preventDefault();
		if (!token) {
			toast.error("Por favor ingresa el token.");
			return;
		}
		if (password !== confirm) {
			toast.error("Las contraseñas no coinciden.");
			return;
		}
		getActions().newPassword(e, token, password, confirm, navigate);
	},
	verifyToken: async (token) => {
		try {
			const response = await fetch(${ process.env.BACKEND_URL } / api / new_password, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ token })
			});
			const data = await response.json();
			if (!response.ok) {
				toast.error(data?.msg || "Token inválido o expirado");
				return { valid: false, message: data.msg };
			}
			toast.success(data?.msg || "Token válido");
			return { valid: true, message: data.msg };
		} catch (error) {
			toast.error("Error del servidor al verificar el token");
			return { valid: false, message: "Error del servidor" };
		}
	},
	cancelAppointment: async (event_uri, email) => {
		try {
			const response = await fetch(${ API_URL } / api / calendly / cancel, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ event_uri, email })
			});
			const data = await response.json();
			if (!response.ok) {
				toast.error(data?.msg || "Error al cancelar cita");
			} else {
				toast.success("Cita cancelada correctamente");
			}
			return data;
		} catch (error) {
			toast.error("Error del servidor al cancelar cita");
			return { error: true, msg: "Error del servidor" };
		}
	},
	getAppointments: async (email) => {
		try {
			const response = await fetch(`${API_URL}/api/calendly/appointments?email=${email}`);
			const data = await response.json();
			if (!response.ok) {
				toast.error(data.msg || "Error al obtener las citas");
				return [];
			}
			return data.items || [];
		} catch (error) {
			toast.error("Error de conexión con el servidor");
			return [];
		}
	},
	loadAppointments: async () => {
		const store = getStore();
		if (!store.user?.email) return;
		setStore({ loadingAppointments: true });
		const data = await getActions().getAppointments(store.user.email);
		setStore({ appointments: data, loadingAppointments: false });
	},
	cancelandloadAppointments: async (event_uri) => {
		const store = getStore();
		setStore({ cancelingAppointment: event_uri });
		await getActions().cancelAppointment(event_uri, store.user.email);
		await getActions().loadAppointments();
		setStore({ cancelingAppointment: null });
	},
	cancelButton: (status, canceling) => {
		if (status === "canceled") return "canceled";
		if (canceling) return "canceling";
		return "active";
	},
	loadDashboardOrders: async () => {
		const dni = getStore().user?.DNI;
		if (!dni) {
			toast.error("Debes proporcionar un DNI.");
			setStore({ orders: [] });
			return;
		}
		setStore({ ordersLoading: true });
		try {
			const response = await fetch(`http://localhost:3001/api/get_orders?dni=${dni}`);
			const data = await response.json();
			if (!response.ok) {
				toast.error(data.msg || "Error al obtener los pedidos");
				setStore({ orders: [] });
			} else {
				setStore({ orders: data.orders || [] });
				toast.success("Pedidos cargados exitosamente.");
			}
		} catch (error) {
			toast.error("Error de conexión con el servidor");
			setStore({ orders: [] });
		}
		setStore({ ordersLoading: false });
	},
	getStatus: (status = "") => {
		const info = status.trim().toLowerCase();
		switch (info) {
			case "pedido":
				return { label: "Pedido", icon: <Package size={18} className="inline-block mr-1" /> };
			case "en proceso":
				return { label: "En Proceso", icon: <Clock size={18} className="inline-block mr-1" /> };
			case "listo para retirar":
				return { label: "Listo para Retirar", icon: <ArchiveRestore size={18} className="inline-block mr-1" /> };
			case "entregado":
				return { label: "Entregado", icon: <CheckCircle size={18} className="inline-block mr-1 text-green-600" /> };
			default:
				return { label: "Desconocido", icon: <BadgeCheck size={18} className="inline-block mr-1 text-gray-500" /> };
		}
	},
	getUser: async () => {
		const { token } = getStore();
		try {
			const response = await fetch(`${process.env.BACKEND_URL}/api/profile`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				}
			});

			if (!response.ok) {
				throw new Error("No se pudo obtener los datos del perfil");
			}

			const data = await response.json();
			setStore({
				userData: data,
				userLoading: false,
				userError: null
			});

		} catch (error) {
			setStore({
				userError: error.message,
				userLoading: false
			});
		}
	},
});

export default getState;