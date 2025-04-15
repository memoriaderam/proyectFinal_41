const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				//getActions().changeColor(0, "green");
				// Esta función está deshabilitada temporalmente
			},

			getMessage: async () => {
				// Esta función está deshabilitada temporalmente
				//try {
				// fetching data from the backend
				//	const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
				//	const data = await resp.json()
				//	setStore({ message: data.message })
				// don't forget to return something, that is how the async resolves
				//	return data;
				//} catch (error) {
				//	console.log("Error loading message from backend", error)
				//}
			},
			changeColor: (index, color) => {
				// Esta función está deshabilitada temporalmente
				//get the store
				//const store = getStore();
				//we have to loop the entire demo array to look for the respective index
				//and change its color
				// const demo = store.demo.map((elm, i) => {
				//	if (i === index) elm.background = color;
				//	return elm;
				// });

				//reset the global store
				//setStore({ demo: demo });
			},
			// Parte: Ivan
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
				try {
					console.log("URL del backend:", process.env.BACKEND_URL);
					const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reset`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email: email }),
					});
					if (!response.ok) {
						console.error("Error en la solicitud:", response.statusText);
						throw new Error("Error en el servidor");
					}
					const contentType = response.headers.get("content-type");
					if (!contentType || !contentType.includes("application/json")) {
						throw new Error("Respuesta no es JSON");
					}
					const data = await response.json();
					if (!response.ok) {
						throw new Error(data?.mensaje || "Error en el servidor");
					}
					console.log("Correo enviado:", data.mensaje);
					return data;
				} catch (error) {
					console.log("Error al enviar email de recuperación:", error);
					return false;
				}
			},
			handleNewPassword: async (e, token, password, confirm, navigate, setError) => {
				try {
					e.preventDefault();
					if (!token) {
						setError("Debes ingresar el token");
						return;
					}
					if (password !== confirm) {
						setError("Las contraseñas no coinciden");
						return;
					}
					const resp = await fetch(`${process.env.BACKEND_URL}/api/v1/new_password`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							token: token,
							password: password
						})
					});
					const data = await resp.json();
					if (!resp.ok) {
						console.error("Error:", data.msg || "Error al restablecer la contraseña");
						setError(data.msg || "Error al restablecer la contraseña");
						return;
					}
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
				console.log("Llamada a cancelarCita con:", event_uri, email);

				try {
					const resp = await fetch(`http://localhost:3001/api/v1/calendly/cancel`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							event_uri,
							email
						})
					});

					const data = await resp.json();

					if (!resp.ok) {
						alert(data.msg || "Error al cancelar cita");
					} else {
						alert("Cita cancelada correctamente");
					}

					return data;
				} catch (error) {
					console.error("Error al cancelar cita:", error);
					alert("Error del servidor al cancelar cita");
				}
			},
		}
	};
};

export default getState;
